"use client";
import React, { useState, useEffect } from "react";
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
import { useSearchParams } from 'next/navigation'
import {getPropertiesFiltered} from '../../../backend/lib/helperProperties'
import { filterProps } from "framer-motion";
import SearchBar from "@/components/Search/searchbar";

const ResultPage = () => {
  const [props, setProps] = useState([])
  const searchParams = useSearchParams();


const handleSearch = async (filters: any) => {
  const filteredProps = await getPropertiesFiltered(filters);
  setProps(filteredProps);
  
};

useEffect(() => {

  const getProps = async() => {
    const response = await fetch('/api/property');
    const properties = await response.json();
    const propertyFilters = searchParams.get('propertyselections')

    if (propertyFilters) {
      const results = JSON.parse(propertyFilters);
      handleSearch(results)
  } else {
      console.error('propertyselections not found in the query parameters.');
    }
  
    setProps(properties);
  }

  getProps();

}, [searchParams]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;


  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      window.location.href = "/result";
    }
  };

  const handlePropertyClick = (id: any) => {
    window.location.href = `/result/property/?propertyId=${id}`;
  };

  return (
    <main className={`${styles.main} flex-grow`}>
      <SearchBar/>
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
        {props.map((item: any) => (
          <Card
            shadow="sm"
            key={item._id}
            isPressable
            onPress={() => handlePropertyClick(item._id)}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                className="w-full object-cover h-[240px]"
                src={item.addimg}
                alt ={"Property Image"}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.address}</b>
              <p className="text-default-500">{item.pricetag}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mb-5">
        <Pagination
          isCompact
          showControls
          total={Math.ceil(props.length / itemsPerPage)}
          initialPage={1}
          color="warning"
          onChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default ResultPage;
