﻿using Core.Entities;
using Infra.DB;

public static class Tools
{
    public static void DirectoryToStore(string sourcePath, string subfolders, CAD_DBContext dbc, FileRepository fr)
    {
        string searchPath = sourcePath + subfolders;
        string[] dirEntries = Directory.EnumerateDirectories(searchPath).ToArray();

        foreach (string dirEntry in dirEntries)
        {
            DirectoryToStore(sourcePath, dirEntry.Replace(sourcePath,""), dbc, fr); 
        }

        // CREATE STORE
        string StoreName = subfolders.TrimEnd('\\');
        Console.WriteLine($"Inserting a new store [{StoreName}]");
        dbc.Add(new STLStore { Owner = StoreName, Files = new List<STLFileDescription>() });
        dbc.SaveChanges();

        // INSERTION DES STL DANS LE DERNIER STORE CREE
        Console.WriteLine("Querying for a store");
        var store = dbc.STLStores
            .OrderByDescending(b => b.StoreId)
            .First();

        Console.WriteLine("Adding STL files in ");


        string[] fileEntries = Directory.GetFiles(searchPath, "*.stl");
        foreach (var fullFileName in fileEntries)
        {
            string shortFileName = fullFileName.Replace(searchPath, "").TrimStart('\\');
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
    }
}
