let buttons = document.querySelectorAll(".option")
let screen = document.querySelector(".screen");
let num1, num2, arr1 = [];
let num = 0,j = 0,i = 0;
let point = false, del = true;
let operator = [];

//Array to implement bodmass correctly
const bodmass = [
    ["sqr"],
    ["√"],
    ["÷"],
    ["⨯"],
    ["+"],
    ["−"],
    ["%"]

]

//To check the entered value is number or not
const numcheck = (num1) => {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i of arr) {
        if (num1 == i) {
            return true;
        }
    }
    return false;
}

//taking inputs from the buttons
buttons.forEach((button) => {

    button.addEventListener("click", () => {
        num1 = 0;
        num1 = button.getAttribute("id");
        if (num1 != "sqr") {
            if (del) {
                screen.innerText = '';
                screen.innerText += num1;
                del = false;
            }
            else {
                screen.innerText += num1;
            }
        }
        else {
            let len = screen.innerText.length;
            let str = screen.innerText.slice(0, len - 4)
            screen.innerText = str;
            screen.innerText += `sqr(${num})`
        }
        let val = numcheck(num1);
        if (val) {
            num1 = +num1
            num = (num * 10) + num1;
            if (point) {
                num /= 10;
                point = false;
            }
        }
        else if (num1 == "=") {
            arr1[i] = num;
            for (let oper of operator) {

                if (oper == "(") {
                    bracketoperation(arr1, operator);

                }
            }

            if (operator != null) {
                arithmeticoperation(arr1, operator, bodmass);
            }
            i = 0;
            j = 0;
            num = arr1[0]

            screen.innerText = (arr1[0]);

            if (num == 0) {
                del = true;
            }


        }
        else if (num1 == "C") {
            clearscreen(arr1, operator);
            i = 0;
            j = 0;
            num = 0;
        }
        else if (num1 == ")") {
            operator[j] = num1;
            arr1[i] = num;
            j++;
            i++;
        }
        else if (num1 == ".") {
            point = true;
        }
        else if (num1 == "1/x") {
            arr1[i] = num;
            num = inversion(arr1);
            arr1[i] = num;
        }

        else if (num1 == "DEL") {
            arr1[i] = num;
            let len = screen.innerText.length;
            let inp = screen.innerText[len - 4];
            let val = numcheck(inp)
            num = deletenumber(arr1, operator);
            if (!val) {
                i--;
                j--;
            }

        }
        else {
            if (num1 == "(") {
                operator[j] = num1;
                j++;
            }
            else {
                operator[j] = num1;
                if (num1 != 'sqr' && num1 != '√' && num1 != "∓") {
                    arr1[i] = num;

                }
                else {
                    i--;
                }
                if (num1 == "∓") {
                    ++i;
                    arr1[i] = num;
                    let len = operator.length;
                    num = signchange(arr1);
                    operator.splice(len - 1, 1);
                    arr1[i] = num;
                    j--;
                    i--;

                }
                j++;
                i++;

            }
            if (num1 != "sqr" && num1 != "√" && num1 != "∓") {
                num = 0;
            }
        }

    })
})

//for performing arithmetic operation
const arithmeticoperation = (arr1, operator, bodmass) => {
    let count;

    //loop for applying bodmass
    for (let val of bodmass) {

        count = 0;

        for (let oper of operator) {
            if (oper == val) {

                if (oper == '÷') {
                    div(arr1, count, (count + 1));
                    operator.splice(count, 1);
                    arithmeticoperation(arr1, operator, bodmass);

                }
                else if (oper == '⨯') {
                    mul(arr1, count, (count + 1));
                    operator.splice(count, 1);
                    arithmeticoperation(arr1, operator, bodmass);

                }
                else if (oper == '+') {

                    add(arr1, count, (count + 1));
                    operator.splice(count, 1);
                    arithmeticoperation(arr1, operator, bodmass);

                }
                else if (oper == '−') {
                    sub(arr1, count, (count + 1));
                    operator.splice(count, 1);
                    arithmeticoperation(arr1, operator, bodmass);

                }
                else if (oper == '%') {
                    rem(arr1, count, (count + 1));
                    operator.splice(count, 1);

                }
                else if (oper == 'sqr') {
                    square(arr1, count);
                    operator.splice(count, 1);

                }
                else if (oper == '√') {
                    squareroot(arr1, count);
                    operator.splice(count, 1);

                }
            }
            else {
                count++;
            }
        }
    }


}


