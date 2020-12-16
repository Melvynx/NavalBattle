using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BatailleNavalGinier.Models;

namespace BatailleNavalGinier.Controllers
{
    public class IAPlayerController
    {
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
            List<List<Cellule>> cells = Utils.GetListOfListOfCells(cellules);
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

            return FoundBoatCell(cellulesHit, cells);
        }

        private Cellule GetRandomCell(List<Cellule> cellules)
        {
            var randomCell = cellules[Utils.RandomNumber(0, cellules.Count)];
            randomCell.IsHit = true;

            return randomCell;
        }

        private Cellule FoundRandomRemoteCell(List<Cellule> cellules)
        {
            var randomCell = cellules[Utils.RandomNumber(0, cellules.Count)];
            randomCell.IsHit = true;

            return randomCell;
        }

        private Cellule FoundBoatCell(List<Cellule> cellules, List<List<Cellule>> cells)
        {
            Cellule cible = cellules.First(c => c.IsBoat && !c.IsDeadBoat);


            return randomCell;
        }

        private object BoatHitNear(Cellule cible, List<List<Cellule>> cells, int nearLevel = 1)
        {
            var nearTop = cells[cible.Xcoords][cible.Ycoords + nearLevel];
            var nearBottom = cells[cible.Xcoords][cible.Ycoords - nearLevel];
            var nearRight = cells[cible.Xcoords + nearLevel][cible.Ycoords];
            var nearLeft = cells[cible.Xcoords - nearLevel][cible.Ycoords];

            if (nearTop.IsHit && nearTop.IsBoat) {
                return new
                {
                    cell = nearTop,
                    Orientation = Orientation.Vertical,
                };
            }

            if (nearBottom.IsHit && nearBottom.IsBoat)
            {
                return new
                {
                    cell = nearBottom,
                    Orientation = Orientation.Vertical,
                };
            }

            if (nearRight.IsHit && nearRight.IsBoat)
            {
                return new
                {
                    cell = nearRight,
                    Orientation = Orientation.Horizontal,
                };
            }

            if (nearLeft.IsHit && nearLeft.IsBoat)
            {
                return new
                {
                    cell = nearLeft,
                    Orientation = Orientation.Vertical,
                };
            }

            return null;
        }
    }
}
