using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace Core.Tools
{
    public class STLTextJsEncryptDecrypt : CADJsEncryptDecrypt
    {

        public STLTextJsEncryptDecrypt(byte[] data):base(data) { }
   

        protected override void DecriptData()
        {
    

                var temp = new byte[80];
                Array.Copy(Data, 0, temp, 0, 80);
                Commentaire80 = temp;

                Compteur4 = BitConverter.ToUInt32(Data, 80);

                List<Triangle> triangles = new List<Triangle>();
               /* for (int i = 0; i < Compteur4; i++)
                {
                    int baseI = 84 + i * 50;
                    byte[] ctrl = new byte[2];
                    Array.Copy(Data, baseI + 48, ctrl, 0, 2);

                    Triangle triangle = new Triangle()
                    {
                        xNormale = BitConverter.ToSingle(Data, baseI),
                        yNormale = BitConverter.ToSingle(Data, baseI + 4),
                        zNormale = BitConverter.ToSingle(Data, baseI + 8),

                        x1 = BitConverter.ToSingle(Data, baseI + 12),
                        y1 = BitConverter.ToSingle(Data, baseI + 16),
                        z1 = BitConverter.ToSingle(Data, baseI + 20),
                        
                        x2 = BitConverter.ToSingle(Data, baseI + 24),
                        y2 = BitConverter.ToSingle(Data, baseI + 28),
                        z2 = BitConverter.ToSingle(Data, baseI + 32),
                        
                        x3 = BitConverter.ToSingle(Data, baseI + 36),
                        y3 = BitConverter.ToSingle(Data, baseI + 40),
                        z3 = BitConverter.ToSingle(Data, baseI + 44),
                        
                        ctrl = ctrl
                    };

                    triangles.Add(triangle);

                }*/
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