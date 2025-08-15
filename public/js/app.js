document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const btnContainer = document.getElementById("btn-container");
  const chatBtn = document.getElementById("chat-btn");

  let selectedSpeakerId = null;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("card-selected"));
      card.classList.add("card-selected");

      const speakerName = card.querySelector(".name").textContent;
      selectedSpeakerId = card.id;

      chatBtn.textContent = `Start Charcha with ${speakerName}`;

      btnContainer.classList.add("active-btn");
    });
  });

  chatBtn.addEventListener("click", () => {
    if (selectedSpeakerId) {
      window.location.href = `/chat/${selectedSpeakerId}`;
    }
  });
});
