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

        // GET: api/Cellule
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cellule>>> GetCellules()
        {
            return await _context.Cellules.ToListAsync();
        }

        // GET: api/Cellule/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cellule>> GetCellule(long id)
        {
            var cellule = await _context.Cellules.FindAsync(id);

            if (cellule == null)
            {
                return NotFound();
            }

            return cellule;
        }

        // PUT: api/Cellule/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCellule(long id, Cellule cellule)
        {
            if (id != cellule.Id)
            {
                return BadRequest();
            }

            _context.Entry(cellule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CelluleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Cellule
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Cellule>> PostCellule(Cellule cellule)
        {
            _context.Cellules.Add(cellule);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCellule", new { id = cellule.Id }, cellule);
        }

        // DELETE: api/Cellule/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Cellule>> DeleteCellule(long id)
        {
            var cellule = await _context.Cellules.FindAsync(id);
            if (cellule == null)
            {
                return NotFound();
            }

            _context.Cellules.Remove(cellule);
            await _context.SaveChangesAsync();

            return cellule;
        }

        private bool CelluleExists(long id)
        {
            return _context.Cellules.Any(e => e.Id == id);
        }
    }
}
