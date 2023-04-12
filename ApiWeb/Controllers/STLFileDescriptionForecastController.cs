using Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace DemoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class STLFileDescriptionForecastController : ControllerBase
    {

        private readonly ILogger<STLFileDescriptionForecastController> _logger;
        IFileDescriptionRepository _repository;


        public STLFileDescriptionForecastController(ILogger<STLFileDescriptionForecastController> logger, IFileDescriptionRepository repository)
        {
            _logger = logger;
            _repository = repository;
        }


    
        [HttpGet(Name = "GetSTLFileDescriptionForecast")]
        public Dto.STLFile Get(int id)
        {
            var _file = _repository.GetFileDesc(id);

            var resFile = new Dto.STLFile()
            {
                StoreId = _file.StoreId,
                FileId = _file.FileId,
                FileName = _file.FileName,
                FileSize = _file.FileSize
            };

            return resFile;
        }


     

    }
}