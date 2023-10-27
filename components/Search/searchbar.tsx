"use client";
import { Select, SelectItem, Button, Input } from "@nextui-org/react";
import { saletypes, propertytypes, priceranges } from "./searchoptions";
import "styles/searchbar.css";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";

export default function SearchBar() {
  // Function to handle redirection on Enter key press
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      window.location.href = "/result";
    }
  };
  return (
    <div className="searchcontainer flex flex-wrap gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-3 justify-center items-center">
      <div className="search relative">
        <input
          type="text"
          className="property-search pl-8"
          placeholder="Region, City, Street"
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className="sale-type">
        <Select label="Sale Type" className="sale-select" radius="sm">
          {saletypes.map((saletype) => (
            <SelectItem key={saletype.value} value={saletype.value}>
              {saletype.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="property-types">
        <Select label="Property Type" radius="sm">
          {propertytypes.map((propertytype) => (
            <SelectItem key={propertytype.value} value={propertytype.value}>
              {propertytype.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="price-range">
        <Select label="Price Range" radius="sm">
          {priceranges.map((pricerange) => (
            <SelectItem key={pricerange.value} value={pricerange.value}>
              {pricerange.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Link href="/result">
        {" "}
        {/* This is the link to the result page */}
        <Button radius="sm" isIconOnly className="w-14 h-14 bg-[#f4f4f5]">
          <BiSearch size={42} className="p-2  text-[#7d7d7f]" />
        </Button>
      </Link>
    </div>
  );
}
