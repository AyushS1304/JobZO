import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = async (supabaseAccessToken) => {
  console.log("🔑 Supabase Access Token received:", supabaseAccessToken);

  if (!supabaseAccessToken) {
    console.warn("⚠ No access token provided to supabaseClient!");
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`, // ✅ fixed template string
        "x-client-info": "clerk-supabase",
      },
    },
  });

  console.log("✅ Supabase client created with headers:", {
    Authorization: `Bearer ${supabaseAccessToken ? "[token present]" : "MISSING"}`,
    "x-client-info": "clerk-supabase",
  });

  return supabase;
};

export default supabaseClient;