import React, { useContext, useState } from "react";
import images from "../../assets/images/images";
import Input from "../../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import HomeCard from "../../components/cards/HomeCard";
import SignInCards from "../../components/cards/SignInCards";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/userContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.LOGIN,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const userData = response.data.data;

      if (userData) {
        updateUser(userData);

        if (userData.role === "admin") {
          navigate("/admin/dashboard");
        } else if (userData.role === "user") {
          navigate("/user/qanda/light");
        } else {
          navigate("/signin");
        }
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-3xl">
      <div className="grid grid-cols-2 max-[821px]:grid-cols-1 gap-8 min-h-screen p-8">
        <div className="h-full">
          <Link to="/">
            <img src={images.LOGO_COLOR_B} alt="Logo" className="w-[100px]" />
          </Link>

          <div className="flex flex-col my-25">
            <h2 className="text-4xl font-medium">Welcome Back</h2>
            <p className="text-[12px] text-gray-600">
              Please enter your details to sign in
            </p>
          </div>

          <form onSubmit={handleSignin} className="flex flex-col gap-8">
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              lable="Email Address"
              placeholder="friendly.ai@example.com"
              type="text"
            />

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              lable="Password"
              placeholder="Min 8 Characters"
              type="password"
            />

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              <span>{loading ? "Signing In..." : "Sign In"}</span>
            </button>
          </form>

          <p className="text-[12px] text-black mt-10 text-center">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="w-full h-full relative max-[821px]:hidden">
          <img
            src={images.SIGNIN_IMAGE}
            alt="Sign In"
            className="rounded-3xl absolute top-0 left-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 p-8 flex justify-end">
            <div className="flex flex-col items-end justify-end space-y-4 w-full">
              <div className="w-[75%]">
                <HomeCard />
              </div>

              <div className="w-[75%]">
                <SignInCards />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
