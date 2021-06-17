const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const clearBtns = document.querySelectorAll('.clear-btn');
const decimalBtn = document.getElementById('decimal');
const result = document.getElementById('result');
const display = document.getElementById('display');
const inverseBtn = document.getElementById('inverse');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';

for (var i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener('click', function (e) {
    numberPress(e.target.textContent);
  });
}

for (var i = 0; i < operations.length; i++) {
  var operationBtn = operations[i];
  operationBtn.addEventListener('click', function (e) {
    operationPress(e.target.textContent);
  });
}

for (var i = 0; i < clearBtns.length; i++) {
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function (e) {
    clear(e.target.textContent);
  });
}

decimalBtn.addEventListener('click', decimal);
inverseBtn.addEventListener('click', inverse);
function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operationPress(op) {
 
  let localOperationMemory = display.value;
  console.log(op);
    
  
  if (localOperationMemory.indexOf('.')!=-1) {
    localOperationMemory = parseFloat(localOperationMemory);
    console.log(localOperationMemory);
  }

  if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    display.value = toFixed(MemoryCurrentNumber);
   } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += +localOperationMemory;
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= +localOperationMemory;
    } else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber *= +localOperationMemory;
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= +localOperationMemory;
    } else if (MemoryPendingOperation === 'xу' || MemoryPendingOperation === 'x' || MemoryPendingOperation === 'у') {
      MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, localOperationMemory);
      
    }
      else if (op.charCodeAt() == 8730) {
        console.log('LOM: '+localOperationMemory);
        if (localOperationMemory<0) {
          clear('c');
          display.value ='error';
          return;

        }
        else {
          MemoryCurrentNumber = Math.sqrt(localOperationMemory);
          MemoryNewNumber = false;
        }
    }

      else {
      MemoryCurrentNumber = +localOperationMemory;
    }

    display.value =toFixed(MemoryCurrentNumber);
    MemoryPendingOperation = op;
  }
}

function decimal(argument) {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
}

function inverse (argument) {
  let localInverseMemory = display.value;
  localInverseMemory *= -1;
  display.value = localInverseMemory;
}

function toFixed(value) {
  let power = Math.pow(10, 14);
  return String(Math.round(value*power)/power);
}

function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
}
