namespace App
{
    export class ComputerPlayer extends Player
    {
        playMove():Move
        {
            let strategy = new MiniMax();
            let bestMove  = strategy.bestMove();
            this.applyMove(bestMove);
            return bestMove;
        }
        getOpponent():Player{
          return App.Config.humanPlayer;
        }
    }
}