import { Label } from "../ui/Label.jsx";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { toast } from "sonner"; // Assuming you're using react-toastify for toasts
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [formVal, setFormVal] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate(); // Fix navigator to navigate
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const handleFormData = (e) => {
    setFormVal({ ...formVal, [e.target.name]: e.target.value });
  };

  const submitFile = async (e) => {
    e.preventDefault();

    // logging
    try {
      dispatch(setLoading(true));
      const res = await axios.post("https://jobhub-fir1.onrender.com/api/v1/user/login", formVal, {
        // Use formVal instead of formData
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/"); // Use navigate instead of navigator
        toast.success(res.data.message); // Notify success
      }
    } catch (error) {
      console.log(error);
      // Notify error
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
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
          <h2 className="font-bold text-xl mb-5">Login</h2>
          <div className="my-2">
            <Label>Enter Email</Label>
            <Input
              type="email"
              value={formVal.email}
              name="email"
              onChange={handleFormData}
              placeholder="Enter your email"
            />
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
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  checked={formVal.role === "recruiter"}
                  onChange={handleFormData}
                />
                <Label htmlFor="recruiter">Recruiter</Label>
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
                <Label htmlFor="employer">Employer</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="mt-4">
            {loading ? (
              <Button className="w-full my-4">
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4 bg-[#6a38c2] hover:bg-[#3a1f68] text-white">
                Login
              </Button>
            )}

            <span className="text-sm">
              Dont have an account?{" "}
              <Link to="/signup" className="text-blue-500">
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
