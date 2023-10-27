"use client";

import React from "react"; // Import useState hook
import { Image, Input, Tab, Tabs, Button, Link } from "@nextui-org/react";
import "styles/form.css";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

function LogInForm() {
  const images = [
    "/pictures/login/pic1.jpg",
    "/pictures/login/pic2.jpg",
    "/pictures/login/pic3.jpg",
    "/pictures/login/pic4.jpg",
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [selected, setSelected] = React.useState("login");
  const handleTabChange = (key: string | number) => {
    setSelected(key.toString());
  };

  return (
    <div className="flex flex-row gap-5 my-5 justify-center place-items-center w-full">
      <div className="login-container w-1/2 justify-center place-items-center flex bg-slate-300 h-full ml-5 rounded-xl">
        <form
          className="bg-[#eeeeee] flex flex-col justify-center rounded-xl w-1/2"
          id="Login"
        >
          <Tabs
            aria-label="switch"
            className="justify-center mt-5"
            selectedKey={selected}
            onSelectionChange={handleTabChange}
          >
            <Tab key="login" title="Login">
              <div className="flex flex-col gap-3 p-5 justify-center">
                <Input
                  type="email"
                  label="Username:"
                  placeholder="Email"
                  classNames={{ input: "border-none focus:ring-0" }}
                  className="max-w-sm"
                />
                <Input
                  label="Password:"
                  placeholder="Enter your password"
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
                <p className="text-center text-small">
                  Don&apos;t have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("signup")}>
                    Signup
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Log In
                  </Button>
                </div>
              </div>
            </Tab>
            <Tab key="signup" title="Signup">
              <form className="flex flex-col gap-3 p-5 justify-center">
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your name"
                  type="password"
                  classNames={{ input: "border-none focus:ring-0" }}
                  className="max-w-sm"
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  classNames={{ input: "border-none focus:ring-0" }}
                  className="max-w-sm"
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  classNames={{ input: "border-none focus:ring-0" }}
                  className="max-w-sm"
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </form>
      </div>
      <div className="w-1/2 mr-5">
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
    </div>
  );
}

export default LogInForm;
