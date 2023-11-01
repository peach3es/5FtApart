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

interface ErrorProps {
  message: string;
}

const Error: React.FC<
  ErrorProps & { isOpen: boolean; onClose: () => void }
> = ({ message, isOpen, onClose }) => {
  return (
    <Modal size="xs" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Error</ModalHeader>
            <ModalBody>
              <p>{message}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Retry
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Error;
