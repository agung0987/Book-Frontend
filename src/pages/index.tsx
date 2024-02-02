import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);
  const loginHandler = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    await axios
      .post(`http://127.0.0.1:3000/api/login`, formData)
      .then((response) => {
        Cookies.set("token", response.data.token);

        Router.push("/categorys");
      })
      .catch((error: any) => {
        setValidation(error.response.data);
      });
  };

  //hook useEffect
  useEffect(() => {
    if (Cookies.get("token")) {
      Router.push("/categorys");
    }
  }, []);

  return (
    <>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-700">
            Management Book
          </h1>
          <form onSubmit={loginHandler}>
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full input input-bordered"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full input input-bordered"
              />
            </div>
            <a
              href="#"
              className="text-xs text-gray-600 hover:underline hover:text-blue-600"
            >
              Forget Password?
            </a>
            <div>
              <button type="submit" className="btn btn-block">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
