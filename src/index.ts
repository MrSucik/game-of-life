const getNeighborsCount = (grid: CellGrid, x: number, y: number) => {
  let count = 0;
  grid[x - 1]?.[y] && count++;
  grid[x]?.[y - 1] && count++;
  grid[x - 1]?.[y - 1] && count++;
  grid[x + 1]?.[y] && count++;
  grid[x]?.[y + 1] && count++;
  grid[x + 1]?.[y + 1] && count++;
  grid[x + 1]?.[y - 1] && count++;
  grid[x - 1]?.[y + 1] && count++;
  return count;
};

const getNextState = (
  currentState: boolean,
  neighborsCount: number
): boolean => {
  if (currentState === false) {
    if (neighborsCount === 3) {
      return true;
    }
  } else {
    if (neighborsCount === 2 || neighborsCount === 3) {
      return true;
    }
  }
  return false;
};

const isGridAlive = (
  grid: CellGrid,
  rowsCount: number,
  columnsCount: number
) => {
  for (let x = 0; x < rowsCount; x++) {
    for (let y = 0; y < columnsCount; y++) {
      if (grid[x][y] === true) {
        return true;
      }
    }
  }
  return false;
};

const getNextGrid = (inputGrid: CellGrid): void => {
  const outputGrid: CellGrid = [];

  const rowsCount = inputGrid.length;
  const columnsCount = inputGrid[0]?.length || 0;

  for (let x = 0; x < rowsCount; x++) {
    outputGrid[x] = [];
    for (let y = 0; y < columnsCount; y++) {
      const neighborsCount = getNeighborsCount(inputGrid, x, y);
      const nextState = getNextState(inputGrid[x][y], neighborsCount);
      outputGrid[x][y] = nextState;
    }
  }

  console.log("Input: ", inputGrid);
  console.log("Output: ", outputGrid);
  console.log("Is alive: ", isGridAlive(outputGrid, rowsCount, columnsCount));

  if (isGridAlive(outputGrid, rowsCount, columnsCount)) {
    getNextGrid(outputGrid);
  }
};

const initialGrid = [
  [false, false, false, false],
  [false, true, false, true],
  [false, true, false, false],
  [false, true, false, false],
];

getNextGrid(initialGrid);
