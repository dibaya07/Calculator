import { React, useState, useRef, useEffect } from "react";

const Calculator = () => {
  const rows = [
    ["AC", "%", "X", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["00", "0", ".", "="],
  ];

  const [displayValue, setDisplayValue] = useState("0");
  const [expression, setExpression] = useState("");
  const [isResult, setIsResult] = useState(false);
  // const [preventkeys, setpreventkeys] = useState("0")
  const refbtn = useRef(null);

  useEffect(() => {
    refbtn.current.focus();
  }, []);
  
  

  const calculateValue = () => {
    try {
      setExpression(displayValue);
      const result = eval(displayValue);
      setDisplayValue(result.toString());
      setIsResult(true);
    } catch (error) {
      setDisplayValue("error");
      setIsResult(true);
    }
  };

  const handleButtonClick = (value) => {
    if (value === "=") {
      calculateValue();
    } else if (value === "AC") {
      setDisplayValue("0");
      setExpression("");
      setIsResult(false);
    } else if (value === "%") {
      try {
        const result = eval(displayValue) / 100;
        setDisplayValue(result.toString());
        setIsResult(true);
      } catch (error) {
        setDisplayValue("error");
        setIsResult(true);
      }
    } else if (value === "X") {
      setDisplayValue((prev) => {
        const newVal = prev.slice(0, -1);
        return newVal === "" ? "0" : newVal;
      });
      setIsResult(false);
    } else {
      setDisplayValue((prev) => {
        if (isResult || prev === "0") {
          setIsResult(false);
          return value;
        } else {
          return prev + value;
        }
      });
    }
  };

  const pressedBtn = (event) => {
    const key = event.key;
    const keyBtns =["Escape", "%", "Backspace", "/","7", "8", "9", "*","4", "5", "6", "-","1", "2", "3", "+","00", "0", ".", "Enter",]
    
    if (!keyBtns.includes(key)) {
      event.preventDefault();
      return;
    }
      // {keyBtns.includes(key) &&  setDisplayValue(key)}
    if (key === "Enter") {
      calculateValue();
      setIsResult(true);
    } else if (key === "Backspace") {
      setDisplayValue((prev) => {
        const newVal = prev.slice(0, -1);
        return newVal === "" ? "0" : newVal;
      });
      console.log(key);
      setIsResult(false);

    } else if (key === "Escape") {
      setDisplayValue("0");
      setExpression("");
      setIsResult(false);
    } else {
      // setDisplayValue((prev) => (prev === "0" ? key : prev + key));
       setDisplayValue((prev) => {
        if (isResult || prev === "0") {
          setIsResult(false);
          return key;
        } else {
          return prev + key;
        }
      });
    }
  };

  const getButtonClass = (btn) => {
    if (btn === "AC") return "bg-orange-500 text-white";
    if (btn === "=") return "bg-blue-500 text-white";
    if (["+", "-", "*", "/", "%", "X"].includes(btn))
      return "bg-gray-500 text-white";
    if (
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "00", "."].includes(
        btn
      )
    )
      return "bg-gray-300 text-black";
  };

  const calculatorBtns = (
    <div>
      {rows.map((btns, rowIndex) => (
        <div key={rowIndex} className="h-20 w-full">
          {btns.map((btn, i) => (
            <button
              key={i}
               
              className={`h-3/4 w-16 mx-1 my-1 drop-shadow-gray-800 shadow-md rounded-3xl ${getButtonClass(
                btn
              )}`}
              onClick={() => {
                handleButtonClick(btn);
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="calculator-box flex justify-center items-center h-screen bg-black">
      <div className="calculator-grid h-fit w-fit shadow-md shadow-stone-400 border-4 border-white bg-white drop-shadow-white- rounded-3xl overflow-hidden">
        <div className="flex  h-36 w-72 flex-col justify-end">
          <input
            type="text"
            className="inp text-right rounded-t-2xl text-gray-700 bg-amber-200 mt-2.5 mx-3 h-14 px-2"
            value={expression}
            readOnly
          />
          <input
            type="text"
            className="inp text-right rounded-b-2xl text-black bg-amber-200 mb-2.5 mx-3 h-14 px-2 focus:outline-none"
            value={displayValue}
           onKeyDown={pressedBtn}
            ref={refbtn}
            readOnly
          />
        </div>

        <div>{calculatorBtns}</div>
      </div>
    </div>
  );
};

export default Calculator;
