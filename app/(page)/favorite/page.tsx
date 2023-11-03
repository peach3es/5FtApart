"use client";
import React, { useState } from "react";
import styles from "styles/page.module.css";
import "styles/searchbar.css";
import {
  Select,
  SelectItem,
  Button,
  Divider,
  Card,
  CardBody,
  CardFooter,
  Image,
  Pagination,
} from "@nextui-org/react";
import {
  saletypes,
  propertytypes,
  priceranges,
} from "@/components/Search/searchoptions";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { properties } from "@/components/Result/propertylistresult";

const FavoritePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      window.location.href = "/result";
    }
  };

  const handlePropertyClick = (event: any) => {
    window.location.href = "/result/property";
  };

  return (
    <main className={`${styles.main} flex-grow`}>
   
      <Divider className="px-5" />
      {/* <div className="flex justify-center mt-5"> pagination aren't in sync yet so we're only using one of them
        <Pagination
          isCompact
          showControls
          total={Math.ceil(properties.length / itemsPerPage)}
          initialPage={1}
          color="warning"
          onChange={handlePageChange}
        />
      </div> */}

      <div className="result-content p-5 grid grid-cols-3 gap-x-4 gap-y-8 mx-72">
        {currentProperties.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={handlePropertyClick}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[240px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mb-5">
        <Pagination
          isCompact
          showControls
          total={Math.ceil(properties.length / itemsPerPage)}
          initialPage={1}
          color="warning"
          onChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default FavoritePage;
