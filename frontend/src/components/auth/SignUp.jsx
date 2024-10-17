import { Label } from "../ui/Label";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const SingUp = () => {
  const [formVal, setFormVal] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const handleFormData = (e) => {
    setFormVal({ ...formVal, [e.target.name]: e.target.value });
  };

  const handleProfileData = (e) => {
    setFormVal({ ...formVal, file: e.target.files?.[0] });
  };

  const submitFile = async (e) => {
    e.preventDefault();
    //console.log(formVal);
    const formData = new FormData();
    formData.append("fullname", formVal.fullname);
    formData.append("email", formVal.email);
    formData.append("phoneNumber", formVal.phoneNumber);
    formData.append("password", formVal.password);
    formData.append("role", formVal.role);
    if (formVal.file) {
      formData.append("file", formVal.file);
    }
    // make a post request to the server to register the user
    try {
      dispatch(setLoading(true)); // Show loading spinner
      const res = await axios.post("https://jobhub-fir1.onrender.com/api/v1/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message); // Notify error
    } finally {
      dispatch(setLoading(false)); // Hide loading spinner
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitFile}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h2 className="font-bold text-xl mb-5">Sign Up</h2>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={formVal.fullname}
              name="fullname"
              onChange={handleFormData}
              placeholder="Enter full name"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Enter Email</Label>
            <Input
              type="email"
              value={formVal.email}
              name="email"
              onChange={handleFormData}
              placeholder="Enter your email"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Mobile Number</Label>
            <Input
              type="text"
              value={formVal.phoneNumber}
              name="phoneNumber"
              onChange={handleFormData}
              placeholder="Enter your mobile number"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={formVal.password}
              name="password"
              onChange={handleFormData}
              placeholder="Enter your password"
            />
          </div>
          <Label className="w-full flex flex-col mt-5">Role</Label>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  checked={formVal.role === "student"}
                  onChange={handleFormData}
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2 ">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  checked={formVal.role === "recruiter"}
                  onChange={handleFormData}
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="employer"
                  className="cursor-pointer"
                  checked={formVal.role === "employer"}
                  onChange={handleFormData}
                />
                <Label htmlFor="option-two">Employer</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="">
            <Label>Profile</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={handleProfileData}
              className="cursor-pointer"
            />
          </div>
          <div className="mt-4">
            {loading ? (
              <Button className="w-full my-4">
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4 bg-[#6a38c2] hover:bg-[#3a1f68] text-white">
                Sign Up
              </Button>
            )}

            <span className="text-sm">
              Already have an account ?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingUp;
