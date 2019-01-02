namespace App {
    export class Cell {


        private x: number;
        private y: number;
        private connectedWith: Array<Cell>;
        
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
            this.connectedWith = new Array<Cell>();
        }
         
        private drawComputer()
        {
            for (var move of Config.ComputerPlayer.moves ) {
                beginShape();
                    stroke(255);
               
                noFill();
                strokeWeight(2);
    
                vertex( move.from.getX()* Config.offsetX , move.from.getY()* Config.offsetY  );
                vertex( move.to.getX()* Config.offsetX , move.to.getY()* Config.offsetY  );
             
                endShape();
            }
            noStroke();
            if (this == Config.currentCell) fill(0);
            else {
                if (this.connectedWith.length > 0) {
                        fill(255,0,255);
                }
                else
                    fill(255, 255, 255);
            }
        }
        private drawHuman()
        {
            for (var move of Config.humanPlayer.moves ) {
                beginShape();
                    stroke(120);
               
                
                strokeWeight(2);
    
                vertex( move.from.getX()* Config.offsetX , move.from.getY()* Config.offsetY  );
                vertex( move.to.getX()* Config.offsetX , move.to.getY()* Config.offsetY  );
             
                endShape();
            }
            noStroke();
            if (this == Config.currentCell) fill(0);
            else {
                if (this.connectedWith.length > 0) {
                        fill(255,0,255);
                }
                else
                    fill(255, 255, 255);
            }
        }
        
        draw():void
        {
            
            this.drawComputer();
            this.drawHuman();
            ellipse(this.x * Config.offsetX, this.y * Config.offsetY, Config.radius, Config.radius);
            Game.drawSquares();
        }
       
        
       

        isBelong(x: number, y: number): boolean {
            return x < Config.numRow && y < Config.numRow && x >= 0 && y >= 0;
        }

        rightConnect() {

            if (this.isBelong(this.y, this.x + 1)) {

                var rightCell = this.getRight();

                if (!this.isConnectedWithRight()) {

                    this.connectedWith.push(rightCell);

                    rightCell.connectedWith.push(this);
                }
            }
        }

        BottomConnect() {

            if (this.isBelong(this.y + 1, this.x)) {
                var bottomCell = this.getBottom();
                if (!this.isConnectedWithBottom()) {
                    this.connectedWith.push(bottomCell);

                    bottomCell.connectedWith.push(this);
                }
            }
        }

        LeftConnect() {


            if (this.isBelong(this.y, this.x - 1)) {
                var leftCell = this.getLeft();

                if (!this.isConnectedWithLeft()) {
                    this.connectedWith.push(leftCell);
                    leftCell.connectedWith.push(this);
                }

            }
        }

        TopConnect() {

            if (this.isBelong(this.y - 1, this.x)) {

                var ToppCell = this.getTop();

                if (!this.isConnectedWithTop()) {
                    this.connectedWith.push(ToppCell);

                    ToppCell.connectedWith.push(this);
                }

            }
        }

        getTop(): Cell {
            return Config.grid[this.y - 1][this.x];;
        }

        getRight(): Cell {
            if (!this.isBelong(this.y, this.x + 1)) return undefined;

            return Config.grid[this.y][this.x + 1];
        }

        getBottom(): Cell {
            return Config.grid[this.y + 1][this.x];;
        }
        getLeft(): Cell {
            return Config.grid[this.y][this.x - 1];;
        }

        isFallConnected() {
            if (this.hasRight() && this.hasBottom())
                return this.isConnectedWithBottom() && this.isConnectedWithRight();
            if (this.hasRight() && !this.hasBottom())
                return this.isConnectedWithRight();
            if (this.hasBottom() && !this.hasRight())
                return this.isConnectedWithBottom();
            if (!this.hasBottom() && !this.hasRight())
                return true;
            return false;
        }
        isConnectedWithTop() {
            return this.connectedWith.indexOf(this.getTop()) != -1;
        }
        isConnectedWithRight() {
            return this.connectedWith.indexOf(this.getRight()) != -1;
        }
        isConnectedWithBottom() {
            return this.connectedWith.indexOf(this.getBottom()) != -1;
        }
        isConnectedWithLeft() {
            return this.connectedWith.indexOf(this.getLeft()) != -1;
        }
        removeBottomConnect() {

            if (!this.hasBottom()) return;

            var bottomCell = this.getBottom();

            var index = this.connectedWith.indexOf(bottomCell);
            if (index == -1) return;
            this.connectedWith.splice(index, 1);

            bottomCell.connectedWith.splice(bottomCell.connectedWith.indexOf(this), 1);
        }
        hasRight(): boolean {
            return typeof Config.grid[this.y][this.x + 1] != typeof undefined;
        }
        hasBottom(): boolean {
            return this.isBelong(this.y + 1, this.x);
        }
        hasTop(): boolean {
            return this.isBelong(this.y - 1, this.x);
        }

        hasLeft(): boolean {
            return this.isBelong(this.y, this.x - 1);
        }

        removeRightConnect() {

            if (!this.hasRight()) return;

            var rightCell = this.getRight();

            var index = this.connectedWith.indexOf(rightCell);
            if (index == -1) return;
            this.connectedWith.splice(index, 1);

            rightCell.connectedWith.splice(rightCell.connectedWith.indexOf(this), 1);
        }

        getY():number{
            return this.y;
        }
        getX():number{
            return this.x;
        }
        
        getNeighours(): Array<Cell> {
            let arr = [];

            if (this.hasRight())
                arr.push(this.getRight());

            if (this.hasBottom())
                arr.push(this.getBottom());

            if (this.hasLeft())
                arr.push(this.getLeft());

            if (this.hasTop())
                arr.push(this.getTop());

            if (this.hasBottom())
                if (this.getBottom().hasRight())
                    arr.push(this.getBottom().getRight());

            if (this.hasBottom())
                if (this.getBottom().hasLeft())
                    arr.push(this.getBottom().getLeft());

            if (this.hasTop())
                if (this.getTop().hasRight())
                    arr.push(this.getTop().getRight());

            if (this.hasTop())
                if (this.getTop().hasLeft())
                    arr.push(this.getTop().getLeft());

            return arr;
        }
    canMoveToRight():boolean
    {
        return  this.hasRight() && !this.isConnectedWithRight();
    }

    canMoveToBottom():boolean
    {
        return  this.hasBottom() && !this.isConnectedWithBottom();
    }

    availableMoves():Array<Move>
    {
        let moves = new Array<Move>();

        if( this.canMoveToRight() ) 
            moves.push( new Move(this,this.getRight() ) );
        if( this.canMoveToBottom() ) 
            moves.push( new Move(this,this.getBottom() ) );
    
        return moves;
    }

      


    }
}