"use client";
import React, { useState, useEffect } from "react";
import Footer from "../../../components/footer";
import NavBar from "../../../components/Navbar/navbar";
import styles from "styles/page.module.css";
import "styles/searchbar.css";
import { useQuery, useQueryClient } from "react-query";
import {
  Card,
  Avatar,
  CardBody,
  Popover,
  PopoverTrigger,
  PopoverContent,
  CardFooter,
  CircularProgress,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { BiPhone, BiMailSend } from "react-icons/bi";
import { getUser, getUsers } from "@/backend/database/controller";
import { useSelector, useDispatch } from "react-redux";
import { ObjectId } from "mongoose";

interface User {
  _id: ObjectId;
  name: string;
  email: string;
  avatar: string;
}

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function ResultPage() {
  //requests;
  const { isLoading, isError, data, error } = useQuery("users", getUsers);

  if (isLoading)
    return (
      <div className="w-full flex text-xl text-center justify-center items-center">
        <CircularProgress label="Loading..." color="secondary" />
      </div>
    );

  if (isError)
    return (
      <div className="w-full flex text-xl text-center justify-center items-center">
        <div>Error: {String(error)}</div>
      </div>
    );

  const dataArray = Object.entries(data).map(([key, value]) => ({
    key,
    ...(value as object),
  }));

  return (
    <main className={`${styles.main} flex-grow mb-8`}>
      <h1 className="text-3xl font-bold ml-8 mt-5 mb-10">All Brokers</h1>
      {/*Search*/}
      <div className="rounded-lg m-7 bg-w p-10">
        {dataArray.map((obj: any, index: any) => (
          <Card className="max-w-xl" key={index}>
            <CardBody className="justify-between">
              <div className="flex gap-10 p-5">
                <Avatar
                  isBordered
                  radius="full"
                  src={obj.avatar}
                  className="w-36 h-36 text-large"
                  as={Button}
                  classNames={{ img: "object-cover" }}
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h2 className="text-large font-semibold leading-none text-default-600">
                    {obj.name}
                  </h2>
                  <p>Broker&apos;s Information</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      <p className=" text-default-400 text-small">
                        Random Company
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <p className="text-default-400 text-small">
                        Real Estate Agency
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex flex-col">
              <div className="w-full">
                <Popover placement="bottom" showArrow={true} size="sm">
                  <PopoverTrigger>
                    <Button className=" bg-pr text-w2 w-full">Contacts</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold mb-2">
                        Contact Information
                      </div>
                      <div className="text-tiny flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                          <BiMailSend className="place-self-center" />
                          <p>{obj.email}</p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <BiPhone className="place-self-center" />
                          <p>Phone Number</p>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
