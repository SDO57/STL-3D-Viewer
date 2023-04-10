using Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace DemoApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class STLStoreForecastController : ControllerBase
    {

        private readonly ILogger<STLStoreForecastController> _logger;
        IFileDescriptionRepository _repository;

        public STLStoreForecastController(ILogger<STLStoreForecastController> logger, IFileDescriptionRepository repository)
        {
            _logger = logger;
            _repository = repository;
        }

        [HttpGet(Name = "GetSTLStoreForecast")]
        public List<Dto.STLFile> Get()
        {
            var _store = _repository.GetLastStore();

            var resFiles = new List<Dto.STLFile>() { };//on vide les datas en attendant

            foreach (var file in _store.Files)
            {
                var resFile = new Dto.STLFile()
                {
                    StoreId = _store.StoreId,
                    FileId = file.FileId,
                    FileName = file.FileName,
                    FileSize = file.FileSize
                };
                resFiles.Add(resFile);
            }

            return resFiles;
        }
    }
}