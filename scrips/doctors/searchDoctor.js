import {showDoctors} from "./viewDoctors.js"
import { Doctor } from "./doctor.js";

 let allDoctors = await Doctor.getDoctors();

function filterCards() {
  const search = document.getElementById("searchInput").value.toLowerCase().trim();

  const cards = document.querySelectorAll("#doctorsContainer .doctor-card");

  cards.forEach(card => {
  
    const nameEl = card.querySelector(".doctor-name");
    const specEl = card.querySelector(".doctor-specialty");

    const nameText = (nameEl.textContent || "").toLowerCase();
    const specText = (specEl.textContent || "").toLowerCase();

    const matches = nameText.includes(search) || specText.includes(search);
    card.style.display = matches ? "" : "none";
  });
}

document.getElementById("searchInput").addEventListener("keyup", filterCards);

document.getElementById("clearSearch").addEventListener("click", () => {
  const input = document.getElementById("searchInput");
  input.value = "";      
  showDoctors(allDoctors);  
});