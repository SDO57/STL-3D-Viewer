using Core.Entities;

namespace WebApplicationMVC.Controllers
{
    public class STLFilesController : Controller
    {
        IFileDescriptionRepository _fileDescriptionRepository;
        IFileDataRepository _fileDataRepository;

        public STLFilesController(
            IFileDescriptionRepository fileDescriptionRepository,
            IFileDataRepository fileDataRepository
            )
        {
            _fileDescriptionRepository = fileDescriptionRepository;
            _fileDataRepository = fileDataRepository;
        }

        // GET: STLFiles
        public async Task<IActionResult> Index()
        {
            var resFiles = new List<Model.STLFileModelView>() { };//on vide les datas en attendant
         
            
            var _stores = _fileDescriptionRepository.GetAllStores();
            foreach (var _store in _stores)
            { if (_store.Files != null)
           // var _store = _fileDescriptionRepository.GetLastStore();
            foreach (var file in _store.Files)
                {
                    var resFile = new Model.STLFileModelView()
                    {
                        StoreId = _store.StoreId,
                        StoreName = _store.Owner,
                        FileId = file.FileId,
                        FileName = file.FileName,
                        FileSize = file.FileSize,
                        Codage = file.FileCodage
                    };
                    resFiles.Add(resFile);
                } }

            return View(resFiles);

        }

        // GET: STLFiles/Details/5
        public async Task<IActionResult> Load(int id)
        {
            var _desc = _fileDescriptionRepository.GetFileDesc(id);
            var _data = _fileDataRepository.Get(_desc.FileName);

            return File(_data, "application/octet-stream", _desc.FileName);
        }

        public async Task<IActionResult> View(int id)
        {
            var _desc = _fileDescriptionRepository.GetFileDesc(id);
            var _data = _fileDataRepository.Get(_desc.FileName);

            var model = new STLFileViewModel()
            {
                Desc = _desc,
                Data = _data
            };
            //return File(_file.Data, "application/octet-stream", _file.FileName);

            return View(model);
        }


        /*
        // GET: STLFiles/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: STLFiles/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
     
      [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("FileId,StoreId,FileName,FileSize,Data")] STLFile sTLFile)
        {
            if (ModelState.IsValid)
            {
                _context.Add(sTLFile);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(sTLFile);
        }

        // GET: STLFiles/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.STLFiles == null)
            {
                return NotFound();
            }

            var sTLFile = await _context.STLFiles.FindAsync(id);
            if (sTLFile == null)
            {
                return NotFound();
            }
            return View(sTLFile);
        }

        // POST: STLFiles/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("FileId,StoreId,FileName,FileSize,Data")] STLFile sTLFile)
        {
            if (id != sTLFile.FileId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(sTLFile);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!STLFileExists(sTLFile.FileId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(sTLFile);
        }

        // GET: STLFiles/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.STLFiles == null)
            {
                return NotFound();
            }

            var sTLFile = await _context.STLFiles
                .FirstOrDefaultAsync(m => m.FileId == id);
            if (sTLFile == null)
            {
                return NotFound();
            }

            return View(sTLFile);
        }

        // POST: STLFiles/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.STLFiles == null)
            {
                return Problem("Entity set 'STLDbContext.STLFiles'  is null.");
            }
            var sTLFile = await _context.STLFiles.FindAsync(id);
            if (sTLFile != null)
            {
                _context.STLFiles.Remove(sTLFile);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool STLFileExists(int id)
        {
          return (_context.STLFiles?.Any(e => e.FileId == id)).GetValueOrDefault();
        }*/
    }
}
