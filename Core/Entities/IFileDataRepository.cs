using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace Core.Entities
{
    public interface IFileDataRepository
    {

        byte[] Get(string FilePath);

        void Put(byte[] data, string filePath);


    }

}