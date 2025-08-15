document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  let chats = [];

  function renderChats() {
    chatMessages.innerHTML = "";
    chats.forEach(chat => {
      const msgDiv = document.createElement("div");
      msgDiv.classList.add("chat-message", chat.role);

      if (chat.role === "assistant" && chat.loading) {
        msgDiv.innerHTML = `<div class="typing-loader"><span></span><span></span><span></span></div>`;
      } else {
        msgDiv.textContent = chat.content;
      }

      chatMessages.appendChild(msgDiv);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Handle new chat submission
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    const userMsg = { role: "user", content: message };
    chats.push(userMsg);
    renderChats();

    chatInput.value = "";

    const mssg = { role: "assistant", content: "", loading: true };
    chats.push(mssg);
    renderChats();

    const idx = chats.length - 1;

    // Start streaming from API
    try {
      const chatWithHistory = chats.filter(v=>!(v.role==='assistant' && v.loading)).map((v)=>{
        return {'content': v.content, 'role': v.role}
      }) || [];
      payload = [{role:'user', content:message}, ...chatWithHistory];
      const response = await fetch(`/chat?id=${window.speakerId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatWithHistory }),
      });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";
      let firstChunk = true;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        let chunk = decoder.decode(value, { stream: true });

        // Strip "data:" prefix if present
        chunk = chunk.replace(/^data:\s*/g, "");

        fullResponse += chunk;

        // On first chunk, remove loader
        if (firstChunk) {
          chats[idx].loading = false;
          firstChunk = false;
        }

        chats[idx].content = fullResponse;
        renderChats();
      }

      chats[idx].loading = false;
      chats[idx].content = fullResponse;
      renderChats();

    } catch (err) {
      console.error("Error in chat streaming:", err);
      chats[idx].loading = false;
      chats[idx].content = "[Error fetching response]";
      renderChats();
    }
  });
});
