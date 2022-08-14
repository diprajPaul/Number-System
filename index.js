const inputSelect = document.querySelector("#inputSelect");
const outputSelect = document.querySelector("#outputSelect");
const input = document.querySelector("#input");
const output = document.querySelector("#output");
const error = document.querySelector("#error");
const convert = document.querySelector("#convert");
const swap = document.querySelector("#swap");

const calculate = () => {
  let base = inputSelect.value; //base presently
  let str = String(input.value),
    regEx,
    err;

  switch (base) {
    case "Binary":
      regEx = /[^01]/g;
      err = str.match(regEx);

      if (errorCheck(regEx, str, error, base)) return;

      if (inputSelect.value == outputSelect.value) {
        output.value = input.value;
        return;
      }
      /*
        Octal length = 5
        Binary length = 6
        Decimal length = 7
        Hexa-Decimal length = 11
       */
      converter(str, 2, outputSelect.value.length, output);
      break;
    case "Decimal":
      regEx = /[^0-9]/g;
      str = String(input.value);
      //   err = str.match(regEx);

      if (errorCheck(regEx, str, error, base)) return;

      if (inputSelect.value == outputSelect.value) {
        output.value = input.value;
        return;
      }
      converter(str, 10, outputSelect.value.length, output);
      break;

    case "Octal":
      regEx = /[^0-7]/g;
      str = String(input.value);
      err = str.match(regEx);

      if (errorCheck(regEx, str, error, base)) return;

      if (inputSelect.value == outputSelect.value) {
        output.value = input.value;
        return;
      }
      converter(str, 8, outputSelect.value.length, output);
      break;

    case "Hexa Decimal":
      regEx = /[^0-9A-F]/g;
      str = String(input.value);
      err = str.match(regEx);

      if (errorCheck(regEx, str, error, base)) return;

      if (inputSelect.value == outputSelect.value) {
        output.value = input.value;
        return;
      }
      converter(str, 16, outputSelect.value.length, output);
  }
};

const errorCheck = (regEx, str, error, base) => {
  let err = str.match(regEx);
  if (err) {
    error.innerText = `Enter ${base} Number Only or Use Other Number System`;
    error.style.display = "block";
    output.value = "";
    return true;
  } else {
    error.innerText = "";
    error.style.display = "none";
  }
};

const converter = (value, base, toConvert, output) => {
  //to find in which number system need to convert
  switch (toConvert) {
    case 5:
      toConvert = 8;
      break;
    case 6:
      toConvert = 2;
      break;
    case 7:
      toConvert = 10;
      break;
    default:
      toConvert = 16;
  }
  //convert all input to Decimal
  value = Number.parseInt(value, base);
  output.value = Number(value).toString(toConvert).toUpperCase();
};

const swapping = () => {
  let temp = inputSelect.value;
  inputSelect.value = outputSelect.value;
  outputSelect.value = temp;

  temp = input.value;
  input.value = output.value;
  output.value = temp;

  input.placeholder = `Enter ${inputSelect.value} Number`;
  output.placeholder = `Convert to ${outputSelect.value}`;

  inputSelectStausCheck();
  outputSelectStausCheck();

  if (input.value == "") {
    convert.disabled = true;
    convert.style.cursor = "not-allowed";
  } else {
    convert.disabled = false;
    convert.style.cursor = "pointer";
  }
};

const inputSelectStausCheck = () => {
  if (inputSelect.value == "Choose") {
    swap.disabled = true;
    swap.style.cursor = "not-allowed";
    input.disabled = true;
    input.value = "";
    input.style.cursor = "not-allowed";
    convert.disabled = true;
    convert.style.cursor = "not-allowed";
    input.placeholder = `Please Select from above`;
  } else {
    input.disabled = false;
    input.style.cursor = "text";
    input.placeholder = `Enter ${inputSelect.value} Number`;
    if (outputSelect.value != "Choose") {
      swap.disabled = false;
      swap.style.cursor = "pointer";
      convert.disabled = false;
      convert.style.cursor = "pointer";
    }
  }
};

const outputSelectStausCheck = () => {
  if (outputSelect.value == "Choose") {
    swap.disabled = true;
    convert.disabled = true;
    convert.style.cursor = "not-allowed";
    swap.style.cursor = "not-allowed";
    output.value = "";
    output.placeholder = `Please Select from above`;
  } else {
    output.placeholder = `Convert to ${outputSelect.value}`;
    if (inputSelect.value != "Choose") {
      swap.disabled = false;
      swap.style.cursor = "pointer";
    }
    if (input.value != "") {
      convert.disabled = false;
      convert.style.cursor = "pointer";
    }
  }
};

convert.addEventListener("click", calculate);

swap.addEventListener("click", swapping);

//after changing select value placeholder will be change accordingly
inputSelect.addEventListener("change", inputSelectStausCheck);

//after changing select value placeholder will be change accordingly
outputSelect.addEventListener("change", outputSelectStausCheck);

// after giving input convert button active
input.addEventListener("input", () => {
  if (
    input.value != "" &&
    outputSelect.value != "Choose" &&
    inputSelect.value != "Choose"
  ) {
    convert.disabled = false;
    convert.style.cursor = "pointer";
    // console.log('ok')
  } else {
    convert.disabled = true;
    convert.style.cursor = "not-allowed";
  }
  //change input to uppercase
  input.value = input.value.toUpperCase();
});
