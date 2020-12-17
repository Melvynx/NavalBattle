using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BatailleNavalGinier.Models;

namespace BatailleNavalGinier.Controllers
{
    public class IAPlayerController
    {
        private List<List<Cellule>> _cells { get; set; }

        public IAPlayerController()
        {
        }
        /// <summary>
        ///     IA choice generator for Naval Battle
        /// </summary>
        /// <param name="cellules">Les cellules du tableau de L'ADVERSAIRE !!!</param>
        /// <returns>le choix de l'IA</returns>
        public Cellule RunIA(List<Cellule> cellules)
        {
            _cells = Utils.GetListOfListOfCells(cellules);
            List<Cellule> cellulesHit = cellules.FindAll(c => c.IsHit);

            if (cellulesHit.Count == 0)
            {
                return GetRandomCell(cellules);
            }

            if (!cellulesHit.Any(c => c.IsBoat))
            {
                return FoundRandomRemoteCell(cellules);
            }

            if (!cellulesHit.Any(c => c.IsBoat && !c.IsDeadBoat))
            {
                return FoundRandomRemoteCell(cellules);
            }

            return FoundBoatCell(cellulesHit);
        }

        private Cellule GetRandomCell(List<Cellule> cellules)
        {
            var randomCell = cellules[Utils.RandomNumber(0, cellules.Count - 1)];

            return randomCell;
        }

        private Cellule FoundRandomRemoteCell(List<Cellule> cellules)
        {
            BoardGeneratorControllerV2 boardGeneratorControllerV2 = new BoardGeneratorControllerV2();
            var noHitCells = GetNoHitCells(_cells);

            var maxLength = FindMaxBoat(cellules);
            List<List<Cellule>> possibilities = boardGeneratorControllerV2.GetBoatPossibility(noHitCells, maxLength);

            var selectedPossibility = possibilities[Utils.RandomNumber(0, possibilities.Count - 1)];
            Cellule selectedCell = selectedPossibility[Utils.RandomNumber(0, selectedPossibility.Count - 1)];
            return selectedCell;
        }

        private Cellule FoundBoatCell(List<Cellule> cellules)
        {
            Cellule cible = cellules.First(c => c.IsBoat && !c.IsDeadBoat);

            return BoatHitNear(cible);
        }

        private Cellule BoatHitNear(Cellule cible, int nearLevel = 1)
        {
            var solution = new List<Cellule>();
            if (cible.Ycoords + nearLevel <= 4) solution.Add(_cells[cible.Xcoords][cible.Ycoords + nearLevel]);
            if (cible.Ycoords - nearLevel >= 0) solution.Add(_cells[cible.Xcoords][cible.Ycoords - nearLevel]);
            if (cible.Xcoords + nearLevel <= 4) solution.Add(_cells[cible.Xcoords + nearLevel][cible.Ycoords]);
            if (cible.Xcoords - nearLevel >= 0) solution.Add(_cells[cible.Xcoords - nearLevel][cible.Ycoords]);


            if (solution.Any(c => c != null && c.IsHit && c.IsBoat))
            {
                List<Cellule> boatsNear = solution.FindAll(c => c!= null && c.IsHit && c.IsBoat);

                foreach (Cellule boat in boatsNear)
                {
                    Orientation orientation = Utils.GetCellsOrientation(cible, boat);
                    Cellule result = GetBoatNearByOrientation(new List<Cellule>() { cible, boat }, orientation);

                    if (result != null) return result;
                }
            }

            List<Cellule> solutionNotHit = solution.FindAll(c => c!= null && !c.IsHit);

            return solutionNotHit[Utils.RandomNumber(0, solutionNotHit.Count - 1)];
        }

        private Cellule GetBoatNearByOrientation(List<Cellule> currentBoat, Orientation orientation)
        {
            var currentBoatSorted = currentBoat.OrderBy(c => orientation == Orientation.Horizontal ? c.Xcoords : c.Ycoords);

            var firstCellBoat = currentBoatSorted.First();
            var beforeCell = CellByOrientation(firstCellBoat, orientation, -1);

            if (beforeCell != null && !beforeCell.IsHit)
            {
                return beforeCell;
            }

            var lastCellBoat = currentBoatSorted.Last();
            var afterCell = CellByOrientation(lastCellBoat, orientation, 1);

            if (afterCell != null && !afterCell.IsHit)
            {
                return afterCell;
            }

            return null;
        }

        private Cellule CellByOrientation(Cellule cible, Orientation orientation, int add)
        {
            if (cible.Xcoords + add > 4 || cible.Xcoords + add < 0) return null;
            if (cible.Ycoords + add > 4 || cible.Ycoords + add < 0) return null;
            return _cells[orientation == Orientation.Horizontal ? cible.Xcoords + add : cible.Xcoords][orientation == Orientation.Vertical ? cible.Ycoords + add : cible.Ycoords];
        }

        private List<List<Cellule>> GetNoHitCells(List<List<Cellule>> cellsOfCells)
        {
            List<List<Cellule>> cellulesList = new List<List<Cellule>>();


            foreach (List<Cellule> cells in cellsOfCells)
            {
                var c = cells.Select(cell => cell.IsHit ? null : cell.Copy()).ToList();
                cellulesList.Add(c);
            }

            return cellulesList;
        }

        private int FindMaxBoat(List<Cellule> cellules)
        {
            var allBoats = cellules.FindAll(c => c.IsBoat);
            var groupedBoat = allBoats.GroupBy(b => b.BoatIdentificator).Select(b => b).ToList();

            var biggest = 0;

            foreach (IGrouping<string, Cellule> boats in groupedBoat)
            {
                var boatCount = boats.Count();
                if (boats.First().IsDeadBoat) continue;
                if (boatCount > biggest) biggest = boatCount;
            }
            return biggest;
        }
    }
}
