// See https://aka.ms/new-console-template for more information
//Console.WriteLine("Hello, World!");

using Core.Entities;
using Infra.DB;
using Microsoft.EntityFrameworkCore;

using var dbc = new CAD_DBContext();
Console.WriteLine($"Database path: {dbc.ContextPath}.");


var contextPath = new CAD_FileContext().ContextPath;
if (!Directory.Exists(contextPath)) Directory.CreateDirectory(contextPath);
var fr = new FileRepository();

// DELETE ALL PREVIOUS DATA
dbc.Database.ExecuteSqlRaw("DELETE FROM STLFileDescriptions");
dbc.Database.ExecuteSqlRaw("DELETE FROM STLStores");
dbc.SaveChanges();

// CREATE STORE
Console.WriteLine("Inserting a new store");
dbc.Add(new STLStore { Owner = "owner", Files = new List<STLFileDescription>() });
dbc.SaveChanges();

// INSERTION DES STL DANS LE DERNIER STORE CREE
Console.WriteLine("Querying for a store");
var store = dbc.STLStores
    .OrderByDescending(b => b.StoreId)
    .First();

Console.WriteLine("Adding STL files in ");

string strExeFilePath = System.Reflection.Assembly.GetExecutingAssembly().Location;
string targetDirectory = @$"{System.IO.Path.GetDirectoryName(strExeFilePath)}\STLSamples\";

string[] fileEntries = Directory.GetFiles(targetDirectory, "*.stl");
foreach (var fullFileName in fileEntries)
{
    string shortFileName = fullFileName.Replace(targetDirectory, "");
    Console.WriteLine($"Adding [{shortFileName}]");

    Byte[] Data = File.ReadAllBytes(fullFileName);

    fr.Put(Data, shortFileName);

    STLFileDescription stl_file = new STLFileDescription
    {
        StoreId = store.StoreId,
        FileName = shortFileName,
        FileSize = Data.Length,
        FileType = "STL",
        FileCodage = "Not Yet Implemented"
        
    };
    dbc.Add(stl_file);

    store.Files.Add(stl_file);
    dbc.SaveChanges();
}

