using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BatailleNavalGinier.Models;

namespace BatailleNavalGinier.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CelluleController : ControllerBase
    {
        private readonly CelluleContext _context;

        public CelluleController(CelluleContext context)
        {
            _context = context;
        }

        public List<Cellule> GetCellulesByBoard(long boardId)
        {
            return _context.Cellules.Where(cell => cell.BoardId == boardId).ToList();
        }

        public async Task CreateCellule(Cellule cell)
        {
            _context.Cellules.Add(cell);
            await _context.SaveChangesAsync();
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public void EditCellule(Cellule cell)
        {
            var result = _context.Cellules.SingleOrDefault(c => c.Id == cell.Id);
            if (result != null)
            {
                try
                {
                    _context.Cellules.Attach(cell);
                    _context.Entry(cell).State = EntityState.Modified;
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public void SafeEditCellule(Cellule cell)
        {
            Cellule trackedCellule = _context.Cellules.ToList().Find(c => c.Id == cell.Id);
            trackedCellule.CopyProps(cell);
            EditCellule(trackedCellule);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public Cellule FindCelluleById(long id)
        {
            return _context.Cellules.ToList().Find(g => g.Id == id);
        }


        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public void HitCellule(Cellule cellule)
        {
            cellule.IsHit = true;
            EditCellule(cellule);

            List<Cellule> boat = _context.Cellules.ToList().FindAll(c => c.BoatIdentificator == cellule.BoatIdentificator);
            var isDeadBoat = !boat.Any(c => !c.IsHit);
            if (isDeadBoat)
            {
                foreach (Cellule cell in boat)
                {
                    cell.IsDeadBoat = true;
                    EditCellule(cell);
                } 
            }
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public void SetRandomBoatToCells(long boardId)
        {
            var cellules = _context.Cellules.ToList().FindAll(c => c.BoardId == boardId);

            new BoardGeneratorControllerV2().SetRandomBoat(cellules);

            foreach (Cellule cell in cellules)
            {
                EditCellule(cell);
            }
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public long GetUniqueId()
        {
            if (_context.Cellules.Any())
            {
                return _context.Cellules.Last().Id + 1;
            }
            else
            {
                return 1;
            }
        }

    }
}
