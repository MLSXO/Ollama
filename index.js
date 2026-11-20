const button = document.getElementById("knap")
const field = document.getElementById("prompt")

button.addEventListener("click", function () {
    localChat(field.value).then(function(answer){
        document.getElementById("answer").textContent = answer;
    }).catch(console.error);
});




async function localChat(prompt) {
    const response = await fetch(
        "http://localhost:11434/api/chat",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "qwen2.5:7b",
                messages: [
                    { role: "user", content: prompt }
                ],
                stream: false
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(JSON.stringify(data));
    }

    return data.message.content;
}

