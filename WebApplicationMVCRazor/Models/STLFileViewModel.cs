using Core.Entities;
using System.Security.Permissions;

namespace WebApplicationMVC.Models;

public class STLFileViewModel
{

    public STLFileDescription Desc { get; set; }
    public Byte[] Data { get; set; }
    
}
