import { Doctor } from "./doctor.js";
import { supabase } from "../dbInfo.js";

const container = document.getElementById("doctorsContainer");
const template = document.getElementById("doctorCardTemplate");
const loadingGif = document.getElementById("loading-gif");

const editModal = document.getElementById("editModal");
const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const closeDeleteModal = document.getElementById("closeDeleteModal");
const closeEditModal = document.getElementById("closeEditModal");
const editDoctorForm = document.getElementById("editDoctorForm");

const editDoctorId = document.getElementById("editDoctorId");
const editDoctorName = document.getElementById("editDoctorName");
const editDoctorSpecialty = document.getElementById("editDoctorSpecialty");
const editDoctorExperience = document.getElementById("editDoctorExperience");
const editDoctorEducation = document.getElementById("editDoctorEducation");
const editDoctorSchedule = document.getElementById("editDoctorSchedule");
const editDoctorBio = document.getElementById("editDoctorBio");

let doctorToDelete = null;
let allDoctors = [];

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const addLink = document.querySelector("a[href='./addDoctor.html']");
  if (!currentUser) {
    addLink.style.display = "none";
  }

// if (currentUser) {
//   document.querySelectorAll(".edit-btn, .delete-btn").forEach(btn => {
//     btn.style.display = "inline-block";
//   });
// }


async function loadDoctors() {
  container.innerHTML = "";
  loadingGif.style.display = "block";
  // const doctors = await Doctor.getDoctors();
  allDoctors = await Doctor.getDoctors();
  loadingGif.style.display = "none";

  showDoctors(allDoctors);
}

function showDoctors(doctors) {
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


function openEditModal(doctor) {
  editDoctorId.value = doctor.id;
  editDoctorName.value = doctor.name;
  editDoctorSpecialty.value = doctor.specialty;
  editDoctorExperience.value = doctor.experience;
  editDoctorEducation.value = doctor.education;
  editDoctorSchedule.value = doctor.schedule;
  editDoctorBio.value = doctor.bio;
  editModal.classList.remove("hidden");
}

closeEditModal.addEventListener("click", () => {
  editModal.classList.add("hidden");
});

editDoctorForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("editDoctorId").value;
  const name = document.getElementById("editDoctorName").value;
  const specialty = document.getElementById("editDoctorSpecialty").value;
  const experience = document.getElementById("editDoctorExperience").value;
  const education = document.getElementById("editDoctorEducation").value;
  const schedule = document.getElementById("editDoctorSchedule").value;
  const bio = document.getElementById("editDoctorBio").value;

  const photoInput = document.getElementById("editDoctorPhoto");
  let photo_url = null;
  if (photoInput.files && photoInput.files[0]) {
    const file = photoInput.files[0];
    const fileName = `${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("doctors")
      .upload(fileName, file);
    if (!uploadError) {
      const { data: urlData } = supabase.storage
        .from("doctors")
        .getPublicUrl(fileName);
      photo_url = urlData.publicUrl;
    }
  }

  const updateData = { name, specialty, experience, education, schedule, bio };
  if (photo_url) updateData.photo_url = photo_url;

  await Doctor.updateDoctor(id, updateData);

  alert("Доктор обновлён!");
  editModal.classList.add("hidden");
  loadDoctors();
});

function openDeleteModal(doctor) {
  doctorToDelete = doctor;
  deleteModal.classList.remove("hidden");
}

closeDeleteModal.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
});

confirmDeleteBtn.addEventListener("click", async () => {
  if (doctorToDelete) {
    await Doctor.deleteDoctor(doctorToDelete.id);
    alert("Доктор удалён!");
    deleteModal.classList.add("hidden");
    loadDoctors();
  }
});

loadDoctors();
