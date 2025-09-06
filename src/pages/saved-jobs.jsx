import { getSavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SavedJobs = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(() => getSavedJobs(user?.id)); // Pass Clerk user ID as token

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fnSavedJobs();
    }
  }, [isLoaded, isSignedIn, fnSavedJobs]);

  if (!isLoaded || loadingSavedJobs) {
    return <BarLoader className="mb-4" width="100%" color="#36d7b7" />;
  }

  return (
    <div className="p-4">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(savedJobs) && savedJobs.length > 0 ? (
          savedJobs.map((saved) => (
            <JobCard
              key={saved.id}
              job={saved.job} // Render the saved job object
              onJobAction={fnSavedJobs} // Refresh saved jobs after action
              savedInit={true}
            />
          ))
        ) : (
          <div className="text-center text-lg text-gray-500">
            No saved jobs found 👀
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
