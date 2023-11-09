"use client";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Image } from "@nextui-org/image";
import { Checkbox } from "@nextui-org/checkbox";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { useState, useReducer } from "react";
import "styles/form.css";
import { addUser } from "@/backend/lib/helper";

const formReducer = (state: any, event: any) => {
  //check event if its from input of type checkbox
  if (event.target.type === "checkbox") {
    return {
      ...state,
      [event.target.name]: event.target.checked,
    };
  }
  return {
    ...state,
    // [event.target.name]: event.target.value,
    ...(event && event.target && event.target.name
      ? { [event.target.name]: event.target.value }
      : {}),
  };
};

export default function Signup() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const images = [
    "/pictures/login/pic1.jpg",
    "/pictures/login/pic2.jpg",
    "/pictures/login/pic3.jpg",
    "/pictures/login/pic4.jpg",
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: any) => {
    if (Object.keys(formData).length == 0) {
      console.log("Please fill out the form");
    }

    // set the user_type based on checkbox state
    formData.user_type = formData.isBroker ? "broker" : "user";

    //add this info to userData
    const result = await addUser(formData);

    if (result && !result.error) {
      console.log("User created:", result);
      window.location.href = "/login"; // Redirect on success
    } else {
      console.error("Signup failed:", result.error);
    }
  };

  return (
    <div className="flex flex-row gap-5 my-5 justify-center place-items-center w-full">
      <div className="w-1/2 ml-5">
        <Image
          src={randomImage}
          alt="5ftapart"
          width="100%"
          height="50%"
          sizes="100vw"
          style={{
            objectFit: "cover",
            height: "90vh",
          }}
        />
      </div>
      <div
        className="login-container w-1/2 justify-center place-items-center flex bg-slate-300 h-full mr-5 rounded-xl"
        style={{
          backgroundImage: "url(/pictures/login/pic5.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "50% 55%",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-[#eeeeee] flex flex-col justify-center rounded-xl w-1/2"
        >
          <div className="mt-5 text-4xl bold-2xl bg-[#eeeeee] rounded-xl p-5 cursor-default text-center font-PPGoshaReg">
            Sign Up
          </div>
          <div className="flex flex-col gap-3 p-5 justify-center">
            <Input
              isRequired
              label="Email"
              placeholder="Enter your email"
              type="email"
              classNames={{ input: "border-none focus:ring-0" }}
              className="max-w-2xl"
              onChange={setFormData}
              name="email"
            />
            <Input
              isRequired
              label="Name"
              placeholder="Enter your name"
              type="text"
              classNames={{ input: "border-none focus:ring-0" }}
              className="max-w-2xl"
              onChange={setFormData}
              name="name"
            />
            <Input
              isRequired
              label="Password:"
              placeholder="Enter your password"
              name="password"
              onChange={setFormData}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              classNames={{
                input: "border-none focus:ring-0 hide-browser-eye-icon",
              }}
              type={isVisible ? "text" : "password"}
              className=""
            />
            <div className="flex flex-row justify-evenly">
              <p className="text-center text-small">
                Already have an account?{" "}
                <Link
                  size="sm"
                  href="/login"
                  className="text-pastelblue font-semibold"
                >
                  Login
                </Link>
              </p>
              <Checkbox
                checked={formData.isBroker}
                onChange={setFormData}
                radius="sm"
                classNames={{ label: "text-small" }}
                color="secondary"
                name="isBroker"
              >
                Broker?
              </Checkbox>
            </div>
            <div className="flex gap-2 justify-end">
              <Button fullWidth color="secondary" onPress={handleSubmit}>
                Sign up
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
