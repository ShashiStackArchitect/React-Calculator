
import React, { useState } from 'react';
import Display from './components/Display';
import Button from './components/Button';
import './App.css';


const App = () => {
  const [input, setInput] = useState('');

  const handleClick = (value) => setInput((prev) => prev + value);
  const handleClear = () => setInput('');
  const handleDelete = () => setInput((prev) => prev.slice(0, -1));

  const handleClearEntry = () => {
    const match = input.match(/(.*?)([0-9.]+)$/);
    if (match) {
      setInput(match[1]);
    } else {
      setInput('');
    }
  };

  const handleToggleSign = () => {
    const match = input.match(/(.*?)([0-9.]+)$/);
    if (match) {
      const prefix = match[1];
      const number = match[2];
      const toggled = (-parseFloat(number)).toString();
      setInput(prefix + toggled);
    }
  };

  const handleCalculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(input);
      setInput(result.toString());
    } catch {
      setInput('Error');
    }
  };

  const buttons = [
    'CE', '/', 
    '7', '8', '9', '*', 
    '4', '5', '6', '-', 
    '1', '2', '3', '+', 
    '-/+', '0','.', '='
  ];

  return (
    <div className="calculator">
      <Display value={input} />
      <div className="buttons">
        <Button label="C" onClick={handleClear} />
        <Button label="DEL" onClick={handleDelete} />
        {buttons.map((btn) => {
          if (btn === '=') return <Button key={btn} label={btn} onClick={handleCalculate} />;
          if (btn === 'CE') return <Button key={btn} label={btn} onClick={handleClearEntry} />;
          if (btn === '-/+') return <Button key={btn} label={btn} onClick={handleToggleSign} />;
          return <Button key={btn} label={btn} onClick={() => handleClick(btn)} />;
        })}
      </div>
    </div>
  );
};

export default App;
