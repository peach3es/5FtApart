"uses client";
import React from "react";
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

const PropertyInfo = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
        <h2 className="text-4xl font-bold ">Kanye Mansion</h2>
        <h3 className="text-2xl font-bold">Description</h3>
        <p className="text-lg"># of rooms # of bathrooms</p>
        <h3 className="text-2xl font-bold">Want to visit the Estate?</h3>
        <Button className="w-1/3" onPress={onOpen}>
          Request Visit
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                We'll need some basic informations
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
};

export default PropertyInfo;
