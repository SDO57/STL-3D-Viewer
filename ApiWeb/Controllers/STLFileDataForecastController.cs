using Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace DemoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class STLFileDataForecastController : ControllerBase
    {

        private readonly ILogger<STLFileDescriptionForecastController> _logger;
        IFileDescriptionRepository _descriptionRepository;
        IFileDataRepository _dataRepository;

        public STLFileDataForecastController(ILogger<STLFileDescriptionForecastController> logger, 
            IFileDescriptionRepository descRepo,
            IFileDataRepository dataRepo)
        {
            _logger = logger;
            _descriptionRepository = descRepo;
            _dataRepository = dataRepo;
        }


        [HttpGet(Name = "GetSTLFileDataForecast")]
        public IActionResult Get(int id)
        {
            var _desc = _descriptionRepository.GetFileDesc(id);
            var _data = _dataRepository.Get(_desc.FileName);

            return File(_data, "application/octet-stream", _desc.FileName);
        }




      


    

    }
}