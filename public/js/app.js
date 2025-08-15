document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const btnContainer = document.getElementById("btn-container");
  const chatBtn = document.getElementById("chat-btn");

  cards.forEach(card => {
    card.addEventListener("click", () => {
        cards.forEach(c => c.classList.remove("card-selected"));
        card.classList.add("card-selected");
        btnContainer.classList.add("active-btn");

        const speakerName = card.querySelector(".name").textContent;

        chatBtn.textContent = `Start Chat with ${speakerName}`;

    });
  });
});
