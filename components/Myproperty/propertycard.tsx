import React from "react";
import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/react";
import { properties } from "./propertylist";

export default function PropertyCard({
  isEditable = false,
  isInsideModal = false,
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardContainerClass = isInsideModal
    ? "gap-2 grid-cols-3"
    : "gap-4 grid-cols-5";

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  return (
    <div className={`${cardContainerClass} grid grid-rows-1 p-5`}>
      {properties.map((item, index) => (
        <Card
          shadow="sm"
          key={index}
          isPressable
          onPress={() => console.log("item pressed")} //here is the code that will be executed when the card is pressed
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative"
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

            {isEditable && ( // on hover on one of the cards, the edit and delete buttons will appear
              <div
                className={`absolute top-0 left-0 w-full h-full flex flex-col gap-2 justify-center items-center bg-opacity-50 bg-gray-700 z-10 rounded-xl  transition-opacity duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <Button variant="solid" color="primary" size="sm">
                  Edit
                </Button>
                <Button
                  variant="solid"
                  color="danger"
                  size="sm"
                  onPress={onDeleteOpen}
                >
                  Delete
                </Button>
              </div>
            )}
          </CardBody>
          <CardFooter className="text-small justify-between">
            {" "}
            {/* //card footer, so like the price and all */}
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}

      <Modal size="xs" isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          {(onDeleteClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure?
              </ModalHeader>
              <ModalBody>
                <p>Your property will forever be deleted</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onDeleteClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={onDeleteClose}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
