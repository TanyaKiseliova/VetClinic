import { Doctor } from './Doctor.js';

const container = document.getElementById("doctorsContainer");
const template = document.getElementById("doctorCardTemplate");


async function loadDoctors() {
  const doctors = await Doctor.getDoctors();

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
    schedule.textContent = doctor.schedule || "";
    bio.textContent = doctor.bio || "";

    container.appendChild(clone);
  });
}

loadDoctors();