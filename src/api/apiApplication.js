import supabaseClient from "@/utils/supabase";

/**
 * Candidate applies to a job
 */
export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  // Unique filename for resume
  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  // Upload resume to Supabase Storage
  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.error("Resume upload error:", storageError);
    throw new Error("Error uploading resume");
  }

  // Public resume URL
  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  // Insert application record
  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error("Error inserting application:", error);
    throw new Error("Error submitting application");
  }

  return data;
}

/**
 * Recruiter updates an application status
 */
export async function updateApplicationStatus(token, { job_id }, status) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();

  if (error || data.length === 0) {
    console.error("Error updating application status:", error);
    return null;
  }

  return data;
}

/**
 * Candidate fetches their applications
 */
export async function getApplications(token, { user_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .select("*, job:jobs(title, company:companies(name))")
    .eq("candidate_id", user_id);

  if (error) {
    console.error("Error fetching applications:", error);
    return null;
  }

  return data;
}
