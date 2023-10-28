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
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isDismissable={false}>
        <ModalContent>
          {(onClose) => (
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
