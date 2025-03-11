import { useState } from 'react';
import { evaluate } from 'mathjs';
import './Calculator.css'
const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [isDegree, setIsDegree] = useState(true);

  const handleNumber = (num) => {
    setDisplay(prev => prev + num);
  };

  const handleOperator = (op) => {
    setDisplay(prev => prev + op);
  };

  const handleFunction = (func) => {
    switch(func) {
      case 'sin':
      case 'cos':
      case 'tan':
        setDisplay(prev => `${func}(${prev}${isDegree ? ' * pi/180' : ''})`);
        break;
      case 'ln':
        setDisplay(prev => `log(${prev})`);
        break;
      case 'log':
        setDisplay(prev => `log10(${prev})`);
        break;
      case 'x!':
      case 'sinh':
      case 'cosh':
      case 'tanh':
        setDisplay(prev => `factorial(${prev})`);
        break;
      case 'xʸ':
        setDisplay(prev => `${prev}^`);
        break;
      case 'x²':
        setDisplay(prev => `(${prev})^2`);
        break;
      case '%':
        setDisplay(prev => `(${prev})/100`);
        break;
      case 'π':
        setDisplay(prev => prev + 'pi');
        break;
      case 'e':
        setDisplay(prev => prev + 'e');
        break;
      case '√':
      case 'factorial':
        setDisplay(prev => `sqrt(${prev})`);
        break;
      case 'exp':
        setDisplay(prev => `${prev} * 10^`);
        break;
      default:
        break;
    }
  };

  const calculate = () => {
    try {
      const calculatedResult = evaluate(display);
      setResult(calculatedResult.toString());
      const newEntry = {
        id: Date.now(),
        expression: display,
        result: calculatedResult,
        timestamp: new Date().toISOString()
      };
      setHistory(prev => [...prev, newEntry]);
    } catch (error) {
      setResult('Error');
    }
  };

  const clear = () => {
    setDisplay('');
    setResult('');
  };

  const backspace = () => {
    setDisplay(prev => prev.slice(0, -1));
  };

  const clearHistory = () => { setHistory([]); };

  const removeHistoryItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const toggleDegree = () => {
    setIsDegree(prev => !prev);
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">
          <div className="result">{result ? `Ans = ${result}` : ''}</div>
          <div className="expression">{display || '0'}</div>
        </div>
        <div className="keypad">
          <div className="row">
            <button className="function" onClick={toggleDegree}>{isDegree ? 'Deg' : 'Rad'}</button>
            <button className="function">Inv</button>
            <button className="function">Ans</button>
            <button className="operator" onClick={() => handleOperator('(')}>(</button>
            <button className="operator" onClick={() => handleOperator(')')}>)</button>
            <button className="operator" onClick={backspace}>⌫</button>
            <button className="operator" onClick={() => handleOperator('/')}>÷</button>
            <button className="function" onClick={clearHistory}>Clear History</button>
          </div>
          <div className="row">
            <button onClick={() => handleNumber('7')}>7</button>
            <button onClick={() => handleNumber('8')}>8</button>
            <button onClick={() => handleNumber('9')}>9</button>
            <button className="operator" onClick={() => handleOperator('*')}>×</button>
          </div>
          <div className="row">
            <button onClick={() => handleNumber('4')}>4</button>
            <button onClick={() => handleNumber('5')}>5</button>
            <button onClick={() => handleNumber('6')}>6</button>
            <button className="operator" onClick={() => handleOperator('-')}>−</button>
          </div>
          <div className="row">
            <button onClick={() => handleNumber('1')}>1</button>
            <button onClick={() => handleNumber('2')}>2</button>
            <button onClick={() => handleNumber('3')}>3</button>
            <button className="operator" onClick={() => handleOperator('+')}>+</button>
          </div>
          <div className="row">
            <button onClick={() => handleNumber('0')}>0</button>
            <button onClick={() => handleNumber('.')}>.</button>
          </div>
          <div className="row">
            <button className="function" onClick={() => handleFunction('ln')}>ln</button>
            <button className="function" onClick={() => handleFunction('sin')}>sin</button>
            <button className="function" onClick={() => handleFunction('%')}>%</button>
            <button onClick={() => handleNumber('7')}>7</button>
            <button onClick={() => handleNumber('8')}>8</button>
            <button onClick={() => handleNumber('9')}>9</button>
            <button className="operator" onClick={() => handleOperator('*')}>×</button>
          </div>
          <div className="row">
            <button className="function" onClick={() => handleFunction('log')}>log</button>
            <button className="function" onClick={() => handleFunction('cos')}>cos</button>
            <button className="function" onClick={() => handleFunction('x!')}>x!</button>
            <button className="function" onClick={() => handleFunction('sinh')}>sinh</button>
            <button className="function" onClick={() => handleFunction('cosh')}>cosh</button>
            <button className="function" onClick={() => handleFunction('tanh')}>tanh</button>
            <button onClick={() => handleNumber('4')}>4</button>
            <button onClick={() => handleNumber('5')}>5</button>
            <button onClick={() => handleNumber('6')}>6</button>
            <button className="operator" onClick={() => handleOperator('-')}>−</button>
          </div>
          <div className="row">
            <button className="function" onClick={() => handleFunction('π')}>π</button>
            <button className="function" onClick={() => handleFunction('tan')}>tan</button>
            <button className="function" onClick={() => handleFunction('xʸ')}>xʸ</button>
            <button onClick={() => handleNumber('1')}>1</button>
            <button onClick={() => handleNumber('2')}>2</button>
            <button onClick={() => handleNumber('3')}>3</button>
            <button className="operator" onClick={() => handleOperator('+')}>+</button>
          </div>
          <div className="row">
            <button className="function" onClick={() => handleFunction('e')}>e</button>
            <button className="function" onClick={() => handleFunction('√')}>√</button>
            <button className="function" onClick={() => handleFunction('factorial')}>x!</button>
            <button className="function" onClick={() => handleFunction('x²')}>x²</button>
            <button onClick={() => handleNumber('0')}>0</button>
            <button onClick={() => handleNumber('.')}>.</button>
            <button className="function" onClick={() => handleFunction('exp')}>exp</button>
            <button className="equals" onClick={calculate}>=</button>
          </div>
        </div>
        
        <button className="history-btn" onClick={() => setShowHistory(!showHistory)}>
          History
        </button>
        
        {showHistory && (
          <div className="history-panel">
            <h3>History</h3>
            <div className="history-list">
              {history.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-content">
                    <div>{item.expression}</div>
                    <div>= {item.result}</div>
                  </div>
                  <button 
                    className="remove-history" 
                    onClick={() => removeHistoryItem(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
