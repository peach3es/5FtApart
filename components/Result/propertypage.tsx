"uses client";
import React from "react";
import FormData from "../../components/Myproperty/AddProperty";
import { useQuery } from "react-query";
import { getProperties } from "../../backend/lib/helperProperties";
import { useEffect } from "react";
import "../../backend/lib/helper";
import { HeartIcon } from "../Navbar/hearticon";
import { BiSolidHomeHeart } from "react-icons/bi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  CircularProgress,
} from "@nextui-org/react";
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
import { getProperty } from "../../backend/lib/helperProperties";
import { getPriority } from "os";

function PropertyInfo({ propertyId }: { propertyId: any }) {
  const { isLoading, isError, data, error } = useQuery(
    ["properties", propertyId],
    () => getProperty(propertyId) // Modify the getProperties function to accept an ID and fetch a single property
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: Offer,
    onOpen: onOffer,
    onOpenChange: onOfferChange,
  } = useDisclosure();

  if (isLoading)
    return (
      <div className="w-full flex text-xl text-center justify-center items-center h-full">
        <CircularProgress label="Loading..." color="primary" />
      </div>
    );
  if (isError) return <div>Error...</div>;

  return (
    <div className="flex flex-row justify-center my-5 w-full gap-10">
      <div className="w-1/2 ml-20">
        <Image
          src={data.addimg}
          className="card-img-top"
          width="100%"
          height="100%"
          alt="House"
        />
      </div>

      <div className="w-1/2 flex flex-col gap-2">
        <h2 className="text-4xl font-bold ">{data.address}</h2>
        <p className="text-lg">{data.city}</p>
        <p className="text-lg">{data.postalcode}</p>
        <p className="text-lg">{data.saletype}</p>
        <p className="text-lg">{data.pricetag}</p>
        <h3 className="text-2xl font-bold">Want to visit the Estate?</h3>
       
       <div className="mb-3 flex flex-row gap-3">
       <Button className="w-1/3  bg-pr  text-w2 " onPress={onOpen}>
          Request Visit
        </Button>

        <Button className="w-1/3  bg-pr  text-w2 " onPress={onOffer}>
          Submit an Offer
        </Button>

        <Link href="/favorite">
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

    
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                We will need some basic information
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
                <Button className="w-1/3  bg-pr  text-w2 " onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={Offer} onOpenChange={onOfferChange} size="4xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                We will need some basic information
              </ModalHeader>
              <ModalBody>
                <p className="mb-2">
                  Please put in your full name & email address and a broker will
                  contact you
                </p>

                <div className="mb-3 flex flex-row gap-1 w-25">
                  <Input type="faded" label="Broker Full name" />
                  <Input
                    type="license #"
                    label="license #"
                    classNames={{ input: "border-none" }}
                  />
                  <Input type="faded" label="Agency" />
                </div>

                <div className="mb-3 flex flex-row gap-3 w-25">
                  <Input type="faded" label="Full Name" />
                  <Input type="faded" label=" Current Address" />
                  <Input
                    type="email"
                    label="Email"
                    classNames={{ input: "border-none" }}
                  />
                  <Input type="faded" label="Offer" />
                </div>

                <div className="mb-3 flex flex-row gap-3">
                <p className="text-base">Offer For {data.address}</p>
                </div>

                <div className="mb-3 flex flex-row gap-3">
                <p className="text-base">{data.address}</p>
                  <p>Please put in the Deed of sale and Occupancy of premises date </p>
                </div>

                <div className="mb-3 flex flex-row gap-3">
                  <Input type="date"/>
                  <Input type="date" />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button className="w-1/3  bg-pr  text-w2 " onPress={onClose}>
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
