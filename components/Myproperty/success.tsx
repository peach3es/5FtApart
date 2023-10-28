import React from "react";
// import { BiCheck } from 'react-icons/bi';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface SuccessProps {
  message: string;
}

const Success: React.FC<
  SuccessProps & { isOpen: boolean; onClose: () => void }
> = ({ message, isOpen, onClose }) => {
  return (
    <Modal size="xs" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onDeleteClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Success</ModalHeader>
            <ModalBody>
              <p>{message}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="success" variant="light" onPress={onDeleteClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Success;
