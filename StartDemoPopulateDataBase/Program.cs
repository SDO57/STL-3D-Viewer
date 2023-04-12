// See https://aka.ms/new-console-template for more information
//Console.WriteLine("Hello, World!");

using Core.Entities;
using Infra.DB;
using Microsoft.EntityFrameworkCore;


using var dbc = new CAD_DBContext();
Console.WriteLine($"Database path: {dbc.ContextPath}.");


// DELETE ALL PREVIOUS DATA

dbc.Database.ExecuteSqlRaw("DELETE FROM STLFileDescriptions");
dbc.Database.ExecuteSqlRaw("DELETE FROM STLStores");
dbc.SaveChanges();


var contextPath = new CAD_FileContext().ContextPath;
if (!Directory.Exists(contextPath)) Directory.CreateDirectory(contextPath);

string strExeFilePath = System.Reflection.Assembly.GetExecutingAssembly().Location;
string sourcePath = @$"{System.IO.Path.GetDirectoryName(strExeFilePath)}\STLSamples\";

var fr = new FileRepository();

// CREATE STORES

Tools.DirectoryToStore(sourcePath, dbc, fr);


