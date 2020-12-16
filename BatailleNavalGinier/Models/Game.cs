namespace BatailleNavalGinier.Models
{
    public class Game
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public GameState GameState { get; set; } = GameState.WAITING;
    }
}
