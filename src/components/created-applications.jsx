import { useUser } from "@clerk/clerk-react";
import ApplicationCard from "./application-card";
import { useEffect } from "react";
import { getApplications } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const CreatedApplications = () => {
  const { user, isLoaded } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications);

  useEffect(() => {
    if (isLoaded && user?.id) {
      fnApplications({ candidate_id: user.id }); // filter by logged-in candidate
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user?.id]);

  if (!isLoaded || loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-2">
      {applications?.length ? (
        applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate={true}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center">No applications yet 👀</p>
      )}
    </div>
  );
};

export default CreatedApplications;
