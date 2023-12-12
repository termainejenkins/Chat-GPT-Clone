const API_KEY = "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"; // Replace with OpenAI API key
const submitButton = document.querySelector("#submit");
const output = document.querySelector("#output");
const chatInput = document.querySelector("input");
const chatHistory = document.querySelector(".history");
const buttonElement = document.querySelector('button');
const BASE_URL = "https://api.openai.com/v1/chat/completions";


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
            messages: [{role: "user", content: "hellow"}],
            max_tokens: 1000,
        }),
    };

try{
    const response = await fetch(BASE_URL, options);
    const data = await response.json();
    console.log(data);
}catch(error){
    console.log(error);
}


}