namespace App {
    export class Player {
         moves: Array<Move>;

        constructor() {
            this.moves = new Array<Move>();
        }

        private SpecifyTypeEffectMove(move:Move):void
        {
                let point = 0;
                if( move.from.hasRight() && move.from.getRight() == move.to){
                    if( this.isSquare(move.from) ){
                        point++;
                    }

                    if( move.from.hasTop() ){
                        if( this.isSquare(move.from.getTop()) ){
                            point++;
                        }
                    }
                }

                if( move.from.hasBottom() && move.from.getBottom() == move.to){
                    if( this.isSquare(move.from) ){
                        point++;
                    }

                    if( move.from.hasLeft() ){
                        if( this.isSquare(move.from.getLeft()) ){
                            point++;
                        }
                    }
                }
                if(point == 0 )  move.setTypeEffect(TypeEffect.NORMAL);
                if(point == 1 )  move.setTypeEffect(TypeEffect.SINGLESCORE);
                if(point == 2 )  move.setTypeEffect(TypeEffect.DOUBLESCORE);
        }

        applyMove(move: Move) {
            this.moves.push(move);
            try {

                if (move.to == move.from.getRight()) {
                    if (move.from.isConnectedWithRight()) {
                        throw "every thing is bad ";
                    }
                    move.from.rightConnect();
                }
                else {
                    if (move.from.isConnectedWithBottom()) {
                        throw "every thing is bad ";
                    }
                    move.from.BottomConnect();
                }
               this.SpecifyTypeEffectMove(move);
            } catch (e) {
                console.log("you cant apply your move because it existed before ");
            }
        }

        removeMove(move: Move) {
            let index = this.moves.indexOf(move);
            if (index == -1)
                console.log("error");
            else {
                this.moves.splice(index, 1);

                if (move.to == move.from.getRight()) {
                   
                    move.from.removeRightConnect();
                }
                else {
                  
                    move.from.removeBottomConnect();
                }

            }
        }

        isSquare(cell: Cell): boolean {
            return cell.hasBottom() && cell.hasRight() &&
                cell.isConnectedWithRight() && cell.isConnectedWithBottom()
                && cell.getRight().isConnectedWithBottom() && cell.getBottom().isConnectedWithRight();
        }

        isSquareBelongToMe(cell:Cell):boolean
        {
            let firstMove =  this.findMove(cell,cell.getRight());
            if( firstMove == null  ) firstMove = this.getOpponent().findMove(cell,cell.getRight());
            
            let secondtMove =  this.findMove(cell,cell.getBottom());
            if( secondtMove == null  ) secondtMove = this.getOpponent().findMove(cell,cell.getBottom());
          
            let thirdtMove =  this.findMove(cell.getRight(),cell.getRight().getBottom()) ;
            if( thirdtMove == null  ) thirdtMove = this.getOpponent().findMove(cell.getRight(),cell.getRight().getBottom()) ;
                
            let fourthtMove =  this.findMove(cell.getBottom(),cell.getBottom().getRight());
            if( fourthtMove == null  ) fourthtMove = this.getOpponent().findMove(cell.getBottom(),cell.getBottom().getRight()) ;

            let moves = [firstMove,secondtMove,thirdtMove,fourthtMove];
            
            let maxMove = moves[0];
            
            for(let i=0;i<moves.length;i++)
            {
                if(  maxMove.id < moves[i].id )
                    maxMove = moves[i];
            }
          
           return this.moves.indexOf(maxMove) >=0;;
                        
        }

        getOpponent():Player{
            return this;
        }

        findMove(from:Cell,to:Cell):Move
        {
            for(let move of this.moves)
            {
                if( move.from == from && move.to == to  )
                {
                    return move;
                }
            }
            return null;
        }

        getScore():number
        {
            let score = 0;
            for(let move of this.moves){
                if(move.typeEffect == TypeEffect.SINGLESCORE) score++;
                if(move.typeEffect == TypeEffect.DOUBLESCORE) score+=2;
            }
            return score;
        }

        isWinner():boolean
        {
            if( Game.getWinner() == this )
                return true;
            return false    ;
        }
        
    }
}