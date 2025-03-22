import { useState, useEffect } from 'react'
import './App.css'

const factorial = (num) => {
  if (num < 0) return 1
  return num === 0 ? 1 : num * factorial(num - 1)
}

const add = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => {
  if (b === 0) return "Error: División por cero"
  return a / b
}
const power2 = (a) => a ** 2;
const power3 = (a) => a ** 3;
const sqrt = (a) => (a >= 0 ? Math.sqrt(a) : "Error");

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [result, setResult] = useState(null)

  const validateNumericInput = (value) => {
    return value === '' || /^-?\d*\.?\d*$/.test(value);
  }

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => {
      setDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener('change', handleChange);

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const handleNum1Change = (e) => {
    const value = e.target.value;
    if (validateNumericInput(value)) {
      setNum1(value);
    }
  };

  const handleNum2Change = (e) => {
    const value = e.target.value;
    if (validateNumericInput(value)) {
      setNum2(value);
    }
  };

  const handleOperation = (operation) => {
    const n1 = Number(num1)
    const n2 = Number(num2)
    if (isNaN(n1) || isNaN(n2)) {
      setResult("Error");
      return;
    }
    setResult(operation(n1, n2))
  }

  const handleSingleOperation = (operation) => {
    const n1 = Number(num1);
    if (isNaN(n1)) {
      setResult("Error");
      return;
    }
    setResult(operation(n1));
  };

  const calculatePermutation = () => {
    const n = parseInt(num1)
    const r = parseInt(num2)
    if (isNaN(n) || isNaN(r)) {
      setResult("Error: \n El valor ingresado no es un numero");
      return;
    }
    if (n < r) {
      setResult("Error: \n El valor de n debe ser mayor o igual que el valor de r");
      return
    }
    if (n < 0 || r < 0) {
      setResult("Error: \n El valor de n y r debe ser mayor o igual que 0");
      return
    }

    setResult(factorial(n) / factorial(n - r))
  }

  const calculateCombination = () => {
    const n = parseInt(num1)
    const r = parseInt(num2)
    if (isNaN(n) || isNaN(r)) {
      setResult("Error: \n El valor ingresado no es un numero");
      return;
    }
    if (n < r) {
      setResult("Error: \n El valor de n debe ser mayor o igual que el valor de r");
      return
    }
    if (n < 0 || r < 0) {
      setResult("Error: \n El valor de n y r debe ser mayor o igual que 0");
      return
    }

    setResult(factorial(n) / (factorial(r) * factorial(n - r)))
  }

  return (
    <>
      <div className={`calculator ${darkMode ? 'dark-mode' : ''}`}>
        <h2 className='title'>Calculadora Matematica Avanzada</h2>

        <div className="buttons">
          <input
            placeholder="Agregue un numero"
            value={num1}
            onChange={handleNum1Change}
            inputMode="decimal"
            type="text"
            pattern="[0-9]*\.?[0-9]*"
          />

          <input
            placeholder="Agregue un numero"
            value={num2}
            onChange={handleNum2Change}
            inputMode="decimal"
            type="text"
            pattern="[0-9]*\.?[0-9]*"
          />
        </div>

        <div className='buttons'>
          <button onClick={() => handleOperation(add)}>Suma</button>
          <button onClick={() => handleOperation(subtract)}>Resta</button>
          <button onClick={() => handleOperation(multiply)}>Multiplicacion</button>
          <button onClick={() => handleOperation(divide)}>Division</button>
        </div>

        <div className='buttons'>
          <button onClick={calculatePermutation}>Permutación</button>
          <button onClick={calculateCombination}>Combinación</button>
        </div>

        <div className="buttons">
          <button onClick={() => handleSingleOperation(power2)}>x²</button>
          <button onClick={() => handleSingleOperation(power3)}>x³</button>
          <button onClick={() => handleSingleOperation(sqrt)}>√x</button>
        </div>

        <p className="result">Resultado: {result}</p>
      </div>
    </>
  )
}

export default App
