namespace App {

    export enum TypeEffect {
        SINGLESCORE,
        DOUBLESCORE,
        NORMAL,
    }

    export class Move {
        static counter: number = 0;

        private _id: number;
        from: Cell;
        to: Cell;
        typeEffect: TypeEffect;

        constructor(form: Cell, to: Cell) {

            this.from = form;
            this.to = to;
            this._id = Move.counter;
            Move.counter++;
        }

        setTypeEffect(typeEffect: TypeEffect): void {
            this.typeEffect = typeEffect;
        }

        isRightJoin():boolean{ return this.from.hasRight() && this.to == this.from.getRight();  }

        isBottomJoin():boolean{ return this.from.hasBottom() && this.to == this.from.getBottom();  }

        private getOriginStartSquare(cell:Cell)
        {
            let originCellSquare = cell;

            if( this.isRightJoin() )
            {
                if( cell.hasTop()  )
                    originCellSquare = cell.getTop();
            }

            if( this.isBottomJoin() )
            {
                if( cell.hasLeft()  )
                    originCellSquare = cell.getLeft();
            }

            return originCellSquare;
        }

        private numLineInThisState(cell:Cell ):number
        {
            let lines = 0;

            if( cell.isConnectedWithRight()  )
                lines++;

            if( cell.isConnectedWithBottom()  )
                lines++; 

            if( cell.getBottom().isConnectedWithRight()  )
                lines++; 

            if( cell.getRight().isConnectedWithBottom()  )
                lines++; 
                 
            return lines;
        }

        heuristic() :number{

            let point = 0;
            if( this.typeEffect == TypeEffect.SINGLESCORE )
                 return +1;
            if( this.typeEffect == TypeEffect.DOUBLESCORE )
                 return +2;
            if( Config.level == "hard" )
            {

                if( this.numLineInThisState(this.getOriginStartSquare(this.from)) == 3 )
                    return -Infinity;
                
                if( this.isRightJoin()  && this.from.hasTop() )
                {

                    if( this.numLineInThisState(this.getOriginStartSquare(this.from.getTop())) == 3 )
                       return -Infinity;
                    if( this.numLineInThisState(this.getOriginStartSquare(this.from)) == 3 )
                        return -Infinity;
                }
                
                if( this.isBottomJoin()  && this.from.hasLeft() )
                {
                    if( this.numLineInThisState(this.getOriginStartSquare(this.from.getLeft())) == 3 )
                       return -Infinity;

                    if( this.numLineInThisState(this.getOriginStartSquare(this.from)) == 3 )
                       return -Infinity;
                }
                
            }
            
            

            return point;
        }

        get id():number
        {
            return this._id;
        }
    }
}