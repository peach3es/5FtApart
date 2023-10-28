"use client";
import styles from "../../../styles/page.module.css";
import Footer from "../../../components/footer";
import NavBar from "../../../components/Navbar/navbar";
import PropertyCard from "@/components/Myproperty/propertycard";
import "styles/propertycard.css";
import { Button } from "@nextui-org/react";
import { BsFillHouseAddFill, BsFillHouseDashFill } from "react-icons/bs";

import ModalEditProperty from "@/components/Myproperty/Modals/ModalEditProperty";
import { useState } from "react";
import ModalAddProperty from "@/components/Myproperty/Modals/ModalAddProperty";

const MyProperty = () => {
  const [isEditOpen, setEditOpen] = useState(false);
  const onEditOpen = () => setEditOpen(true);
  const onEditClose = () => setEditOpen(false);

  const [isAddOpen, setAddOpen] = useState(false);
  const onAddOpen = () => setAddOpen(true);
  const onAddClose = () => setAddOpen(false);

  return (
    <div className="main-page flex flex-col h-screen">
      <NavBar />
      <main className={`${styles.main} flex-grow`}>
        <h1 className="text-3xl font-bold ml-8 mt-5">
          Property CRUD Dashboard
        </h1>
        <div className="property-cards rounded-lg m-8">
          <div className="title-row flex flex-row justify-between">
            <h2 className="text-2xl font-bold ml-2">My Properties</h2>
            <div className="button-list flex flex-row gap-3 mr-5 mb-2">
              <Button
                variant="solid"
                color="danger"
                size="lg"
                onPress={onEditOpen}
              >
                Edit
                <BsFillHouseDashFill />
              </Button>
              <Button
                variant="solid"
                color="success"
                size="lg"
                onPress={onAddOpen}
              >
                Add
                <BsFillHouseAddFill />
              </Button>
            </div>
          </div>

          <ModalEditProperty isOpen={isEditOpen} onClose={onEditClose} />
          <ModalAddProperty isOpen={isAddOpen} onClose={onAddClose} />

          <PropertyCard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyProperty;
