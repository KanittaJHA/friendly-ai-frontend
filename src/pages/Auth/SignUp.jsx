import React, { useContext, useState } from "react";
import images from "../../assets/images/images";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import HomeCard from "../../components/cards/HomeCard";
import SignupCards from "../../components/cards/SignupCards";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username) {
      setError("Please enter username.");
      return;
    }

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
      const payload = { username, email, password };
      if (adminInviteToken) payload.adminInviteToken = adminInviteToken;

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        payload
      );

      const userData = response.data.data || response.data;

      if (userData) {
        updateUser(userData);

        if (userData.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/qanda/light");
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

          <div className="flex flex-col my-16">
            <h2 className="text-4xl font-medium">Create an Account</h2>
            <p className="text-[12px] text-gray-600">
              Join us today by entering your details below.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="flex flex-col gap-8">
            <Input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              lable="Username"
              placeholder="Friendly"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              lable="Email Address"
              placeholder="friendly.ai@example.com"
              type="text"
            />

            <div className="flex gap-6">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                lable="Password"
                placeholder="Min 8 Characters"
                type="password"
              />

              <Input
                value={adminInviteToken}
                onChange={({ target }) => setAdminInviteToken(target.value)}
                lable="Admin Invite Token"
                placeholder="6 Digit Code"
                type="password"
              />
            </div>

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              <span>{loading ? "Signing Up..." : "Sign Up"}</span>
            </button>
          </form>

          <p className="text-[12px] text-black mt-10 text-center">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signin">
              Sign In
            </Link>
          </p>
        </div>

        <div className="w-full h-full relative max-[821px]:hidden">
          <img
            src={images.SIGNUP_IMAGE}
            alt="Sign Up"
            className="rounded-3xl absolute top-0 left-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 p-8 flex justify-end">
            <div className="flex flex-col items-end justify-end space-y-4 w-full">
              <div className="w-[75%]">
                <HomeCard />
              </div>

              <div className="w-[75%]">
                <SignupCards />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
