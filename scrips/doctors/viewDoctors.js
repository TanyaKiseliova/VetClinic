import { Doctor } from "./doctor.js";
import {openEditModal} from  "./updateDoctor.js";
import {openDeleteModal} from  "./deleteDoctor.js";

const container = document.getElementById("doctorsContainer");
const template = document.getElementById("doctorCardTemplate");
const loadingGif = document.getElementById("loading-gif");

let allDoctors = [];

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const addLink = document.querySelector("a[href='./addDoctor.html']");
  if (!currentUser) {
    addLink.style.display = "none";
  }

export async function loadDoctors() {
  container.innerHTML = "";
  loadingGif.style.display = "block";
  allDoctors = await Doctor.getDoctors();
  loadingGif.style.display = "none";

  showDoctors(allDoctors);
}

export function showDoctors(doctors) {
    container.innerHTML = "";
  if (!doctors || doctors.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "Нет добавленных врачей.";
    msg.classList.add("text-gray-600");
    container.appendChild(msg);
    return;
  }

  doctors.forEach((doctor) => {
    const clone = template.content.cloneNode(true);

    const photo = clone.querySelector(".doctor-photo");
    const name = clone.querySelector(".doctor-name");
    const specialty = clone.querySelector(".doctor-specialty");
    const experience = clone.querySelector(".doctor-experience");
    const education = clone.querySelector(".doctor-education");
    const schedule = clone.querySelector(".doctor-schedule");
    const bio = clone.querySelector(".doctor-bio");

    const editBtn = clone.querySelector(".edit-btn");
    const deleteBtn = clone.querySelector(".delete-btn");

    if (doctor.photo_url) {
      photo.src = doctor.photo_url;
      photo.alt = doctor.name;
    } else {
      photo.remove();
    }

    name.textContent = doctor.name;
    specialty.textContent = doctor.specialty;
    experience.textContent = doctor.experience + " лет";
    education.textContent = doctor.education;
    schedule.textContent = doctor.schedule || "пока нет данных";
    bio.textContent = doctor.bio || "";

    if (!currentUser) {
    clone.querySelectorAll(".edit-btn, .delete-btn").forEach(btn => {
      btn.style.display = "none";
    });
  }

    editBtn.addEventListener("click", () => openEditModal(doctor));
    deleteBtn.addEventListener("click", () => openDeleteModal(doctor));

    container.appendChild(clone);
  });
}

loadDoctors();
