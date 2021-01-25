const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

function getUserNumberInput() {
  return  parseFloat(userInput.value);
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
}

function writeToLog(operation, prevResult, newNumber, newResult) {
  const logEntry = {
    operation: operation,
    prevResult: prevResult,
    number: newNumber,
    result: newResult,
   }
    logEntries.push(logEntry);
    console.log(logEntries);
  } 

  function calculateResult(calculationType) {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    let mathOperator;
    if (
      calculationType !== 'ADD' &&
      calculationType !== 'SUBTRACT' &&
      calculationType !== 'MULTIPLY' &&
      calculationType !== 'DIVIDE' ||
      enteredNumber === 0
    ) {
      return;
    }

    if (
      calculationType === 'ADD' ||
      calculationType === 'SUBTRACT' ||
      calculationType === 'MULTIPLY' ||
      calculationType === 'DIVIDE'
    ) {
    
    if (calculationType === 'ADD') {
      currentResult += enteredNumber;
      mathOperator = '+';
    } else if (calculationType === 'SUBTRACT') {
      currentResult -= enteredNumber;
      mathOperator = '-';
    } else if (calculationType === 'MULTIPLY') {
      currentResult *= enteredNumber;
      mathOperator = '*';
    } else if (calculationType === 'DIVIDE') {
      currentResult /= enteredNumber;
      mathOperator = '/';
    }
    createAndWriteOutput (mathOperator, initialResult, enteredNumber );  
    writeToLog (calculationType, initialResult, enteredNumber, currentResult);
  }
}

 function add() {
  calculateResult('ADD');
}

function subtract() {
  calculateResult('SUBTRACT');
}

function multiply() {
  calculateResult('MULTIPLY');
} 

function divide() {
 calculateResult('DIVIDE');
} 

addBtn.addEventListener('click', add)
subtractBtn.addEventListener('click', subtract)
multiplyBtn.addEventListener('click', multiply)
divideBtn.addEventListener('click', divide)