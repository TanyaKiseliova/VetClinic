import { supabase } from "../dbInfo.js";
import { showPanel } from "../messages.js";
import { Doctor } from "./doctor.js";


const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || (currentUser.role !== "admin" )) {
  showPanel("Нет доступа к добавлению врачей.");
  window.location.href = "../login.html";
}


class DoctorForm {
  constructor() {
    this.form = document.getElementById("doctorForm");

    const submitBtn =document.getElementById("submitBtn")
    submitBtn.addEventListener("click", (e) => this.handleSubmit(e));

    const clearBtn =document.getElementById("clearBtn")
    clearBtn.addEventListener("click", () => this.clearForm());
  }


  async handleSubmit(e) {
    e.preventDefault();

    const formData = await this.getFormData();
    await Doctor.addDoctor(formData);

    this.showSuccess();
    this.clearForm();
  }

  async getFormData() {
    const photoInput = document.getElementById("doctorPhoto");
    let photo_url = null;

    if (photoInput.files && photoInput.files[0]) {
      const file = photoInput.files[0];
      const fileName = `${Date.now()}_${file.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("doctors")
        .upload(fileName, file);

      if (uploadError) {
        showPanel("Ошибка загрузки фото:", uploadError.message);
      } else {
        const { data: urlData } = supabase.storage
          .from("doctors")
          .getPublicUrl(fileName);

        photo_url = urlData.publicUrl;
      }
      
    }

    return {
      name: document.getElementById("doctorName").value,
      specialty: document.getElementById("doctorSpecialty").value,
      experience: document.getElementById("doctorExperience").value,
      education: document.getElementById("doctorEducation").value,
      bio: document.getElementById("doctorBio").value,
      schedule: document.getElementById("doctorSchedule").value,
      photo_url: photo_url,
    };
  }

  showSuccess() {
   showPanel("✅ Доктор успешно добавлен!");
  }

  clearForm() {
    this.form.reset();
  }
}

new DoctorForm();
