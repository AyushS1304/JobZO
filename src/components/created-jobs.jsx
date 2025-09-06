import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";
import { useEffect } from "react";

const CreatedJobs = () => {
  const { user, isLoaded } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs);

  useEffect(() => {
    if (isLoaded && user?.id) {
      fnCreatedJobs({ recruiter_id: user.id }); // fetch jobs created by this recruiter
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user?.id]);

  if (!isLoaded || loadingCreatedJobs) {
    return <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {createdJobs?.length ? (
        createdJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onJobAction={fnCreatedJobs}
            isMyJob
          />
        ))
      ) : (
        <div>No Jobs Found 😢</div>
      )}
    </div>
  );
};

export default CreatedJobs;
