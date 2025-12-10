import { supabase } from "../dbInfo.js";
import { Doctor } from "./doctor.js";
import { loadDoctors } from "./viewDoctors.js";

const editModal = document.getElementById("editModal");
const closeEditModal = document.getElementById("closeEditModal");
const editDoctorForm = document.getElementById("editDoctorForm");

const editDoctorId = document.getElementById("editDoctorId");
const editDoctorName = document.getElementById("editDoctorName");
const editDoctorSpecialty = document.getElementById("editDoctorSpecialty");
const editDoctorExperience = document.getElementById("editDoctorExperience");
const editDoctorEducation = document.getElementById("editDoctorEducation");
const editDoctorSchedule = document.getElementById("editDoctorSchedule");
const editDoctorBio = document.getElementById("editDoctorBio");


export function openEditModal(doctor) {
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

