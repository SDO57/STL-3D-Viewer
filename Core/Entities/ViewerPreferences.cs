using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{ 
    public class ViewerPreferences
    {
        [Key]   
        public int Id { get; set; }

        bool ShowGround { get; set; }
        bool ShowSky { get; set; }
        bool ShowAxis { get; set; }
        bool ShowBoundingBox { get; set; }

        bool ShowEdges { get; set; }
        bool ShowNormals { get; set; }
        bool WireframeMode { get; set; }
        bool BackFaceCulling { get; set; }

        string Material { get; set; }

        float RAmbiantColor { get; set; }
        float RCameraLight { get; set; }

        float CClearColorRed { get; set; }
        float CClearColorGreen { get; set; }
        float CClearColorBlue { get; set; }

    }
}