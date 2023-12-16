const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = "";

for (let key of keys) {
	const value = key.dataset.key;

	key.addEventListener('click', () => calculatorOS(value));
}

function cleanInput(input) {
    let arr = input.split("");
    let length = arr.length;

    for (let i = 0; i < length; i++)
    {
        if (arr[i] == "*") { arr[i] = ' <span class = "operator">x</span> '; }
        else if (arr[i] == "/") { arr[i] = ' <span class = "operator">÷</span> '; }
        else if (arr[i] == "+") { arr[i] = ' <span class = "operator">+</span> '; }
        else if (arr[i] == "-") { arr[i] = ' <span class = "operator">-</span> '; }
        else if (arr[i] == "(") { arr[i] = '<span class = "parenthesis">(</span>'; }
        else if (arr[i] == ")") { arr[i] = '<span class = "parentheis">)</span>'; }
        else if (arr[i] == "%") { arr[i] = '<span class = "percent">%</span>'; }
    }

    return arr.join("");
}

function CleanOutput (output) {
	let output_string = output.toString();
	let decimal = output_string.split(".")[1];
	output_string = output_string.split(".")[0];

	let output_array = output_string.split("");
	
	if (output_array.length > 3) {
		for (let i = output_array.length - 3; i > 0; i -= 3) {
			output_array.splice(i, 0, ",");
		}
	}

	if (decimal) {
		output_array.push(".");
		output_array.push(decimal);
	}

	return output_array.join("");
}

function ValidateInput (value) {
	let last_input = input.slice(-1);
	let operators = ["+", "-", "*", "/"];

	if (value == "." && last_input == ".") {
		return false;
	}

	if (operators.includes(value)) {
		if (operators.includes(last_input)) {
			return false;
		} else {
			return true;
		}
	}

	return true;
}

function PerpareInput (input) {
	let input_array = input.split("");

	for (let i = 0; i < input_array.length; i++) {
		if (input_array[i] == "%") {
			input_array[i] = "/100";
		}
	}

	return input_array.join("");
}

function calculatorOS (value) {
    if (value == "\`") {
        input = "";
        display_input.innerHTML = "";
        display_output.innerHTML = "";
    } 
    else if (value == "Backspace") {
        input = input.slice(0, -1);
        display_input.innerHTML = cleanInput(input);
    } 
    else if (value == "Enter") {
        let result = eval(PerpareInput(input));

        display_output.innerHTML = CleanOutput(result);
    }
    else if (value == "parenthesis")
    {
        if (input.indexOf('(') == -1 || input.indexOf('(') != -1 && input.indexOf(')') != -1 && input.lastIndexOf('(') < input.lastIndexOf(')')) 
        { 
            input += "("; 
        }
        else if (input.indexOf("(") != -1 && input.indexOf(")") == -1 || input.indexOf("(") != -1 && input.indexOf(")") != -1 && input.lastIndexOf("(") > input.lastIndexOf(")")) 
        {
            input += ")";
        }

        display_input.innerHTML = cleanInput(input);
    }

    else {
        input += value;
        display_input.innerHTML = cleanInput(input);
    }
}

document.addEventListener('keydown', inputClick);

function inputClick(click) {
    const keyPressed = document.querySelector(`[data-key="${click.key}"]`);
    keyVal = keyPressed.dataset.key;
    calculatorOS(keyVal);
    keyPressed.classList.add('active');
    setTimeout(removeActive, 150, keyPressed);
}

function removeActive(keyPressed) {
    keyPressed.classList.remove('active');
}