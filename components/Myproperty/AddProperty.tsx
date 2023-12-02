import React, { useReducer, useState } from "react";
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
import { propertytypes, saletypes, statusTypes } from "@/components/Search/searchoptions";
import Success from "./success";
import Error from "./error";

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function AddProperty({ isOpen, onClose }: any) {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleSubmit = () => {
    if (Object.keys(formData).length == 0) {
      console.log("Please fill out the form");
      return setIsErrorModalOpen(true);
    } else {
      console.log(formData);
      return setIsSuccessModalOpen(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false); // Close success modal
    onClose(); // Close the add property modal
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false); // Close success modal
    onClose(); // Close the add property modal
  };

  return (
    <>
      <Modal size="4xl" isOpen={isOpen} onClose={onClose} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
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
                    name="address"
                    onChange={setFormData}
                  />
                  <Input
                    isRequired
                    type="faded"
                    radius="sm"
                    label="City"
                    name="City"
                    onChange={setFormData}
                  />
                  <Input
                    isRequired
                    type="faded"
                    radius="sm"
                    label="Postal Code"
                    name="postalcode"
                    onChange={setFormData}
                  />
                  <Select
                    label="Property Type"
                    radius="sm"
                    isRequired
                    name="propertytype"
                    onChange={setFormData}
                  >
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
                    name="saletype"
                    onChange={setFormData}
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
                    name="pricetag"
                    onChange={setFormData}
                  />
                </div>
                <Textarea
                  label="Description"
                  name="description"
                  isRequired
                  type="faded"
                  labelPlacement="outside"
                  placeholder="Enter the description of your property"
                  className={`max-w-xl px-20 mb-5 description`}
                  data-focus="false"
                  classNames={{
                    input: "border-none focus:ring-0",
                  }}
                  onChange={setFormData}
                />
                                  <Select
                    isRequired
                    label="Status"
                    className="status-select"
                    radius="sm"
                    name="statustype"
                    onChange={setFormData}
                  >
                    {statusTypes.map((statustype) => (
                      <SelectItem key={statustype.value} value={statustype.value}>
                        {statustype.label}
                      </SelectItem>
                    ))}
                  </Select>
                <div className="addimage px-20 flex flex-col gap-3 max-w-xl">
                  <input
                    type="file"
                    className="add-img"
                    name="addimg"
                    onChange={setFormData}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" onPress={handleSubmit}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Success
        message="Property was added successfully"
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
      />
      <Error
        message="Error"
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
      />
    </>
  );
}
