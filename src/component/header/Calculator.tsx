"use client";
import { useDigiContext } from "@/context/DigiContext";
import React, { useRef } from "react";

const Calculator: React.FC = () => {
  const { calculatorRef, toggleCalculator, calculatorShow } = useDigiContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (value: string) => {
    if (inputRef.current) {
      const currentValue = inputRef.current.value;
      if (currentValue === "0" || currentValue === "Error") {
        inputRef.current.value = value;
      } else {
        inputRef.current.value += value;
      }
    }
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "0";
    }
  };

  const handleCalculate = () => {
    if (inputRef.current) {
      try {
        const result = eval(inputRef.current.value);
        inputRef.current.value = result.toString();
      } catch (error) {
        inputRef.current.value = "Error";
      }
    }
  };

  return (
    <div className="header-btn-box">
      <div className="dropdown" ref={calculatorRef}>
        <button
          className={`header-btn ${calculatorShow ? "show" : ""}`}
          onClick={toggleCalculator}
        >
          <i className="fa-light fa-calculator"></i>
        </button>
        <ul
          className={`dropdown-menu calculator-dropdown ${
            calculatorShow ? "show" : ""
          }`}
        >
          <div className="dgb-calc-box">
            <div>
              <input
                type="text"
                id="dgbCalcResult"
                placeholder="0"
                autoComplete="off"
                readOnly
                ref={inputRef}
              />
            </div>
            <table>
              <tbody>
                <tr>
                  <td className="bg-danger" onClick={handleClear}>
                    C
                  </td>
                  <td
                    className="bg-secondary"
                    onClick={() => handleButtonClick("CE")}
                  >
                    CE
                  </td>
                  <td
                    className="dgb-calc-oprator bg-primary"
                    onClick={() => handleButtonClick("/")}
                  >
                    /
                  </td>
                  <td
                    className="dgb-calc-oprator bg-primary"
                    onClick={() => handleButtonClick("*")}
                  >
                    *
                  </td>
                </tr>
                <tr>
                  <td onClick={() => handleButtonClick("7")}>7</td>
                  <td onClick={() => handleButtonClick("8")}>8</td>
                  <td onClick={() => handleButtonClick("9")}>9</td>
                  <td
                    className="dgb-calc-oprator bg-primary"
                    onClick={() => handleButtonClick("-")}
                  >
                    -
                  </td>
                </tr>
                <tr>
                  <td onClick={() => handleButtonClick("4")}>4</td>
                  <td onClick={() => handleButtonClick("5")}>5</td>
                  <td onClick={() => handleButtonClick("6")}>6</td>
                  <td
                    className="dgb-calc-oprator bg-primary"
                    onClick={() => handleButtonClick("+")}
                  >
                    +
                  </td>
                </tr>
                <tr>
                  <td onClick={() => handleButtonClick("1")}>1</td>
                  <td onClick={() => handleButtonClick("2")}>2</td>
                  <td onClick={() => handleButtonClick("3")}>3</td>
                  <td
                    rowSpan={2}
                    className="dgb-calc-sum bg-primary"
                    onClick={handleCalculate}
                  >
                    =
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} onClick={() => handleButtonClick("0")}>
                    0
                  </td>
                  <td onClick={() => handleButtonClick(".")}>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
