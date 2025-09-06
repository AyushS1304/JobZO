import supabaseClient from "@/utils/supabase";

// Fetch Companies
export async function getCompanies(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("Companies").select("*");

  if (error) {
    console.error("Error fetching Companies:", error);
    return null;
  }

  return data;
}

// Add Company
export async function addNewCompany(token, _, companyData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData.name}`;

  // Upload logo
  const { error: storageError } = await supabase.storage
    .from("Company-logo")
    .upload(fileName, CompanyData.logo);

  if (storageError) throw new Error("Error uploading Company Logo");

  // ✅ Get public URL from Supabase (instead of building it manually)
  const { data: publicData } = supabase.storage
    .from("Company-logo")
    .getPublicUrl(fileName);

  const Logo = publicData.publicUrl;

  // Insert company record
  const { data, error } = await supabase
    .from("Companies")
    .insert([{ name: companyData.name, Logo }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Company");
  }

  return data;
}
