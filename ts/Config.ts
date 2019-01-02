namespace App
{
    let currentCell :Cell;
    currentCell = null;
    export const  Config=
    {
        grid : new Array<Array<Cell>>(),
        
        numRow : 5,
        
        numCol : 5,
        
        radius : 10,
        
        offsetX : 30,
        
        offsetY : 30,
        
        currentCell : currentCell,

        ComputerPlayer :new ComputerPlayer(),

        humanPlayer :new HumanPlayer(),

        maxDepth:2,
        
        level:"easy"
        
    }
}