//function to perform addition
const add = (arr, pos1, pos2) => {
    let result;

    result = arr[pos1] + arr[pos2];
    arr.splice(pos1, 2, result);
}
//function to perform substraction
const sub = (arr, pos1, pos2) => {
    let result = 0;
    result = arr[pos1] - arr[pos2];
    arr.splice(pos1, 2, result);
}
//function to perform multiplication
const mul = (arr, pos1, pos2) => {
    let result = 0;
    result = arr[pos1] * arr[pos2];
    arr.splice(pos1, 2, result);
}
//function to perform division
const div = (arr, pos1, pos2) => {
    let result = 0;
    result = arr[pos1] / arr[pos2];
    arr.splice(pos1, 2, result);
}
//function to calculate square
const square = (arr, pos1) => {
    let result;
    result = arr[pos1] * arr[pos1];
    arr.splice(pos1, 1, result);

}
//function to calculate square root
const squareroot = (arr, pos1) => {
    let result;
    result = Math.sqrt(arr[pos1]);
    arr.splice(pos1, 1, result);

}


//for getting remainder
const rem = (arr, pos1, pos2) => {
    let result = 0;
    result = arr[pos1] % arr[pos2];
    arr.splice(pos1, 2, result);
}

//To change the sign of the number
const signchange = (arr) => {
    let len = arr.length;
    let num = arr[len - 1];
    let str1 = num.toString();
    let len2 = str1.length;
    if (num > 0 || num < 0) {
        num = -num;
    }
    let size = screen.innerText.length;
    let str = screen.innerText.slice(0, size - len2 - 1);
    arr.splice(len - 1, 1);

    if (num < 0) {
        screen.innerText = str + `(${num})`;
    }
    else {
        screen.innerText = str + num;
    }
    return num;
}

//To perform the inversion of the number
const inversion = (arr) => {
    let len = arr.length;
    let num = arr[len - 1];
    let str1 = num.toString();
    let len2 = str1.length;
    let newnum = 1 / num;
    arr.splice(len - 1, 1);
    let size = screen.innerText.length;
    let str = screen.innerText.slice(0, size - len2 - 3);
    screen.innerText = str + newnum;
    return newnum;
}

//To perform bracket operation
const bracketoperation = (arr1, operator) => {
    let newarr = [];
    let newoper = [];
    let pos2 = 0, pos1 = 0;
    for (let firstbrace of operator) {
        if (firstbrace == "(") {
            break;
        }
        else {
            pos1++;
        }
    }
    for (let secondbrace of operator) {
        if (secondbrace == ")") {
            break;
        }
        else {
            pos2++;
        }
    }
    if (pos2 != 0) {
        newarr = arr1.slice(pos1, pos2);
        console.log(newarr);
        if ((pos1 + 1) == (pos2 - 1)) {
            newoper[0] = operator[pos1 + 1];
        }
        else {
            newoper = operator.slice(pos1 + 1, pos2);

        }
        arithmeticoperation(newarr, newoper, bodmass);
        arr1.splice(pos1, pos2 + 1, newarr[0]);
        operator.splice(pos1, pos2 + 1);
    }


}

//for clearing the screen
const clearscreen = (arr1, operator) => {
    arr1 = [];
    operator = [];
    screen.innerText = "0";
    del = true;
}

//To delete a number or an operator
const deletenumber = (arr, operator) => {
    let len = screen.innerText.length;
    let inp = screen.innerText[len - 4];
    let str = screen.innerText.slice(0, len - 4)
    screen.innerText = str;
    let val = numcheck(inp);
    if (val) {
        let size = arr.length;
        let num1 = arr[size - 1] / 10;
        let newnum = Math.floor(num1);
        return newnum;
    }
    else {
        let size1 = operator.length;
        let size = arr.length;
        let num1 = arr[size - 2]
        return num1;
    }


}
