import { supabase } from "../dbInfo.js";

export class Doctor {
  static async addDoctor(doctorData) {
    const { data, error } = await supabase
      .from("doctors")
      .insert([doctorData])
      .select();

      if (error) {
      console.error("Ошибка добавления:", error.message);
      throw error;
    }

    return data;
  }

  static async getDoctors() {
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .order("name");

      if (error) {
      console.error("Ошибка :", error.message);
      throw error;
    }

    return data;
  }

  static async updateDoctor(id, updatedData) {
    const { data, error } = await supabase
      .from("doctors")
      .update(updatedData)
      .eq("id", id);

      if (error) {
      console.error("Ошибка :", error.message);
      throw error;
    }
    return data;
  }

  static async deleteDoctor(id) {
    const { error } = await supabase
    .from("doctors")
    .delete()
    .eq("id", id);

    if (error) {
      console.error("Ошибка :", error.message);
      throw error;
    }
  }
}
