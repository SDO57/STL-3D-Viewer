using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace Core.Tools
{
    public abstract class CADJsEncryptDecrypt
    {

        public CADJsEncryptDecrypt(byte[] data)
        {
            Data = data;


        }

        public bool IsDecryptable { get; private set; }


        protected abstract void DecriptDataOneShot();

        protected byte[] Data
        {
            get { return _data; }
            set
            {
                _data = value;
                bool res = true;
                try
                {
                    DecriptDataOneShot();
                    IsDecryptable = true;

                }
                catch (Exception e)
                {
                    IsDecryptable = false;
                }


            }
        }

        private byte[] _data;

        public byte[] Commentaire80 { get; protected set; }



        public uint Compteur4 { get; protected set; }

        public List<Triangle> Triangles { get; protected set; }

        public class Triangle
        {
            public float xNormale { get; set; }
            public float yNormale { get; set; }
            public float zNormale { get; set; }
            public float x1 { get; set; }
            public float y1 { get; set; }
            public float z1 { get; set; }
            public float x2 { get; set; }
            public float y2 { get; set; }
            public float z2 { get; set; }
            public float x3 { get; set; }
            public float y3 { get; set; }
            public float z3 { get; set; }
            public byte[] ctrl { get; set; }
        }

        public class BoundingBox
        {
            public float xMin { get; set; }
            public float yMin { get; set; }
            public float zMin { get; set; }
            public float xMax { get; set; }
            public float yMax { get; set; }
            public float zMax { get; set; }
        }
        public BoundingBox boundingBox { get; protected set; }

        public uint maxJSTriangles = 2500000;



        public List<string> jsNormals { get; protected set; }
        public List<string> jsPositions { get; protected set; }

        public List<string> jsIndices { get; protected set; }

        public List<string> jsBoundingBox { get; protected set; }



    }

}