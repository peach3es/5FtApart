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
import { useSearchParams } from "next/navigation";
import { getPropertiesFiltered } from "../../../backend/lib/helperProperties";
import { filterProps } from "framer-motion";
import SearchBar from "@/components/Search/searchbar";

const ResultPage = () => {
  const [props, setProps] = useState([]);

  const searchParams = useSearchParams();
  const [searchTerm, setSelectedSearchTerm] = useState("");
  const [selectedSaleType, setSelectedSaleType] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const propertyselections = {
    term: searchTerm,
    saleType: selectedSaleType,
    propertyType: selectedPropertyType,
    priceRange: selectedPriceRange,
  };

  const handleSearch = async (filters: any) => {
    const filteredProps = await getPropertiesFiltered(filters);
    console.log(filteredProps);
    setProps(filteredProps);
  };

  useEffect(() => {
    const getProps = async () => {
      const response = await fetch("/api/property");
      const properties = await response.json();
      const propertyFilters = searchParams.get("propertyselections");

      if (propertyFilters) {
        const results = JSON.parse(propertyFilters);
        setSelectedSaleType(results.saleType);
        setSelectedPropertyType(results.propertyType);
        setSelectedPriceRange(results.priceRange);
        setSelectedSearchTerm(results.term);

        handleSearch(results);
      } else {
        console.error("propertyselections not found in the query parameters.");
      }

      setProps(properties);
    };

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
      <form onSubmit={handleSearch} className="justify-center flex">
        <div className="p-5 flex flex-wrap gap-4 justify-center w-[70vw]">
          <div className="search relative w-full md:w-full lg:w-2/3 xl:w-1/4">
            <input
              type="text"
              className="property-search pl-8"
              placeholder="Region, City, Street"
              onKeyDown={handleKeyPress}
              value={searchTerm}
              onChange={(e) => setSelectedSearchTerm(e.target.value)}
            />
          </div>
          <div className="sale-type w-4/12 md:w-1/6 lg:w-1/6 xl:w-1/6">
            <Select
              label="Sale Type"
              className="sale-select"
              radius="sm"
              onChange={(e) => setSelectedSaleType(e.target.value)}
              selectedKeys={selectedSaleType ? [selectedSaleType] : []}
            >
              {saletypes.map((saletype) => (
                <SelectItem key={saletype.value} value={saletype.value}>
                  {saletype.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="property-types w-5/12 md:w-3/12 lg:w-3/12 xl:w-1/6">
            <Select
              label="Property Type"
              radius="sm"
              onChange={(e) => setSelectedPropertyType(e.target.value)}
              selectedKeys={selectedPropertyType ? [selectedPropertyType] : []}
            >
              {propertytypes.map((propertytype) => (
                <SelectItem key={propertytype.value} value={propertytype.value}>
                  {propertytype.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="price-range w-4/12 md:w-3/12 lg:w-3/12 xl:w-1/6">
            <Select
              label="Price Range"
              radius="sm"
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              selectedKeys={selectedPriceRange ? [selectedPriceRange] : []}
            >
              {priceranges.map((pricerange) => (
                <SelectItem key={pricerange.value} value={pricerange.value}>
                  {pricerange.label}
                </SelectItem>
              ))}
            </Select>
          </div>{" "}
          {/* This is the link to the result page */}
          <Link
            href={{
              pathname: "/result",
              query: {
                propertyselections: JSON.stringify(propertyselections),
              },
            }}
          >
            {" "}
            {/* This is the link to the result page */}
            <Button radius="sm" isIconOnly className="w-14 h-14 bg-pr">
              <BiSearch size={42} className="p-2  text-[#fefbff]" />
            </Button>
          </Link>
        </div>
      </form>
      <Divider className="px-5" />
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
                alt={"Property Image"}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.address}</b>
              <p className="text-default-500">
                ${new Intl.NumberFormat("en-US").format(item.pricetag)}
              </p>
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
          classNames={{ cursor: "bg-pr" }}
          onChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default ResultPage;
