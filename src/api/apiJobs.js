import supabaseClient from "@/utils/supabase";

// =============================
// Fetch Jobs
// =============================
export async function getJobs(token, { Location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("Jobs")
    .select("*, saved: saved_jobs(id), Company: Companies(Name,Logo)");

  if (Location) {
    query = query.eq("Location", Location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
};

// =============================
// Read Saved Jobs
// =============================
export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("saved_jobs")
    .select("id, created_at, user_id, job_id, job");

  if (error) {
    console.error("Error fetching Saved Jobs:", error);
    return null;
  }

  return data;
};

// =============================
// Read Single Job
// =============================
export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("Jobs")
    .select("*, Company: Companies(Name,Logo), applications: applications(*)")
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }

  return data;
};

// =============================
// Add / Remove Saved Job
// =============================
export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    // Remove saved job
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id)
      .eq("user_id", saveData.user_id)
      .select();

    if (deleteError) {
      console.error("Error removing saved job:", deleteError);
      return data;
    }

    return data;
  } else {
    // Insert saved job with full job snapshot
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([
        {
          user_id: saveData.user_id,
          job_id: saveData.job_id,
          job: saveData.job,
        },
      ])
      .select();

    if (insertError) {
      console.error("Error saving job:", insertError);
      return data;
    }

    return data;
  }
};

// =============================
// Update Job Hiring Status
// =============================
export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("Jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error Updating Hiring Status:", error);
    return null;
  }

  return data;
};

// =============================
// Get My Created Jobs
// =============================
export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("Jobs")
    .select("*, Company: Companies(Name,Logo)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }

  return data;
};

// =============================
// Delete Job
// =============================
export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("Jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error deleting job:", error);
    return data;
  }

  return data;
};

// =============================
// Add New Job
// =============================
export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("Jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error Creating Job");
  }

  return data;
};
