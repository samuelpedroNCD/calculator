import { useState } from 'react';
import './Calculator.css';

type Operator = '+' | '-' | '×' | '÷' | null;

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: Operator) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      let newValue = currentValue;

      switch (operator) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operator) {
      let newValue = previousValue;

      switch (operator) {
        case '+':
          newValue = previousValue + inputValue;
          break;
        case '-':
          newValue = previousValue - inputValue;
          break;
        case '×':
          newValue = previousValue * inputValue;
          break;
        case '÷':
          newValue = previousValue / inputValue;
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const buttons = [
    { label: 'C', type: 'function', handler: clear },
    { label: '÷', type: 'operator', handler: () => performOperation('÷') },
    { label: '×', type: 'operator', handler: () => performOperation('×') },
    { label: '-', type: 'operator', handler: () => performOperation('-') },
    { label: '7', type: 'digit', handler: () => inputDigit('7') },
    { label: '8', type: 'digit', handler: () => inputDigit('8') },
    { label: '9', type: 'digit', handler: () => inputDigit('9') },
    { label: '+', type: 'operator', handler: () => performOperation('+') },
    { label: '4', type: 'digit', handler: () => inputDigit('4') },
    { label: '5', type: 'digit', handler: () => inputDigit('5') },
    { label: '6', type: 'digit', handler: () => inputDigit('6') },
    { label: '1', type: 'digit', handler: () => inputDigit('1') },
    { label: '2', type: 'digit', handler: () => inputDigit('2') },
    { label: '3', type: 'digit', handler: () => inputDigit('3') },
    { label: '0', type: 'digit zero', handler: () => inputDigit('0') },
    { label: '.', type: 'digit', handler: inputDecimal },
    { label: '=', type: 'equals', handler: handleEquals },
  ];

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`button ${button.type}`}
            onClick={button.handler}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}
