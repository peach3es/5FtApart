import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { propertytypes, saletypes } from "@/components/Search/searchoptions";

export default function ModalAddProperty({ isOpen, onClose }: any) {
  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose} isDismissable={false}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Property
            </ModalHeader>
            <ModalBody>
              <div className="add-form my-5 px-5 grid grid-cols-3 gap-4 place-items-center mx-auto">
                <Input isRequired type="faded" radius="sm" label="Address" />
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
                    <SelectItem key={saletype.value} value={saletype.value}>
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
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="success" onPress={onClose}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
