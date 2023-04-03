import { useState } from "react";
import { Binary } from "./displayBinary";
import { Decimal } from "./displayDecimal";
import { Octal } from "./displayOctal";
import { Information } from "./information";
import { Keypad } from "./keypad";
import { Hexadecimal } from "./displayHexadecimal";
const Application=()=>{
    const [result, setResult]=useState(0);
    const [operation,setOperation] = useState("");
    const operation_set = (value) => {
      const operators = ['+', '-', '*', '/', '%'];
      const tmp = [...operation];
      if (tmp[tmp.length - 1] === "(") {
        if (isNaN(parseInt(value)) && value !== "(") {
          return;
        }
      }
      // If an operator is the last character in the operation, only allow adding a number or opening bracket.
      if (operators.includes(tmp[tmp.length - 1])) {
        if (isNaN(parseInt(value)) && value !== "(") {
          return;
        }
      }
    
      // If the first character in the operation is an operator, only allow adding an opening bracket.

      if (operators.includes(tmp[0]) && value !== "(") {
        return;
      }
    
      // If an opening bracket is the last character in the operation, allow adding any character.
      if (tmp[tmp.length - 1] === "(") {
        tmp.push(value);
        setOperation(tmp);
        return;
      }
    
      // If a closing bracket is the first character, allow adding any character.
      if (value !== "(" && value !== ")" && tmp[0] === ")") {
        tmp.push(value);
        setOperation(tmp);
        return;
      }
    
      // If a number is the last character in the operation, allow adding any character.
      if (!isNaN(parseInt(tmp[tmp.length - 1]))) {
        tmp.push(value);
        setOperation(tmp);
        return;
      }
    
      // If an operator is the last character in the operation, allow adding a number or opening bracket.
      if (operators.includes(tmp[tmp.length - 1])) {
        if (!isNaN(parseInt(value)) || value === "(") {
          tmp.push(value);
          setOperation(tmp);
          return;
        }
      }
    
      tmp.push(value);
      setOperation(tmp);
      console.log(operation);
    };
    const calculateRPN =(operation) => {
      const operators = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
        "%": (a, b) => a % b,
      };
      const stack = [];
      const tokens = operation.split(" ");
    
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token in operators) {
          const b = stack.pop();
          const a = stack.pop();
          const result = operators[token](a, b);
          stack.push(result);
        } else {
          stack.push(parseFloat(token));
        }
      }
    
      return stack.pop();
    }
    const infixToRPN=(operation) => {
      const operators = {
        "+": { precedence: 1, associativity: "left" },
        "-": { precedence: 1, associativity: "left" },
        "*": { precedence: 2, associativity: "left" },
        "/": { precedence: 2, associativity: "left" },
        "%": { precedence: 2, associativity: "left" },
      };
      const outputQueue = [];
      const operatorStack = [];
      const tokens = operation.split(/([\+\-\*\/\(\)%])/);
    
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i].trim();
    
        if (token === "") {
          continue;
        }
    
        if (!isNaN(token)) {
          outputQueue.push(token);
        } else if (token in operators) {
          const operator1 = token;
          const precedence1 = operators[operator1].precedence;
          const associativity1 = operators[operator1].associativity;
          let operator2 = operatorStack.slice(-1)[0];
          while (
            operator2 in operators &&
            ((associativity1 === "left" && precedence1 <= operators[operator2].precedence) ||
              (associativity1 === "right" && precedence1 < operators[operator2].precedence))
          ) {
            outputQueue.push(operatorStack.pop());
            operator2 = operatorStack.slice(-1)[0];
          }
          operatorStack.push(operator1);
        } else if (token === "(") {
          operatorStack.push(token);
        } else if (token === ")") {
          while (operatorStack.slice(-1)[0] !== "(") {
            outputQueue.push(operatorStack.pop());
          }
          operatorStack.pop();
        }
      }
    
      while (operatorStack.length > 0) {
        outputQueue.push(operatorStack.pop());
      }
    
      return outputQueue.join(" ");    }
    const calc_result=()=>{
      if(operation.length >=1){
        const math_op = operation.join('');
        // const res = eval(math_op);
        const rpn =infixToRPN(math_op);
        const res = calculateRPN(rpn);
        setResult(res);
      }

    }
    return(<div>
        <Decimal number={result}></Decimal>
        <Binary number={result}></Binary>
        <Octal number={result}></Octal>
        <Hexadecimal number={result}></Hexadecimal>
        <Keypad fnc={operation_set} res={calc_result}>
        </Keypad>
        <Information operation={operation}></Information>
    </div>);
}
export default Application;