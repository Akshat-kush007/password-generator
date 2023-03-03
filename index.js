const paswordDisplay = document.querySelector("[data-paswordDisplay]");
const btnCopy = document.querySelector("[data-btnCopy]");
const copyMsg = document.querySelector("[data-copyMsg]")
const passwordLengthNumber = document.querySelector("[data-passwordLengthNumber]")
const slider = document.querySelector("[data-sliderLength]");
const strengthIndicator = document.querySelector("[data-indicator]")
const genetatePassword = document.querySelector("[data-generatePassword]")

const includeUppercase = document.getElementById("uppercase");
const includeLowercase = document.getElementById("lowercase");
const includeNumber = document.getElementById("numbers");
const includeSymbol = document.getElementById("symbols");
const allCheckBox = document.querySelectorAll("input[type=checkbox]")

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

// temp


// Setting Up Initial values
let password = "";
let passwordLength = 10;
let checkCount = 0;

handleSlider();

// functions====================================
function handleSlider() {
    slider.value = passwordLength;
    passwordLengthNumber.innerText = passwordLength;
    slider.style.backgroundSize = (passwordLength / 20) * 100 + "% 100%"
}

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRandInt(0, 9);
}

function generateRandomUpperCase() {
    return String.fromCharCode(getRandInt(97, 123));
}

function generateRandomLowerCase() {
    return String.fromCharCode(getRandInt(65, 91));
}
function generateRandomSymbol() {
    let index = getRandInt(0, symbols.length);
    return symbols.charAt(index);
}


function setIndicator(color) {
    strengthIndicator.style.backgroundColor = color;
    //shadow - HW
    strengthIndicator.style.boxShadow = `0 0 12px 1px ${color}`
}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (includeUppercase.checked) hasUpper = true;
    if (includeLowercase.checked) hasLower = true;
    if (includeNumber.checked) hasNum = true;
    if (allCheckBox.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

// Listeners====================================

// Password-----------------------------
async function copyPassword() {
    try {
        await navigator.clipboard.writeText(paswordDisplay.value);
        copyMsg.innerText = "copied";
    } catch (e) {
        copyMsg.innerText = "Failed";

    }

    // show Message
    copyMsg.classList.add("active");
    // remove Message
    setTimeout(() => {
        copyMsg.classList.remove("active");

    }, 2000);
}

btnCopy.addEventListener('click', copyPassword);


// Slider Listener----------------------
slider.addEventListener('input', (s) => {
    passwordLength = s.target.value;
    handleSlider();
})
// chechBoxes--------------------------
function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    })

    // Special condition
    // if (passwordLength < checkCount) {
    //     passwordLength = checkCount;
    //     handleSlider();
    // }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

// Generate Password------------------
genetatePassword.addEventListener('click', () => {

    if (checkCount == 0)
        return;

    // if (passwordLength < checkCount) {
    //     passwordLength = checkCount;
    //     handleSlider();
    // }

    // Generating Password
    password = "";

    let funArr = [];
    if (includeUppercase.checked)
        funArr.push(generateRandomUpperCase)
    if (includeLowercase.checked)
        funArr.push(generateRandomLowerCase)
    if (includeNumber.checked)
        funArr.push(generateRandomNumber)
    if (includeSymbol.checked)
        funArr.push(generateRandomSymbol)


    for (let i = 0; i < passwordLength; i++) {
        let randIndex = getRandInt(0, funArr.length);
        password += funArr[randIndex]();
    }

    paswordDisplay.value = password;
    console.log(password);
    calcStrength();
})