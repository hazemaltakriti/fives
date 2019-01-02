namespace App
{
    export class HumanPlayer extends Player
    {
        playMoveByArrow(key:string):Move
        {
            let currentCell = Config.currentCell;
            let from = null;
            let to  = null; 

            if (key == 'ArrowRight'){
                if( currentCell.hasRight() && !currentCell.isConnectedWithRight() ){
                    from = currentCell;
                    to = currentCell.getRight();
                }
            }
            //Config.currentCell.rightConnect();

            if (key == 'ArrowDown'){
                if( currentCell.hasBottom() && !currentCell.isConnectedWithBottom() ){
                    from = currentCell;
                    to = currentCell.getBottom();
                }
            }
            if (key == 'ArrowUp'){
                if( currentCell.hasTop() && !currentCell.isConnectedWithTop() ){
                    to = currentCell;
                    from = currentCell.getTop();
                }
            }
            if (key == 'ArrowLeft'){
                if( currentCell.hasLeft() && !currentCell.isConnectedWithLeft() ){
                    to = currentCell;
                    from = currentCell.getLeft();
                }
            }
            
            if( from != null && to != null ){
                let move  = new Move(from,to);
                this.applyMove(move);
                if( Config.currentCell == to )
                    Config.currentCell = from;
                else 
                    Config.currentCell = to;
                
                return move;
            }

            return null;
        }

        getOpponent():Player{
            return App.Config.ComputerPlayer;
        }

    }
}