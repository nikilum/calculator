let mathOperators = ["+", "-", "*", "/"];
$(document).ready(function () {
    $(".calc-button").click(function (event) {
        let buttonValue = event.currentTarget.innerText;
        let currentCalcValue = $("#calc_input").val();
        let firstOperand;
        let SecondOperand;
        switch (buttonValue) {
            case "C":
                buttonValue = "0";
                currentCalcValue = "";
                break;
            case "BS":
                buttonValue = "";
                currentCalcValue = currentCalcValue.substring(0, currentCalcValue.length - 1);
                if (currentCalcValue === "") buttonValue = "0";
                break;
            case "*":
            case "/":
            case "+":
            case "-":
                if (currentCalcValue === "0") buttonValue = "0";
                if (mathOperators.includes(currentCalcValue.charAt(currentCalcValue.length - 1)))
                    buttonValue = "";
                break;
            case "=":
                buttonValue= "";
                let calcValueMassive = currentCalcValue.replace(" ", "")
                    .replace("*", " * ")
                    .replace("/", " / ")
                    .replace("+"," + ")
                    .replace("-", " - ")
                    .split(" ");
                for (let i = 0; i < calcValueMassive.length; i++) { //Цикл на деление/умножение
                    if(calcValueMassive[i] === "*"){
                        calcValueMassive[i] = calcValueMassive[i - 1] * calcValueMassive[i + 1];
                        calcValueMassive[i - 1] = undefined;
                        calcValueMassive[i + 1] = undefined;
                        calcValueMassive = calcValueMassive.filter(number => number !== undefined);
                    }
                    if(calcValueMassive[i] === "/"){
                        calcValueMassive[i] = calcValueMassive[i - 1] / calcValueMassive[i + 1];
                        calcValueMassive[i - 1] = undefined;
                        calcValueMassive[i + 1] = undefined;
                        calcValueMassive = calcValueMassive.filter(number => number !== undefined);
                    }
                }
                for (let i = 0; i < calcValueMassive.length; i++) { //Цикл на вычитание/сложение
                    if(calcValueMassive[i] === "+"){
                        calcValueMassive[i] = Number(calcValueMassive[i - 1]) + Number(calcValueMassive[i + 1]);
                        calcValueMassive[i - 1] = undefined;
                        calcValueMassive[i + 1] = undefined;
                        calcValueMassive = calcValueMassive.filter(number => number !== undefined);
                    }
                    if(calcValueMassive[i] === "-"){
                        calcValueMassive[i] = calcValueMassive[i - 1] - calcValueMassive[i + 1];
                        calcValueMassive[i - 1] = undefined;
                        calcValueMassive[i + 1] = undefined;
                        calcValueMassive = calcValueMassive.filter(number => number !== undefined);
                        console.log(calcValueMassive);
                    }
                }
                currentCalcValue = calcValueMassive;
                break;
        }
        if (currentCalcValue === "0") {
            currentCalcValue = "";
        }
        $("#calc_input").val(currentCalcValue + buttonValue);
    });
});