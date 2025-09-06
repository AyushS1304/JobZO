/* eslint-disable react/prop-types */
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => {},
  isMyJob = false,
}) => {
  const [saved, setSaved] = useState(savedInit);

  const { fn: fnSaveJob, loading: loadingSaveJob } = useFetch(saveJob);
  const { user } = useUser();

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleSaveJob = async () => {
    try {
      await fnSaveJob({
        user_id: user.id,
        job_id: job.id,
      });
      setSaved((prev) => !prev);
      onJobAction();
    } catch (err) {
      console.error("Error saving job:", err);
    }
  };

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobAction();
  };

  const getDescriptionPreview = (desc) => {
    if (!desc) return "No description available";
    const firstDot = desc.indexOf(".");
    if (firstDot === -1) {
      return desc.substring(0, 100) + "...";
    }
    return desc.substring(0, firstDot + 1);
  };

  return (
    <Card className="flex flex-col">
      {loadingDeleteJob && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
      <CardHeader className="flex">
        <CardTitle className="flex justify-between font-bold">
          {job.title || "Untitled Job"}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.Company?.Logo && (
            <img
              src={job.Company.Logo}
              alt={job.Company?.Name || "Company Logo"}
              className="h-6"
            />
          )}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.Location || "Unknown"}
          </div>
        </div>

        <hr />

        <p>{getDescriptionPreview(job?.Description)}</p>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button className="w-full bg-blue-950 hover:bg-blue-300">
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingSaveJob}
          >
            {saved ? (
              <Heart size={20} fill="red" stroke="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
