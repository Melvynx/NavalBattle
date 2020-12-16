using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BatailleNavalGinier.Models;

namespace BatailleNavalGinier.Controllers
{
    public class BoardGeneratorControllerV2
    {
        public BoardGeneratorControllerV2()
        {
        }

        public List<Cellule> SetRandomBoat(List<Cellule> cellules)
        {
            int[] boatsLength = { 2, 2, 3 };
            List<List<Cellule>> cellsOfCells = Utils.GetListOfListOfCells(cellules);
            List<List<Cellule>> boats = new List<List<Cellule>>();

            foreach (int boatLength in boatsLength)
            {
                string identificator = $"boat-{boatLength}-{Utils.RandomString(5)}";
                var possibilities = _getBoatPossibility(cellsOfCells, boatLength);
                if (possibilities.Count == 1) {
                    continue;
                }
                var selectedPossibility = possibilities[Utils.RandomNumber(0, possibilities.Count - 1)];

                foreach (Cellule cell in selectedPossibility)
                {
                    var index = cellules.FindIndex(c => c.Id == cell.Id);
                    cellules[index].AddBoat(cell.Orientation, identificator);
                }
            }

            return cellules;
        }
        /// <summary>
        ///  Donne une list de list de Bateau.
        /// </summary>
        /// <param name="cellules">toute les cellules</param>
        /// <param name="length">taille du bateau</param>
        /// <returns></returns>
        private List<List<Cellule>> _getBoatPossibility(List<List<Cellule>> cellules, int length)
        {
            List<List<Cellule>> nullCells = _getWaterCells(cellules);
            List<List<Cellule>> result = new List<List<Cellule>>();

            foreach (List<Cellule> cells in nullCells)
            {
                foreach (Cellule cell in cells)
                {
                    List<List<Cellule>> possibilities = _possibilitiesBoatForCell(cell, nullCells, length);
                    if (possibilities.Count != 0)
                    {
                        result = result.Concat(possibilities).ToList();
                    }
                }
            }
            return result;
        }
        /// <summary>
        ///     Donne une list de list de cellule.
        ///     C'est enfaite une list de bateau possible.
        /// </summary>
        /// <param name="cell">cellule de base à tester</param>
        /// <param name="length">taille du bateau</param>
        /// <returns></returns>
        private List<List<Cellule>> _possibilitiesBoatForCell(Cellule cell, List<List<Cellule>> nullCells, int length = 2)
        {
            if (cell == null)
            {
                return new List<List<Cellule>>();
            }

            int x = cell.Xcoords;
            int y = cell.Ycoords;
            var result = new List<List<Cellule>>();

            List<Cellule> temp_cells;
            // right
            temp_cells = new List<Cellule> { cell };
            for (int i = 1; i < length; i++)
            {
                if (x + i > 4) break;
                if (nullCells[x + i][y] == null) break;
                nullCells[x + i][y].AddBoat(Orientation.Horizontal);
                temp_cells.Add(nullCells[x + i][y]);
            }
            if (temp_cells.Count == length)
            {
                result.Add(temp_cells);
            }

            // left
            temp_cells = new List<Cellule> { cell };
            for (int i = 1; i < length; i++)
            {
                if (x - i < 0) break;
                if (nullCells[x - i][y] == null) break;
                nullCells[x - i][y].AddBoat(Orientation.Horizontal);
                temp_cells.Add(nullCells[x - i][y]);
            }
            if (temp_cells.Count == length)
            {
                result.Add(temp_cells);
            }

            // bottom
            temp_cells = new List<Cellule> { cell };
            for (int i = 1; i < length; i++)
            {
                if (y + i > 4) break;
                if (nullCells[x][y + i] == null) break;
                nullCells[x][y + i].AddBoat(Orientation.Vertical);
                temp_cells.Add(nullCells[x][y + i]);
            }
            if (temp_cells.Count == length)
            {
                result.Add(temp_cells);
            }

            // top
            temp_cells = new List<Cellule> { cell };
            for (int i = 1; i < length; i++)
            {
                if (y - i < 0) break;
                if (nullCells[x][y - i] == null) break;
                nullCells[x][y - i].AddBoat(Orientation.Vertical);
                temp_cells.Add(nullCells[x][y - i]);
            }
            if (temp_cells.Count == length)
            {
                result.Add(temp_cells);
            }

            return result;
        }

        private List<List<Cellule>> _getWaterCells(List<List<Cellule>> cellsOfCells)
        {
            List<List<Cellule>> cellulesList = new List<List<Cellule>>();


            foreach (List<Cellule> cells in cellsOfCells)
            {
                var c = cells.Select(cell => cell.IsBoat ? null : cell.Copy()).ToList();
                cellulesList.Add(c);
            }

            return cellulesList;
        }

        private List<List<Cellule>> _getListOfListOfCells(List<Cellule> cellules)
        {
            List<List<Cellule>> cellulesList = new List<List<Cellule>>();

            for (var i = 0; i <= 4; i++)
            {
                var sortedCellules = cellules.FindAll(cell => cell.Xcoords == i).OrderBy(cell => cell.Ycoords).ToList();
                cellulesList.Add(sortedCellules);
            }
            return cellulesList;
        }

    }
}
