const API_KEY = "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";
const chatSendButton = document.querySelector(".chat-send");
const chatInput = document.querySelector(".chat-input");
const chatContainer = document.querySelector(".chat-container");
const output = document.querySelector(".output");
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

    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
        throw new Error("Error: No response choices found.");
    }

    return data.choices[0].message.content;
}


chatSendButton.addEventListener("click", async () => {
    const message = chatInput.value;
    chatInput.value = "";
    const response = await generateResponse(message);
    output.innerHTML = response;
    chatContainer.scrollTop = chatContainer.scrollHeight;
})
