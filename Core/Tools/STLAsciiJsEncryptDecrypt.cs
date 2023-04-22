
using Microsoft.VisualBasic;
using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Runtime.CompilerServices;
using System.Text;

namespace Core.Tools
{
    public class STLAsciiJsEncryptDecrypt : CADJsEncryptDecrypt
    {

        public STLAsciiJsEncryptDecrypt(byte[] data) : base(data) { }


       

        protected override void DecriptDataOneShot()
        {
            string utfString = Encoding.UTF8.GetString(Data, 0, Data.Length);

            string[] lines = utfString.Split("\n");

            string[] words = lines[0].Trim().Split(" ", StringSplitOptions.RemoveEmptyEntries);
            if (words[0] != "solid") { throw new Exception("FORMAT INCORRECT"); }
            Commentaire80 = Encoding.ASCII.GetBytes(words[1]);

            List<Triangle> triangles = new List<Triangle>();

            Compteur4 = 0;

            for (long triangleIndex = 0; triangleIndex < (lines.Length - 1) / 7; triangleIndex++)
            {
                /*
                    facet normal ni nj nk
                        outer loop
                            vertex v1x v1y v1z
                            vertex v2x v2y v2z
                            vertex v3x v3y v3z
                        endloop
                    endfacet
                */

                words = lines[1 + triangleIndex * 7].Trim().Split(" ", StringSplitOptions.RemoveEmptyEntries);

                if (words[0] != "facet" && words[1] != "normal") { throw new Exception("FORMAT INCORRECT"); }
                float ni = float.Parse(words[2], CultureInfo.InvariantCulture);
                float nj = float.Parse(words[3], CultureInfo.InvariantCulture);
                float nk = float.Parse(words[4], CultureInfo.InvariantCulture);

                words = lines[1 + triangleIndex * 7 + 2].Trim().Split(" ", StringSplitOptions.RemoveEmptyEntries);

                if (words[0] != "vertex") { throw new Exception("FORMAT INCORRECT"); }
                float v1x = float.Parse(words[1], CultureInfo.InvariantCulture);
                float v1y = float.Parse(words[2], CultureInfo.InvariantCulture);
                float v1z = float.Parse(words[3], CultureInfo.InvariantCulture);

                words = lines[1 + triangleIndex * 7 + 3].Trim().Split(" ", StringSplitOptions.RemoveEmptyEntries);

                if (words[0] != "vertex") { throw new Exception("FORMAT INCORRECT"); }
                float v2x = float.Parse(words[1], CultureInfo.InvariantCulture);
                float v2y = float.Parse(words[2], CultureInfo.InvariantCulture);
                float v2z = float.Parse(words[3], CultureInfo.InvariantCulture);

                words = lines[1 + triangleIndex * 7 + 4].Trim().Split(" ", StringSplitOptions.RemoveEmptyEntries);

                if (words[0] != "vertex") { throw new Exception("FORMAT INCORRECT"); }
                float v3x = float.Parse(words[1], CultureInfo.InvariantCulture);
                float v3y = float.Parse(words[2], CultureInfo.InvariantCulture);
                float v3z = float.Parse(words[3], CultureInfo.InvariantCulture);


                Triangle triangle = new Triangle()
                {
                    xNormale = ni,
                    yNormale = nj,
                    zNormale = nk,

                    x1 = v1x,
                    y1 = v1y,
                    z1 = v1z,

                    x2 = v2x,
                    y2 = v2y,
                    z2 = v2z,

                    x3 = v3x,
                    y3 = v3y,
                    z3 = v3z,

                    ctrl = new byte[2]
                };

                triangles.Add(triangle);

                Compteur4++;
            }
            Triangles = triangles;

            BoundingBox box = new BoundingBox();

            foreach (var tri in Triangles)
            {
                box.xMin = Math.Min(Math.Min(Math.Min(box.xMin, tri.x1), tri.x2), tri.x3);
                box.yMin = Math.Min(Math.Min(Math.Min(box.yMin, tri.y1), tri.y2), tri.y3);
                box.zMin = Math.Min(Math.Min(Math.Min(box.zMin, tri.z1), tri.z2), tri.z3);

                box.xMax = Math.Max(Math.Max(Math.Max(box.xMax, tri.x1), tri.x2), tri.x3);
                box.yMax = Math.Max(Math.Max(Math.Max(box.yMax, tri.y1), tri.y2), tri.y3);
                box.zMax = Math.Max(Math.Max(Math.Max(box.zMax, tri.z1), tri.z2), tri.z3);
            }
            boundingBox = box;

            List<string> normals = new List<string>();
            List<string> positions = new List<string>();
            var iTri = 0;
            foreach (var tri in Triangles)
            {
                normals.Add((tri.xNormale).ToString().Replace(',', '.'));
                normals.Add((tri.yNormale).ToString().Replace(',', '.'));
                normals.Add((tri.zNormale).ToString().Replace(',', '.'));

                positions.Add((tri.x1).ToString().Replace(',', '.'));
                positions.Add((tri.y1).ToString().Replace(',', '.'));
                positions.Add((tri.z1).ToString().Replace(',', '.'));

                positions.Add((tri.x2).ToString().Replace(',', '.'));
                positions.Add((tri.y2).ToString().Replace(',', '.'));
                positions.Add((tri.z2).ToString().Replace(',', '.'));

                positions.Add((tri.x3).ToString().Replace(',', '.'));
                positions.Add((tri.y3).ToString().Replace(',', '.'));
                positions.Add((tri.z3).ToString().Replace(',', '.'));

                iTri += 1;
                if (iTri > maxJSTriangles) break;
            }
            jsNormals = normals;
            jsPositions = positions;


            List<string> indices = new List<string>();
            for (int i = 0; i < Math.Min(Triangles.Count, maxJSTriangles); i++)
            {
                indices.Add($"{i * 3}");
                indices.Add($"{i * 3 + 1}");
                indices.Add($"{i * 3 + 2}");
            }
            jsIndices = indices;

            List<string> boundings = new List<string>();
            boundings.Add((box.xMin).ToString().Replace(',', '.'));
            boundings.Add((box.yMin).ToString().Replace(',', '.'));
            boundings.Add((box.zMin).ToString().Replace(',', '.'));

            boundings.Add((box.xMax).ToString().Replace(',', '.'));
            boundings.Add((box.yMax).ToString().Replace(',', '.'));
            boundings.Add((box.zMax).ToString().Replace(',', '.'));
            jsBoundingBox = boundings;


        }


        private byte[] _data;



    }

}