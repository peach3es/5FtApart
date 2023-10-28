import React, { useReducer, useState, useCallback, useEffect } from "react";
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
import Success from "../success";
import Error from "../error";
import { useQueryClient, useMutation } from "react-query";
import { toggleChangeAction } from "../../../backend/redux/reducer";
import { useDispatch } from "react-redux";
import { addProperty, getProperty } from "@/backend/lib/helperProperties";

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function ModalAddProperty({ isOpen, onClose }: any) {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [isEmpty, setIsEmpty] = useState(false); // New state
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handler = useCallback(() => {
    dispatch(toggleChangeAction());
  }, [dispatch]);

  const handleSubmit = () => {
    if (Object.keys(formData).length == 0) {
      console.log("Please fill out the form");
      setIsEmpty(true); // Set isEmpty to true when data is empty
      return setIsErrorModalOpen(true);
    } else {
      console.log(formData);
      let {
        addimg,
        address,
        pricetag,
        description,
        postalcode,
        city,
        saletype,
        propertytype,
      } = formData;

      const model = {
        addimg,
        address,
        pricetag,
        description,
        postalcode,
        city,
        saletype,
        propertytype,
      };

      addMutation.mutate(model); //addMutation.mutate({}) is the request
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

  //request
  const queryClient = useQueryClient();
  const addMutation = useMutation(addProperty, {
    onSuccess: () => {
      queryClient.prefetchQuery("properties", getProperty);
    },
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (addMutation.isSuccess || isEmpty) {
      // Check either for mutation success or data empty
      timeoutId = setTimeout(() => {
        handler();
      }, 2500);
    }
    // Cleanup the timeout when the component is unmounted
    return () => {
      clearTimeout(timeoutId);
    };
  }, [addMutation.isSuccess, isEmpty, handler]); // Add isEmpty as a dependency

  if (addMutation.isLoading)
    return (
      <div className="w-full flex text-xl text-center justify-center items-center">
        <div>Loading...</div>
      </div>
    );

  if (addMutation.isError)
    return (
      <Error
        message={(addMutation.error as Error).message}
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
      />
    );

  if (addMutation.isSuccess)
    return (
      <Success
        message="Property was added successfully"
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
      />
    );

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
                    name="city"
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
                    type="number"
                    label="Price"
                    radius="sm"
                    className="pricetag"
                    name="pricetag"
                    onChange={setFormData}
                    classNames={{
                      input: "border-none focus:ring-0",
                    }}
                  />
                </div>
                <Textarea
                  label="Description"
                  name="description"
                  isRequired
                  type="faded"
                  labelPlacement="outside"
                  placeholder="Enter the description of your property"
                  className={`max-w-xl px-11 mb-5 description`}
                  data-focus="false"
                  classNames={{
                    input: "border-none focus:ring-0",
                  }}
                  onChange={setFormData}
                />
                <div className="addimage px-11 flex flex-col gap-3 max-w-xl">
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
                <Button color="primary" onPress={handleSubmit}>
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
