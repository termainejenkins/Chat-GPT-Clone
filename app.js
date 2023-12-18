// app.js

// Retrieve the API key from localStorage or set a default value
let API_KEY = localStorage.getItem('api_key'); // Taken from the frontend, OpenAI API key
const submitButton = document.querySelector("#submit");
const outPutElement = document.querySelector("#output");
const inputElement = document.querySelector("#user-input");
const historyElement = document.querySelector(".history");
const buttonElement = document.querySelector('button');
const apiKeyIndicator = document.getElementById('api-key-indicator');
const BASE_URL = "https://api.openai.com/v1/chat/completions";

function changeInput(text) {
    const inputElement = document.querySelector("input");
    inputElement.value = text;
}


async function getMessage(){
    console.log('clicked')

    if (!inputElement.value) {
        alert("Please enter a message");
        return;
    }
 

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

    
    const outPutElement = document.createElement("p");
    outPutElement.textContent = "YOU:  " + inputElement.value;
    output.appendChild(outPutElement);
    console.log("User Message: ", inputElement.value)
    inputElement.value = "";

    const response = await fetch(BASE_URL, options);
    const data = await response.json();

    
    if (data.choices[0].message.content){
        const outPutElement = document.createElement("p");
        outPutElement.textContent = "GPT:  " + data.choices[0].message.content;
        output.appendChild(outPutElement);
        // historyElement.appendChild(outPutElement)
        console.log("GPT Response: ", data.choices[0].message.content)
    } else {
        const outPutElement = document.createElement("p");
        outPutElement.textContent = "No response from GPT";
        output.appendChild(outPutElement);
        console.log("No response from GPT")        
    }


}



// Function to set the API key in localStorage
function setApiKey(key) {
    API_KEY = key;
    localStorage.setItem('api_key', key);
}

submitButton.addEventListener("click", getMessage);

buttonElement.addEventListener("click", clearAll, saveConversation);

// Event listener for the "Save" button
const saveApiKeyButton = document.getElementById('save-api-key');
const apiKeyInput = document.getElementById('api-key');



// Update the visual indicator based on whether API key is saved
function updateApiKeyIndicator() {
    if (API_KEY) {
        apiKeyIndicator.textContent = 'API Key Saved';
        apiKeyIndicator.style.color = 'green'; // Change color or use a class for styling
    } else {
        apiKeyIndicator.textContent = 'No API Key Saved';
        apiKeyIndicator.style.color = 'red'; // Change color or use a class for styling
    }
}

// Call the function initially to set the indicator based on the existing API key
updateApiKeyIndicator();


saveApiKeyButton.addEventListener('click', () => {
    setApiKey(apiKeyInput.value);
    updateApiKeyIndicator(); // Update the indicator after saving
    alert('API Key saved!');
});

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
    outPutElement.value = "";
}

function clearHistory() {
    historyElement.innerHTML = "";
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

function displayHistory(text) {
    chatHistory.innerHTML = text;
}

function saveConversation(text) {
    const conversationElement = document.createElement("p");
    conversation.textContent = text;
    historyElement.appendChild(conversationElement);
    console.log("Conversation saved: ", conversation);
}
function loadConversation(text) {
    const conversationElement = document.createElement("p");
    conversation.textContent = text;
    historyElement.appendChild(conversationElement);
    console.log("Conversation loaded: ", conversation);
}

console.log("app.js loaded");