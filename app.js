const API_KEY = "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"; // Dummy OpenAI API key
const submitButton = document.querySelector("#submit");
const outPutElement = document.querySelector("#output");
const inputElement = document.querySelector("input");
const historyElement = document.querySelector(".history");
const buttonElement = document.querySelector('button');
const BASE_URL = "https://api.openai.com/v1/chat/completions";

function changeInput(text) {
    const intputElement = document.querySelector("input");
    intputElement.value = value;
}

async function getMessage(){
    console.log('clicked')
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inputElement.value}],
            max_tokens: 1000,
        }),
    };

    const response = await fetch(BASE_URL, options);
    const data = await response.json();
    console.log("User Message: ", options)
    console.log("GPT Response: ", data);
    if (data.choices[0].message.content){
        const outPutElement = document.createElement("p");
        outPutElement.textContent = data.choices[0].message.content;
        output.appendChild(outPutElement);
    }

}

submitButton.addEventListener("click", getMessage);

inputElement.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        submitButton.click();
    }
});

function addMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    chatHistory.appendChild(messageElement);
}

function clearInput() {
    chatInput.value = "";
}

function clearHistory() {
    chatHistory.innerHTML = "";
}

function clearOutput() {
    output.innerHTML = "";
}

function clearAll() {
    clearInput();
    clearHistory();
    clearOutput();
}

function displayOutput(text) {
    output.innerHTML = text;
}

buttonElement.addEventListener("click", clearAll);


console.log("app.js loaded");
