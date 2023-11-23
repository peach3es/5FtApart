"use client";
import React, { useState, useEffect } from "react";
import styles from "styles/page.module.css";
import "styles/searchbar.css";
import { useQuery } from "react-query";
import {
  Card,
  Avatar,
  CardBody,
  Popover,
  PopoverTrigger,
  PopoverContent,
  CardFooter,
  CircularProgress,
  Divider,
} from "@nextui-org/react";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { BiPhone, BiMailSend } from "react-icons/bi";
import { getUsers } from "@/backend/lib/helper";
import { BiSearch } from "react-icons/bi";
import { getUsersFiltered } from "@/backend/lib/helper";
import { useSearchParams } from "next/navigation";

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function ResultPage() {
  //Search function
  const [props, setUsers] = useState([]);

  const searchParams = useSearchParams();
  const [searchTerm, setSelectedSearchTerm] = useState("");

  const brokerselections = {
    term: searchTerm,
  };

  const handleSearch = async (filters: any) => {
    const filteredProps = await getUsersFiltered(filters);
    console.log(filteredProps);
    setUsers(filteredProps);
  };

  useEffect(() => {
    const getProps = async () => {
      const response = await fetch("/api/users");
      const users = await response.json();
      const userFilters = searchParams.get("brokerselections");
      console.log(response);

      if (userFilters) {
        const results = JSON.parse(userFilters);
        setSelectedSearchTerm(results.term);

        handleSearch(results);
      } else {
        console.error("brokerselections not found in the query parameters.");
      }
      setUsers(users);
    };
    getProps();
  }, [searchParams]);

  //requests using react-query
  const { isLoading, isError, error } = useQuery("users", getUsers);

  if (isLoading)
    return (
      <div className="h-full">
        <div className={`rounded-lg m-7 bg-w p-10 ${styles.containershadow}`}>
          <div className="flex text-xl text-center justify-center items-center p-10 m-8">
            <CircularProgress label="Loading..." color="secondary" />
          </div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex text-xl text-center justify-center items-center rounded-lg bg-w p-10 mx-8">
        <div>Error: {String(error)}</div>
      </div>
    );

  return (
    <main className={`${styles.main} flex-grow mb-8`}>
      <h1 className="text-3xl font-bold ml-8 mt-5 mb-10">All Brokers</h1>
      <div className={`searchcontainer flex flex-wrap gap-4 place-self-center`}>
        <div className="search relative w-full md:w-full lg:w-2/3 xl:w-1/4">
          <input
            type="text"
            className="property-search pl-8"
            placeholder="Name, Company"
            onChange={(e) => setSelectedSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
        <Link
          href={{
            pathname: "/brokers",
            query: {
              brokerselections: JSON.stringify(brokerselections),
            },
          }}
        >
          {" "}
          {/* This is the link to the result page */}
          <Button
            radius="sm"
            isIconOnly
            className="w-14 h-14 bg-pr hover:ring ring-dpr"
          >
            <BiSearch size={42} className="p-2  text-w" />
          </Button>
        </Link>
      </div>
      <Divider />
      <div className={`rounded-lg m-7 bg-w p-10 ${styles.containershadow}`}>
        <div className="grid grid-cols-3 gap-y-10 w-full justify-items-center xl:gap-x-10">
          {props.map((obj: any, index: any) => (
            <BrokerCard {...obj} key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

function BrokerCard({
  name,
  avatar,
  email,
}: {
  name: any;
  avatar: any;
  email: any;
}) {
  return (
    <Card className="max-w-3xl w-full">
      <CardBody className="justify-between">
        <div className="flex gap-10 p-5">
          <Avatar
            isBordered
            radius="full"
            src={avatar}
            className="w-36 h-36 text-large"
            as={Button}
            classNames={{ img: "object-cover" }}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h2 className="text-large font-semibold leading-none text-default-600">
              {name}
            </h2>
            <p>Broker&apos;s Information</p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <p className="text-default-400 text-small">
                  Real Estate Agency
                </p>
              </div>
              <div className="flex gap-1">
                <p className=" text-default-400 text-small">Random Company</p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col px-8 pb-5 pt-0">
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
                    <p>{email}</p>
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
  );
}
