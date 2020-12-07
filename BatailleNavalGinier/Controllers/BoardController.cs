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
    public class BoardController : ControllerBase
    {
        private readonly BoardContext _context;

        public BoardController(BoardContext context)
        {
            _context = context;
        }

        // GET: api/Board
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Board>>> GetBoards()
        {
            return await _context.Boards.ToListAsync();
        }

        // GET: api/Board/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Board>> GetBoard(long id)
        {
            var board = await _context.Boards.FindAsync(id);

            if (board == null)
            {
                return NotFound();
            }

            return board;
        }

        // PUT: api/Board/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBoard(long id, Board board)
        {
            if (id != board.Id)
            {
                return BadRequest();
            }

            _context.Entry(board).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BoardExists(id))
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

        // POST: api/Board
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Board>> PostBoard(Board board)
        {
            
            _context.Boards.Add(board);
            await _context.SaveChangesAsync();
            

            return CreatedAtAction("GetBoard", new { id = board.Id }, board);
        }

        // DELETE: api/Board/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Board>> DeleteBoard(long id)
        {
            var board = await _context.Boards.FindAsync(id);
            if (board == null)
            {
                return NotFound();
            }

            _context.Boards.Remove(board);
            await _context.SaveChangesAsync();

            return board;
        }

        public long GetUniqueId()
        {
            return _context.Boards.Last().Id + 1;
        }

        private bool BoardExists(long id)
        {
            return _context.Boards.Any(e => e.Id == id);
        }
    }
}
