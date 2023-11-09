"use client";
import React, { useState, useEffect } from "react";
import Footer from "../../../components/footer";
import NavBar from "../../../components/Navbar/navbar";
import styles from "styles/page.module.css";
import "styles/searchbar.css";
import { useQueryClient } from "react-query";
import {
  Button,
  Card,
  Avatar,
  CardHeader,
  CardBody,
  CardFooter,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { BiPhone } from "react-icons/bi";
import { BiMailSend } from "react-icons/bi";

export default function ResultPage() {
  return (
    <main className={`${styles.main} flex-grow mb-8`}>
      <h1 className="text-3xl font-bold ml-8 mt-5 mb-10">All Brokers</h1>
      {/*Search*/}
      <div className="property-cards rounded-lg m-8 bg-w p-10">
        <Card className="max-w-xl">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="lg"
                src="pictures/login/pic2.jpg"
                className="place-self-center ml-2"
                classNames={{ icon: "w-72" }}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  Broker&apos;s Name
                </h4>
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
            <Popover placement="bottom" showArrow={true} size="sm">
              <PopoverTrigger>
                <Button>Contacts</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">
                    Contact Information
                  </div>
                  <div className="text-tiny">This is the popover content</div>
                </div>
              </PopoverContent>
            </Popover>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
}
