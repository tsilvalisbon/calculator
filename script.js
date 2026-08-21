function add(n1, n2)
{
    let result;

    result = n1 + n2;
    return (result);
}

function subtract(n1, n2)
{
    let result;

    result = n1 - n2;
    return (result);
}

function multiply(n1, n2)
{
    let result;

    result = n1 * n2;
    return (result);
}

function divide(n1, n2)
{
    let result;

    result = n1 / n2;
    return (result);
}

function operate (n1, n2, operator)
{
    let result;

    if (operator === "+")
        result = add(n1, n2);
    else if (operator === "-")
        result = subtract(n1, n2);
    else if (operator === "*")
        result = multiply(n1, n2);
    else if (operator === "/")
        result = divide(n1, n2);
    if (result === null || result === undefined || isNaN(result) || !isFinite(result))
        return "Error";
    else
        return result;
}

const historyEl = document.getElementById('history');
const currentEl = document.getElementById('current');

let current = '';
let history = '';
let operator = null;
let justComputed = false;
let lastResult = NaN;

function updateDisplay() {
  historyEl.textContent = history;
  if (current === '') {
    currentEl.textContent = '0';
    }
    else {
        currentEl.textContent = current;
    }
}

function inputNumber(num) {
  if (num === '.' && current.includes('.')) {
    return;
  }
  if (justComputed) {
    if (num === '.') {
      current = '0.';
    } else {
      current = num;
    }
    justComputed = false;
  } else if (current === '0' && num !== '.') {
    current = num;
  } else {
    current += num;
  }
  updateDisplay();
}

function inputOperator(op) {
  if (current === '' && op === '-' && history === '') {
    current = '-';
    updateDisplay();
    return;
  }
  if (operator && current !== '') {
    const res = compute();
    current = String(res);
    history = '';
    operator = op;
    justComputed = true;
    updateDisplay();
    return;
  }
  if (current !== '') {
    history = current;
    current = '';
  }
  operator = op;
  updateDisplay();
}

function compute() {
  let n1 = parseFloat(history);
  let n2 = parseFloat(current);
  if (isNaN(n1)) {
    if (!isNaN(lastResult)) n1 = lastResult;
  }
  if (isNaN(n2)) {
    if (!isNaN(lastResult)) n2 = lastResult;
    else if (!isNaN(n1)) n2 = n1;
  }
  if (isNaN(n1) || isNaN(n2)) return 'Error';
  if (operator === '/' && n2 === 0) return 'Error';
  const res = operate(n1, n2, operator);
  if (!Number.isFinite(res)) return 'Error';
  lastResult = res;
  return res;
}

function clearAll() {
  current = '';
  history = '';
  operator = null;
  justComputed = false;
  updateDisplay();
}

function equals() {
  if (!operator) return;
  const res = compute();
  current = String(res);
  history = '';
  operator = null;
  justComputed = true;
  updateDisplay();
}

function setupButtons() {
  document.querySelectorAll('.key').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('number')) {
        inputNumber(btn.textContent.trim());
      } else if (btn.classList.contains('operator')) {
        inputOperator(btn.textContent.trim());
      } else if (btn.classList.contains('equal')) {
        equals();
      } else if (btn.id === 'clear') {
        clearAll();
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { setupButtons(); updateDisplay(); });
} else {
  setupButtons(); updateDisplay();
}
