"uses client";
import React from "react";
import FormData from "../../components/Myproperty/AddProperty";
import { useQuery } from "react-query";
import { getProperties } from "../../backend/lib/helperProperties";
import { useEffect } from "react";
import "../../backend/lib/helper";
import { HeartIcon } from "../Navbar/hearticon";
import { BiSolidHomeHeart } from "react-icons/bi";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Button,
  Input,
} from "@nextui-org/react";
import { propertytypes } from "../Search/searchoptions";
import { getPriority } from "os";

function PropertyInfo() {
  const { isLoading, isError, data, error } = useQuery(
    "property",
    getProperties
  );
  console.log(data);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as any).message}</div>;

  return (
    <div className="flex flex-row justify-center my-5 w-full gap-10">
      <div className="w-1/2 ml-20">
        <Image
          src="https://static.timesofisrael.com/www/uploads/2020/12/1L.jpg"
          className="card-img-top"
          width="100%"
          height="100%"
          alt="House"
        />
      </div>

      <div className="w-1/2 flex flex-col gap-2">
        <h2 className="text-2xl">{}</h2>
        <h3 className="text-2xl font-bold">Want to visit the Estate?</h3>
        <Button className="w-1/3" onPress={onOpen}>
          Request Visit
        </Button>

        <Link href="../../app/(page)/favorite/page.tsx">
          <Popover placement="right">
            <PopoverTrigger>
              <Button isIconOnly color="danger" aria-label="Like">
                <BiSolidHomeHeart />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold">
                  Added to your favorites!
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </Link>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                We will need some basic informations
              </ModalHeader>
              <ModalBody>
                <p className="mb-2">
                  Please put in your full name & email address and a broker will
                  contact you
                </p>
                <div className="mb-3 flex flex-row gap-3">
                  <Input type="faded" label="Full Name" />
                  <Input
                    type="email"
                    label="Email"
                    classNames={{ input: "border-none" }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default PropertyInfo;
