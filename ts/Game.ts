namespace App {
    export class Game {
        defaultStarter: Player;

        constructor(defaultStarter: Player = App.Config.humanPlayer) {
            this.defaultStarter = defaultStarter;
        }
        run() {
            let interval = setInterval(() => {
                document.getElementById("computerScore").innerHTML = "" + App.Config.ComputerPlayer.getScore();
                document.getElementById("humanScore").innerHTML = "" + App.Config.humanPlayer.getScore();
               
                console.log(this.PlayerRole());
                if (Game.isTerminate())
                clearInterval(interval);
                else {
                    if (this.PlayerRole() == App.Config.ComputerPlayer) {
                        App.Config.ComputerPlayer.playMove();
                    }
                }
            }, 1000);
        }

        displayBoard() {
            document.getElementById("computer")
        }



        static isTerminate(): boolean {
            let grid = Config.grid;
            for (var i = 0; i < Config.numRow; i++) {
                for (var j = 0; j < Config.numCol; j++) {
                    let cell = grid[i][j];
                    if (cell.availableMoves().length > 0) return false;
                }
            }

            return true;
        }

        static getCells(): Array<Cell> {
            let cells = new Array<Cell>();

            for (var i = 0; i < Config.numRow; i++) {
                for (var j = 0; j < Config.numCol; j++) {
                    cells.push(Config.grid[i][j]);
                }
            }
            return cells;
        }

        PlayerRole(): Player {
            let humanPlayer = App.Config.humanPlayer;
            let computerPlayer = App.Config.ComputerPlayer;
            let lastHumanMove = humanPlayer.moves.slice(-1)[0];
            let lastComputerMove = computerPlayer.moves.slice(-1)[0];

            if (humanPlayer.moves.length == 0 && computerPlayer.moves.length == 0)
                return this.defaultStarter;

            if (humanPlayer.moves.length == 0 && computerPlayer.moves.length != 0) {
                if (lastComputerMove.typeEffect == TypeEffect.NORMAL)
                    return humanPlayer;
                return computerPlayer;
            }

            if (humanPlayer.moves.length != 0 && computerPlayer.moves.length == 0) {
                if (lastHumanMove.typeEffect == TypeEffect.NORMAL)
                    return computerPlayer;
                return humanPlayer;
            }

            if (lastHumanMove.id > lastComputerMove.id) {
                if (lastHumanMove.typeEffect == TypeEffect.NORMAL)
                    return computerPlayer;
                return humanPlayer;
            }

            if (lastComputerMove.typeEffect == TypeEffect.NORMAL)
                return humanPlayer;
                
            return computerPlayer;
        }

        static drawSquares() {

            for (let cell of Game.getCells()) {
                if( !App.Config.ComputerPlayer.isSquare(cell) ) continue;
                if( App.Config.ComputerPlayer.isSquareBelongToMe(cell) )
                    fill(100);
                else
                    fill(255);
                beginShape();
                
               
                
                vertex(cell.getX() * Config.offsetX, cell.getY() * Config.offsetY);
                vertex(cell.getBottom().getX() * Config.offsetX, cell.getBottom().getY() * Config.offsetY);
               
                vertex(cell.getBottom().getX() * Config.offsetX, cell.getBottom().getY() * Config.offsetY);

                vertex(cell.getBottom().getRight().getX() * Config.offsetX, cell.getBottom().getRight().getY() * Config.offsetY);
                
                endShape();
            }
        }
        static getWinner():Player
        {
            if(Game.isTerminate()){
                if( App.Config.ComputerPlayer.getScore() >App.Config.humanPlayer.getScore()  )
                    return App.Config.ComputerPlayer;
                return App.Config.humanPlayer;
            }
            return null;
        }
        static drawLastLine()
        {
            let maxMove = null;
            for(let move of Config.ComputerPlayer.moves.concat(Config.humanPlayer.moves))
            {
                if(maxMove == null)
                    maxMove = move;
                else if( maxMove.id < move.id )
                    maxMove = move;
            }
            if(maxMove!=null)
            {
                beginShape();
                stroke(color(255,0,255));
                noFill();
                strokeWeight(4);
                vertex(maxMove.from.getX() * App.Config.offsetX, maxMove.from.getY() * App.Config.offsetY);
                vertex(maxMove.to.getX() * App.Config.offsetX, maxMove.to.getY() * App.Config.offsetY);
                endShape();
            }
        }
    }
}