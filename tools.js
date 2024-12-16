function visualize2DBoard(matrix) {
    const array = [];
    
    
    matrix.forEach((raw) => {
        raw.forEach(cell => array.push(cell.number));
    });

    const newMatrix = [];
    let temp = [];

    
    for (let i = 0; i < array.length; i++) {
        if (temp.length === 9) {
            newMatrix.push(temp);
            temp = [];  
        }
        temp.push(array[i]);
    }

   
    if (temp.length > 0) {
        newMatrix.push(temp);
    }

    console.log('=================');
    newMatrix.forEach(raw => console.log(raw.join('|')));
    console.log('=================');
    return newMatrix;
}

function randomNumber1To9(){

    const max = 9;
    const min = 1;
    const randomNum =  Math.round((Math.random()*(max-min))+min);
        
    return randomNum
}

function createMatrix(dimensions ) {

    let matrix = null;
    let fillValue = 0;

    dimensions.reverse().forEach((dimension) => {

        const line = [];

        for (let i = 0; i < dimension; i++) {

            let value ;

            if(!matrix){
                
                value = fillValue ;
            }else {
                value = matrix;
            }

            line.push(value);

        }

        matrix = line;

    });
    
    return matrix
}

function identifyBlock(y,x){

    const check = (i)=>{

        if(i < 3 ){
            return 0
        }else if(i < 6){
            return 1
        }else {
            return 2
        }

    };

    const xID = check(x)
    const yID = check(y)

    return `${yID}${xID}`
}

function createRandomRaw(y){

    const raw = [];

    const randomNewNum = ()=>{

        const randomNumber = randomNumber1To9();

        if(raw.some(cell => cell.number === randomNumber)){

            return randomNewNum()

        }else {

            return randomNumber
            
        }
    }
    for(let i = 0; i < 9 ; i ++){

        const value = {

            number:randomNewNum(),
            x:i,
            y:y,
            block:identifyBlock(y,i),
        }

        raw.push(value)

    }
    // console.log(raw)

    return raw

}

function getCellsWithSameX(cells, xValue) {

    return cells.filter(cell => cell.x === xValue);

}

function getCellsWithSameBlock(cells, blockValue) {

    return cells.filter(cell => cell.block === blockValue);

}


function checkIfValid(board,raw){
    
    const allCells = board.flat();

    const checkColumn = () => {

        for (let cell of raw) {

            const cellsWithSameX = getCellsWithSameX(allCells, cell.x);

            if (cellsWithSameX.some(xCell => xCell.number === cell.number)) {

                return false; 

            }
        }

        return true; 

    };
    
    const checkBlock = () => {

        for (let cell of raw) {

            const cellsWithSameBlock = getCellsWithSameBlock(allCells, cell.block);

            if (cellsWithSameBlock.some(blockCell => blockCell.number === cell.number)) {

                return false; 

            }
        }

        return true; 

    };
    const valid = checkBlock()&&checkColumn();

    return valid
}

function createBoard() {
    const board = [];

    for (let y = 0; y < 9; y++) {

        let rawLine;
    
        for (let i = 0;;i++) { 

            rawLine = createRandomRaw(y);

            if (checkIfValid(board, rawLine)) {
                break;  
                
            }

            if(i === 1000000){

                console.log('Attempt faild trying again.')

                return createBoard()
            }
        }
    
        board.push(rawLine);  
    }
    
    return board;
}

function emptyCells(board, cellsToRemove) {
    const totalCells = 81; // A Sudoku board has 81 cells
    const removedCells = new Set(); // To track already removed cells

    while (removedCells.size < cellsToRemove) {
        const randomIndex = Math.floor(Math.random() * totalCells);
        const row = Math.floor(randomIndex / 9); // Calculate row
        const col = randomIndex % 9;           // Calculate column

        // If the cell is already empty, skip
        if (board[row][col].number === 0) continue;

        // Empty the cell
        board[row][col].number = 0;
        removedCells.add(randomIndex); // Mark cell as removed
    }

    return board;
}

const tools = {
    visualize2DBoard,
    createMatrix,
    randomNumber1To9,
    createRandomRaw,
    identifyBlock,
    checkIfValid,
    getCellsWithSameBlock,
    getCellsWithSameX,
    createBoard,
    emptyCells
}
module.exports = tools;