"use client";
import styles from "../../../styles/page.module.css";
import Footer from "../../../components/footer";
import NavBar from "../../../components/Navbar/navbar";
import PropertyCard from "@/components/Myproperty/propertycard";
import "styles/propertycard.css";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
  Badge,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { BsFillHouseAddFill, BsFillHouseDashFill } from "react-icons/bs";
import { propertytypes, saletypes } from "@/components/Search/searchoptions";

const MyProperty = () => {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  return (
    <div className="main-page flex flex-col h-screen">
      <NavBar />
      <main className={`${styles.main} flex-grow overflow-auto`}>
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

          <Modal
            isOpen={isEditOpen}
            onClose={onEditClose}
            size="4xl"
            isDismissable={false}
          >
            <ModalContent>
              {(onEditClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Edit Property
                  </ModalHeader>
                  <ModalBody>
                    <div>
                      <PropertyCard isEditable isInsideModal={true} />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onEditClose}
                    >
                      Close
                    </Button>
                    <Button color="primary" onPress={onEditClose}>
                      Save
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <Modal
            size="4xl"
            isOpen={isAddOpen}
            onClose={onAddClose}
            isDismissable={false}
          >
            <ModalContent>
              {(onAddClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Add Property
                  </ModalHeader>
                  <ModalBody>
                    <div className="add-form my-5 px-5 grid grid-cols-3 gap-4 place-items-center mx-auto">
                      <Input
                        isRequired
                        type="faded"
                        radius="sm"
                        label="Address"
                      />
                      <Input isRequired type="faded" radius="sm" label="City" />
                      <Input
                        isRequired
                        type="faded"
                        radius="sm"
                        label="Postal Code"
                      />
                      <Select label="Property Type" radius="sm" isRequired>
                        {propertytypes.map((propertytype) => (
                          <SelectItem
                            key={propertytype.value}
                            value={propertytype.value}
                          >
                            {propertytype.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <Select
                        isRequired
                        label="Sale Type"
                        className="sale-select"
                        radius="sm"
                      >
                        {saletypes.map((saletype) => (
                          <SelectItem
                            key={saletype.value}
                            value={saletype.value}
                          >
                            {saletype.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <Input
                        isRequired
                        type="faded"
                        label="Price"
                        radius="sm"
                        className="pricetag"
                      />
                    </div>
                    <Textarea
                      label="Description"
                      isRequired
                      type="faded"
                      labelPlacement="outside"
                      placeholder="Enter the description of your property"
                      className={`max-w-xl px-20 mb-5 description`}
                      data-focus="false"
                      classNames={{
                        input: "border-none focus:ring-0",
                      }}
                    />
                    <div className="addimage px-20 flex flex-col gap-3 max-w-xl">
                      <input type="file" className="add-img" />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onAddClose}>
                      Close
                    </Button>
                    <Button color="success" onPress={onAddClose}>
                      Save
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <PropertyCard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyProperty;
