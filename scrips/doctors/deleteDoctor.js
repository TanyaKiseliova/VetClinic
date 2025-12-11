import { Doctor } from "./doctor.js";
import { loadDoctors } from "./viewDoctors.js";

const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const closeDeleteModal = document.getElementById("closeDeleteModal");

let doctorToDelete = null;

export function openDeleteModal(doctor) {
  doctorToDelete = doctor;
  deleteModal.classList.remove("hidden");
}

closeDeleteModal.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
});

confirmDeleteBtn.addEventListener("click", async () => {
  if (doctorToDelete) {
    await Doctor.deleteDoctor(doctorToDelete.id);
    showPanel("Доктор удалён!");
    deleteModal.classList.add("hidden");
    loadDoctors();
  }
});
