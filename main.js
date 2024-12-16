const tools = require('./tools');
const solvedBoard = tools.createBoard();

const puzzleBoard = tools.emptyCells(structuredClone(solvedBoard),50);

tools.visualize2DBoard(solvedBoard);

tools.visualize2DBoard(puzzleBoard);