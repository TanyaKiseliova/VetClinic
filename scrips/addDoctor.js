import { supabase } from "./dbInfo.js";
import { Doctor } from "./Doctor.js";

class DoctorForm {
  constructor() {

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
        alert("Ошибка загрузки фото:", uploadError.message);
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
    alert("✅ Доктор успешно добавлен!");
  }

  clearForm() {
    this.form.reset();
  }
}

new DoctorForm();
