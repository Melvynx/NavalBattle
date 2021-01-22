using System;
using System.Collections.Generic;
using System.Linq;
using BatailleNavalGinier.Models;

namespace BatailleNavalGinier.Controllers
{
    public class BoardGeneratorController
    {
        public BoardGeneratorController(){}

        public List<Cellule> SetRandomBoatOnCellules(List<Cellule> cellules)
        {
            int[] boatsLength = { 2, 2, 3 };

            foreach (int boatLength in boatsLength)
            {
                Coord[] boatCoords = _getBoatCoords(boatLength);

                bool isValid = false;

                while (!isValid)
                {
                    var isAnyOccurent = false;
                    foreach (Coord coord in boatCoords)
                    {
                        var isCellExist = false;
                        try
                        {
                            isCellExist = cellules.Any(cell => cell.IsBoat && cell.Xcoords == coord.X && cell.Ycoords == coord.Y);
                        }
                        catch (NullReferenceException)
                        {
                            Console.WriteLine("Err 38:BoardGeneratorController");
                        }
                        if (isCellExist)
                        {
                            isAnyOccurent = true;
                        }
                    }
                    if (isAnyOccurent)
                    {
                        boatCoords = _getBoatCoords(boatLength);
                    }
                    else
                    {
                        isValid = true;
                    }
                }
                foreach (Coord coord in boatCoords)
                {
                    var cellBoatIndex = cellules.FindIndex(cell => cell.Xcoords == coord.X && cell.Ycoords == coord.Y);
                    if (cellBoatIndex != -1)
                    {
                        cellules[cellBoatIndex].AddBoat(coord.Orientation);
                    }
                }
            }

            return cellules;
        }
        // 3
        private Coord[] _getBoatCoords(int length)
        {
            Coord[] coords = new Coord[length];

            int startx = _randomNumber(0, 4);
            int starty = _randomNumber(0, 4);
            // 0 = horizontal, 1 = vertical
            int orientation = _randomNumber(0, 1);
            // put first coord
            coords[0] = new Coord(startx, starty, orientation == 0 ? Orientation.Horizontal : Orientation.Vertical);

            int counter = 1;
            if (orientation == 0)
            {
                // 0 = left, 1 = right
                int direction = _randomNumber(0, 1);
                bool isAtEnd = false;
                while (counter != length)
                {
                    if (direction == 0)
                    {
                        if (startx - counter >= 0)
                        {
                            coords[counter] = new Coord(startx - counter, starty, Orientation.Horizontal);
                        }
                        else
                        {
                            int penality = 0;
                            switch (counter)
                            {
                                case 1:
                                    isAtEnd = true;
                                    break;
                                case 2:
                                    penality = isAtEnd ? 0 : 1;
                                    break;

                            }
                            coords[counter] = new Coord(startx + (counter - penality), starty, Orientation.Horizontal);
                        }

                    }
                    else if (direction == 1)
                    {
                        if (startx + counter <= 4)
                        {
                            coords[counter] = new Coord(startx + counter, starty, Orientation.Horizontal);
                        }
                        else
                        {
                            int penality = 0;
                            switch (counter)
                            {
                                case 1:
                                    isAtEnd = true;
                                    break;
                                case 2:
                                    penality = isAtEnd ? 0 : 1;
                                    break;

                            }
                            coords[counter] = new Coord(startx - (counter - penality), starty, Orientation.Horizontal);
                        }
                    }
                    counter++;
                }
            }
            else if (orientation == 1)
            {
                // 0 = top, 1 = bottom
                int direction = _randomNumber(0, 1);
                bool isAtEnd = false;
                while (counter != length)
                {
                    if (direction == 0)
                    {
                        if (starty - counter >= 0)
                        {
                            coords[counter] = new Coord(startx, starty - counter, Orientation.Vertical);
                        }
                        else
                        {
                            int penality = 0;
                            switch (counter)
                            {
                                case 1:
                                    isAtEnd = true;
                                    break;
                                case 2:
                                    penality = isAtEnd ? 0 : 1;
                                    break;

                            }
                            coords[counter] = new Coord(startx, starty + (counter - penality), Orientation.Vertical);
                        }
                    }
                    else if (direction == 1)
                    {
                        if (starty + counter <= 4)
                        {
                            coords[counter] = new Coord(startx, starty + counter, Orientation.Vertical);
                        }
                        else
                        {
                            int penality = 0;
                            switch (counter)
                            {
                                case 1:
                                    isAtEnd = true;
                                    break;
                                case 2:
                                    penality = isAtEnd ? 0 : 1;
                                    break;

                            }
                            coords[counter] = new Coord(startx, starty - (counter - penality), Orientation.Vertical);
                        }
                    }
                    counter++;
                }
            }
            return coords;
        }

        private int _randomNumber(int min, int max)
        {
            return new Random().Next(min, max + 1);
        }

    }
}
