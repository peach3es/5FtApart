"use client";
import React, { useEffect, useState } from "react";
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
import { IoHeart, IoHeartDislike } from "react-icons/io5";
import { properties } from "@/components/Result/propertylistresult";
import { getUser } from "../../../backend/lib/helper";
import { getProperty } from "../../../backend/lib/helperProperties";
import { removePropertyFromList } from "../../../backend/lib/helperFavorite";

interface Favorite {
  _id: string;
  address: string;
  price_tag: string;
  postalcode: string;
  city: string;
  sale_type: string;
  property_type: string;
  addimg: string;
}
const FavoritePage = () => {
  const [isClient, setIsClient] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    setIsClient(true);
    const fetchUserFavorites = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const users = await response.json();
        const data = await getUser(users?.user?.id);
        setUserID(users?.user?.id);
        const favPropertyList = data?.favoritePropertyIds;
        const propertyInfoList: Favorite[] = [];
        if (favPropertyList && favPropertyList.length > 0) {
          const apiCalls = favPropertyList.map(async (propertyId: any) => {
            const propertyInfo = await getProperty(propertyId);
            propertyInfoList.push(propertyInfo);
          });
          await Promise.all(apiCalls);
        }

        setFavorites(propertyInfoList); // Update this line
      } catch (error) {
        console.error("Error fetching user favorites:", error);
      }
    };

    fetchUserFavorites();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
  const currentProperties = favorites.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      window.location.href = "/result";
    }
  };

  const handlePropertyClick = (property_id: any) => {
    window.location.href = `/result/property?propertyId=${property_id}`;
  };

  const handleUnfavorite = async (property_id: any) => {
    try {
      await removePropertyFromList(userID, property_id);
      const updatedFavorites = favorites.filter(
        (item) => item._id !== property_id
      );
      setFavorites(updatedFavorites);
    } catch (error) {
      console.log(error);
    }
  };

  const [hoveredCardIndex, setHoveredCardIndex] = useState(-1);

  return (
    <main className={`${styles.main} flex-grow`}>
      <h1 className="text-3xl font-bold ml-72 mt-5 mb-8">Favourite List</h1>

      {/* <Divider className="px-5" /> */}

      {favorites.length > 0 ? (
        <div className="result-content p-5 grid grid-cols-3 gap-x-4 gap-y-8 mx-72">
          {favorites.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => handlePropertyClick(item?._id)}
              onMouseEnter={() => setHoveredCardIndex(index)}
              onMouseLeave={() => setHoveredCardIndex(-1)}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  src={item.addimg}
                  alt={"Property Image"}
                  className="w-full object-cover h-[240px]"
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.address}</b>
                <div className="flex flex-row align-middle gap-3">
                  <p className="text-default-500 place-self-center">
                    {item.price_tag}
                  </p>
                  <div className="place-self-center justify-center rounded-lg ">
                    {isClient && (
                      <Button
                        isIconOnly
                        className="bg-danger w-10"
                        onPress={() => handleUnfavorite(item._id)}
                      >
                        {hoveredCardIndex === index ? (
                          <IoHeartDislike className="w-4 h-4" /> // Icon for hover state
                        ) : (
                          <IoHeart className="w-4 h-4" /> // Default icon
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            fontSize: "1rem",
            color: "#666",
            backgroundColor: "#f3f3f3",
            borderRadius: "8px",
            margin: "20px 0 ",
          }}
        >
          You have no favorites
        </div>
      )}

      {favorites.length > 0 ? (
        <div className="flex justify-center mb-5">
          <Pagination
            isCompact
            showControls
            total={Math.ceil(currentProperties.length / itemsPerPage)}
            initialPage={1}
            color="warning"
            onChange={handlePageChange}
          />
        </div>
      ) : null}
    </main>
  );
};

export default FavoritePage;
