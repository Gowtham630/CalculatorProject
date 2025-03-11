// import { useState, useEffect } from 'react';
// // import './App.css';
// import './components/Calculator.css'

// function App() {
//   const [display, setDisplay] = useState('');
//   const [result, setResult] = useState('');
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/history');
//       const data = await response.json();
//       setHistory(data);
//     } catch (error) {
//       console.error('Error fetching history:', error);
//     }
//   };

//   const handleNumber = (num) => {
//     setDisplay(prev => prev + num);
//   };

//   const handleOperator = (op) => {
//     setDisplay(prev => prev + op);
//   };

//   const handleFunction = (func) => {
//     switch(func) {
//       case 'sin':
//       case 'cos':
//       case 'tan':
//       case 'sinh':
//       case 'cosh':
//       case 'tanh':
//         setDisplay(prev => `${func}(${prev})`);
//         break;
//       case 'sqrt':
//       case 'log':
//       case 'factorial':
//         setDisplay(prev => `log(${prev})`);

//         setDisplay(prev => `log(${prev})`);
//         break;
//       default:
//         break;
//     }
//   };

//   const calculate = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/calculate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ expression: display }),
//       });
//       const data = await response.json();
//       if (data.error) {
//         setResult('Error');
//       } else {
//         setResult(data.result.toString());
//         fetchHistory(); // Refresh history after new calculation
//       }
//     } catch (error) {
//       setResult('Error');
//     }
//   };

//   const clear = () => {
//     setDisplay('');
//     setResult('');
//   };

//   return (
//     <div className="app-container">
//       <h1>Scientific Calculator</h1>
//       <div className="main-content">
//         <div className="calculator">
//           <div className="display">
//             <div>{display || '0'}</div>
//             <div>{result && `= ${result}`}</div>
//           </div>
//           <div className="keypad">
//             <button className="function" onClick={() => handleFunction('sin')}>sin</button>
//             <button className="function" onClick={() => handleFunction('cos')}>cos</button>
//             <button className="function" onClick={() => handleFunction('tan')}>tan</button>
//             <button className="function" onClick={() => handleFunction('sinh')}>sinh</button>
//             <button className="function" onClick={() => handleFunction('cosh')}>cosh</button>
//             <button className="function" onClick={() => handleFunction('tanh')}>tanh</button>
//             <button className="clear" onClick={clear}>C</button>

//             <button className="function" onClick={() => handleFunction('sqrt')}>√</button>
//             <button className="function" onClick={() => handleFunction('log')}>log</button>
//             <button className="operator" onClick={() => handleOperator('^')}>^</button>
//             <button className="operator" onClick={() => handleOperator('/')}>/</button>

//             <button onClick={() => handleNumber('7')}>7</button>
//             <button onClick={() => handleNumber('8')}>8</button>
//             <button onClick={() => handleNumber('9')}>9</button>
//             <button className="operator" onClick={() => handleOperator('*')}>×</button>

//             <button onClick={() => handleNumber('4')}>4</button>
//             <button onClick={() => handleNumber('5')}>5</button>
//             <button onClick={() => handleNumber('6')}>6</button>
//             <button className="operator" onClick={() => handleOperator('-')}>-</button>

//             <button onClick={() => handleNumber('1')}>1</button>
//             <button onClick={() => handleNumber('2')}>2</button>
//             <button onClick={() => handleNumber('3')}>3</button>
//             <button className="operator" onClick={() => handleOperator('+')}>+</button>

//             <button onClick={() => handleNumber('0')}>0</button>
//             <button onClick={() => handleNumber('.')}>.</button>
//             <button className="equals" onClick={calculate}>=</button>
//           </div>
//         </div>
//         <div className="history-panel">
//           <h2>Calculation History</h2>
//           <div className="history-list">
//             {history.map((calc, index) => (
//               <div key={index} className="history-item">
//                 <div className="history-expression">{calc.expression}</div>
//                 <div className="history-result">= {calc.result}</div>
//                 <div className="history-time">
//                   {new Date(calc.timestamp).toLocaleString()}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="admin-link">
//         <a href="http://localhost:5000/admin" target="_blank" rel="noopener noreferrer">
//           Open Admin Dashboard
//         </a>
//       </div>
//     </div>
//   );
// }

// export default App;


import React from 'react'
import Calculator from './components/Calculator'

const App = () => {
  return (
    <div>
      <Calculator/>
    </div>
  )
}

export default App