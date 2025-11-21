import { Doctor } from "./doctor.js";

const container = document.getElementById("doctorsContainer");
const template = document.getElementById("doctorCardTemplate");
const loadingGif = document.getElementById("loading-gif");

async function loadDoctors() {
  container.innerHTML = ''
  loadingGif.style.display = "block";
  const doctors = await Doctor.getDoctors();
  loadingGif.style.display = "none";

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

    editBtn.addEventListener("click", () => editDoctor(doctor));
    deleteBtn.addEventListener("click", () => deleteDoctor(doctor));

    container.appendChild(clone);
  });

  
}

async function editDoctor(doctor) {
  const newName = prompt("Новое имя:", doctor.name);
  const newSpecialty = prompt("Новая специализация:", doctor.specialty);
  const newExperience = prompt("Опыт:", doctor.experience);
  const newEducation = prompt("Образование:", doctor.education);
  const newBio = prompt("Описание:", doctor.bio);
  const newSchedule = prompt("Новая график:", doctor.schedule);
  

  await Doctor.updateDoctor(doctor.id, {
    name: newName,
    specialty: newSpecialty,
    experience: newExperience,
     education: newEducation,
     bio: newBio,
    schedule: newSchedule,
  });

  alert("Доктор обновлён!");
  loadDoctors(); 
}


async function deleteDoctor(doctor) {
  let conf =confirm("Вы уверены, что хотите удалить этого врача?")
  if (conf) {
    await Doctor.deleteDoctor(doctor.id);
    alert("Доктор удалён!");
    loadDoctors();
  }
}

loadDoctors();


