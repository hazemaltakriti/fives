namespace App
{
    export class MiniMax
    {
        evaluate(depth:number):number
        {
            let computer = App.Config.ComputerPlayer;

            let human = App.Config.humanPlayer;

            if(  human.isWinner() ) return -10 + computer.getScore();

            if( computer.isWinner()) return +10 - human.getScore();

            return 0;
        }

        run(depth:number,isMaximize:boolean,aplha:number = -Infinity , beta:number = + Infinity):number
        {
            let computer = App.Config.ComputerPlayer;
            let human = App.Config.humanPlayer;

            if( Game.isTerminate() ){
                return this.evaluate(depth) ;
            } 
            if( depth>Config.maxDepth ) 
                return this.evaluate(depth);
            if( isMaximize ){
                let bestVal = -Infinity;
                
                for( let cell of Game.getCells() )
                {
                    for(let move of cell.availableMoves())
                    {
                        computer.applyMove(move);
                        if(move.typeEffect != TypeEffect.NORMAL)
                            bestVal = Math.max(bestVal,this.run(depth+1,true));
                        else    
                            bestVal = Math.max(bestVal,this.run(depth+1,true));
                        computer.removeMove(move);
                        aplha = Math.max(aplha,bestVal + move.heuristic() );
                        if(beta<=aplha)
                           return bestVal;
                    }
                }
                
                return bestVal;
            }
            else{

                let bestVal = +Infinity;
                
                for( let cell of Game.getCells() )
                {
                    for(let move of cell.availableMoves())
                    {
                        human.applyMove(move);
                        if( move.typeEffect != TypeEffect.NORMAL )
                            bestVal = Math.min(bestVal,this.run(depth+1,false));
                        else    
                            bestVal = Math.min(bestVal,this.run(depth+1,false));
                        human.removeMove(move);
                        beta = Math.min(beta,bestVal + move.heuristic());

                        if(beta<=aplha)
                            return bestVal;
                    }
                }
                
                return bestVal;
            }
        }

     

        getBestMoveByHeuristic(player:Player):Move
        {
            let grid = Config.grid;
            let winnerMove = null;

                for(let cell of Game.getCells())
                {

                    
                    for(let move of cell.availableMoves())
                    {
                        player.applyMove(move);
                        player.removeMove(move);
                        if(winnerMove == null) winnerMove = move;
                        
                        if( move.heuristic() > winnerMove.heuristic() ){
                            winnerMove = move;
                        }
                    }
                    
                }
            
            return winnerMove;
            
        }

        bestMove(player:Player = Config.ComputerPlayer):Move
        {
            let winnerMove = null;
            let val = -Infinity;
            
            for(let cell of Game.getCells())
            {
                for(let move of cell.availableMoves()){
                    
                    player.applyMove(move);
                  
                    let temp = this.run(0,true);

                    if(winnerMove == null)
                        winnerMove = move;

                    if( val < temp + move.heuristic()  )
                    {
                        val = temp;

                        winnerMove = move;
                    }

                    player.removeMove(move);
                }
            }
            
            return winnerMove;
        }

    }   
}