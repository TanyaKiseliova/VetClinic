import { supabase } from "./dbInfo.js";

export class Doctor {
  static async addDoctor(doctorData) {
    const { data, error } = await supabase
      .from("doctors")
      .insert([doctorData])
      .select();

    return data;
  }

  static async getDoctors() {
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .order("name");

    return data;
  }

  static async deleteDoctor(id) {
    
    const { error } = await supabase.from("doctors").delete().eq("id", id);
  }
}
