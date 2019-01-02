namespace App
{
   export class Graph
    {
        cells:Array<Array<Cell>>
        constructor()
        {
            this.cells = new Array<Array<Cell>>();
            for(let i=0;i<Config.numRow;i++)
            {
                this.cells[i] = new Array<Cell>();
                for(let j=0;j<Config.numCol;j++){
                    this.cells[i][j] = new Cell(j,i);
                }
            }
        }
        get(x:number,y:number)
        {
            return this.cells[x][y];
        }
    }
}