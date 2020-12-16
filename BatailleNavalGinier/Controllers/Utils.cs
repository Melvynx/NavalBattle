using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BatailleNavalGinier.Models;

namespace BatailleNavalGinier.Controllers
{
    public class Utils
    {
        private static Random _random = new Random();

        public static int RandomNumber(int min, int max)
        {
            return _random.Next(min, max + 1);
        }

        public static List<List<Cellule>> GetListOfListOfCells(List<Cellule> cellules)
        {
            List<List<Cellule>> cellulesList = new List<List<Cellule>>();

            for (var i = 0; i <= 4; i++)
            {
                var sortedCellules = cellules.FindAll(cell => cell.Xcoords == i).OrderBy(cell => cell.Ycoords).ToList();
                cellulesList.Add(sortedCellules);
            }
            return cellulesList;
        }

        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[_random.Next(s.Length)]).ToArray());
        }

    }
}
