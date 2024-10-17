import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/Label";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isHaveResume = true; // Update this to fetch from backend if needed
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  // users data
  const { user } = useSelector((store) => store.auth);
  console.log(user);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 ">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              {/* Dynamically add profile image or a fallback */}
              <AvatarImage className="object-cover" src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl ">{user?.fullname || "No Name"}</h1>
              <p className="text-sm text-gray-500">
                {user?.profile?.bio || "No bio available"}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email || "No email available"}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber || "No phone number available"}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="font-medium text-xl">Skills</h1>
          <div className="flex items-center gap-1 flex-wrap">
            {user?.profile?.skills?.length > 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge className="bg-zinc-100 rounded-md mt-2 border-none" variant="outline" key={index}>{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="font-medium text-xl">Resume</Label>
          {isHaveResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume} 
              className="text-xl text-blue-600 w-full hover:underline"
            >
              see
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        {/* Application table */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
