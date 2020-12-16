namespace BatailleNavalGinier.Models
{
    public enum GameState
    {
        PLACE_BOAT = -1,
        WAITING = 3,
        PLAYER2_TURN = 20,
        PLAYER2_HIT = 21,
        PLAYER2_SINK = 22,
        PLAYER2_WIN = 23,
        PLAYER1_TURN = 10,
        PLAYER1_HIT = 11,
        PLAYER1_SINK = 12,
        PLAYER1_WIN = 13,
    }
}
