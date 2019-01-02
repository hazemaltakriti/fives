namespace App {
    export class Main {

       static game:Game;
        static setUp(): void {
            for (let i = 0; i < Config.numRow; i++) {
                Config.grid[i] = new Array<Cell>();
                for (let j = 0; j < Config.numCol; j++) {
                    Config.grid[i][j] = new Cell(j,i);
                }
            }

            let game = new Game();
            Main.game = game;
            game.run();

         
        }
        static test()
        {
            let cell = Config.grid[0][0];
            Config.ComputerPlayer.applyMove( new Move(cell,cell.getRight()) );
            Config.ComputerPlayer.applyMove( new Move(cell.getBottom(),cell.getBottom().getRight()) );
            Config.ComputerPlayer.applyMove( new Move(cell,cell.getBottom()) );
            Config.ComputerPlayer.applyMove( new Move(cell.getRight(),cell.getRight().getRight()) );
            Config.ComputerPlayer.applyMove( new Move(cell.getBottom().getRight(),cell.getBottom().getRight().getRight()) );
            cell = Config.grid[1][0];
           /*  Config.ComputerPlayer.applyMove( new Move(cell,cell.getBottom()) );
            Config.ComputerPlayer.applyMove( new Move(cell,cell.getRight()) ); */
        }
    }

}