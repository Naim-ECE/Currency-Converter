const URL = "https://api.exchangerate-api.com/v4/latest";

const dropdowns = document.querySelectorAll(".select_container select");
const btn = document.querySelector(".btn");
const toValue = document.querySelector(".to select");
const fromValue = document.querySelector(".from select");
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
    for(currCode in countryList) {
        // console.log(currCode, countryList[currCode]);
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;
        if(newOpt.value !== "USD" && newOpt.value !== "BDT" && newOpt.value !== "EUR" && newOpt.value !== "AUD") {
            select.append(newOpt);
        }
    }
    select.addEventListener("change", (event) => {
        flagUpdate(event.target);
    });
}

window.addEventListener("load", async () => {
    let inp = document.querySelector("form input");
    let amount = inp.value;
    if(amount === "" || amount < 1) {
        amount = 1;
        inp.value = "1";
    }
    // console.log(amount);
    // console.log(toValue.value);
    // console.log(response);
    // console.log(data);
    // console.log(amount);
    // console.log(exRate);
    const URL_FINAL = `${URL}/${fromValue.value}`;
    let response = await fetch(URL_FINAL);
    let data = await response.json();
    let exRate = data.rates[toValue.value];
    amount = amount * exRate;
    msg.classList.remove("fade");
    void msg.offsetWidth;
    msg.classList.add("fade");
    if(response.status >= 200 && response.status <= 299) {
        msg.innerText = `${inp.value} ${fromValue.value} = ${amount} ${toValue.value}`;
    }
    else if(response.status >= 100 && response.status <= 199) {
        msg.innerText = `Server Busy`;
    }
    else if(response.status >= 300 && response.status <= 399) {
        msg.innerText = `URL has been changed`;
    }
    else if(response.status >= 400 && response.status <= 499) {
        msg.innerText = `ERROR`;
    }
    else {
        msg.innerText = `Server Error`;
    }
})

const flagUpdate = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (event) => {
    event.preventDefault();
    let inp = document.querySelector("form input");
    let amount = inp.value;
    if(amount === "" || amount < 1) {
        amount = 1;
        inp.value = "1";
    }
    // console.log(amount);
    // console.log(toValue.value);
    const URL_FINAL = `${URL}/${fromValue.value}`;
    let response = await fetch(URL_FINAL);
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    let exRate = data.rates[toValue.value];
    // console.log(exRate);
    amount = amount * exRate;
    // console.log(amount);
    msg.classList.remove("fade");
    void msg.offsetWidth;
    msg.classList.add("fade");
    if(response.status >= 200 && response.status <= 299) {
        msg.innerText = `${inp.value} ${fromValue.value} = ${amount} ${toValue.value}`;
    }
    else if(response.status >= 100 && response.status <= 199) {
        msg.innerText = `Server Busy`;
    }
    else if(response.status >= 300 && response.status <= 399) {
        msg.innerText = `URL has been changed`;
    }
    else if(response.status >= 400 && response.status <= 499) {
        msg.innerText = `ERROR`;
    }
    else {
        msg.innerText = `Server Error`;
    }
})