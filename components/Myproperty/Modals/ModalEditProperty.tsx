import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "@nextui-org/react";
import PropertyCard from "../propertycard";

export default function ModalEditProperty({ isOpen, onClose }: any) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="5xl" isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Property
              </ModalHeader>
              <ModalBody className="overflow-y-visible">
                <div>
                  <PropertyCard isEditable isInsideModal={true} />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
