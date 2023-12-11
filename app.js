const API_KEY = "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";
const chatSendButton = document.querySelector(".chat-send-button");
const chatInput = document.querySelector(".chat-input");
const chatContainer = document.querySelector(".chat-container");
const outPutElement = document.querySelector(".output");
const BASE_URL = "https://api.openai.com/v1/chat/completions";

async function generateResponse(message) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
        }),
    });
    const data = await response.json();
    return data.choices[0].message.content;
}

chatSendButton.addEventListener("click", async () => {
    const message = chatInput.value;
    chatInput.value = "";
    const response = await generateResponse(message);
    outPutElement.innerHTML = response;
    chatContainer.scrollTop = chatContainer.scrollHeight;
})

