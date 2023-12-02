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
import { propertytypes, saletypes, statusTypes } from "@/components/Search/searchoptions";
import Success from "../success";
import Error from "../error";
import { useQueryClient, useMutation } from "react-query";
import { toggleChangeAction } from "../../../backend/redux/reducer";
import { useDispatch } from "react-redux";
import { addProperty, getProperties } from "@/backend/lib/helperProperties";
import "../../../styles/page.module.css";
import { UploadButton } from "@/components/UploadPics/uploadthing";

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    // [event.target.name]: event.target.value,
    ...(event && event.target && event.target.name
      ? { [event.target.name]: event.target.value }
      : {}),
  };
};

export default function ModalAddProperty({ isOpen, onClose }: any) {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [userId, setUserID] = useState("");
  const [isEmpty, setIsEmpty] = useState(false); // New state
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    const getProps = async () => {
      const response = await fetch("/api/auth/session");
      const users = await response.json();
      setUserID(users.user.id);
    };
    getProps();
  }, []);
  const queryClient = useQueryClient();
  const addMutation = useMutation(addProperty, {
    onSuccess: () => {
      queryClient.invalidateQueries("properties");
      setIsSuccessModalOpen(true);
      onClose();
    },
    onError: () => {
      setIsErrorModalOpen(true);
    },
  });

  const dispatch = useDispatch();

  const handler = useCallback(() => {
    dispatch(toggleChangeAction());
  }, [dispatch]);

  const handleSubmit = (e: any) => {
    // e.preventDefault();

    if (Object.keys(formData).length == 0) {
      console.log("Please fill out the form");
      setIsEmpty(true); // Set isEmpty to true when data is empty
      setIsErrorModalOpen(true);
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
        status
      } = formData;

      const model = {
        userId,
        addimg: "/pictures/myproperty/template.png",
        address,
        pricetag,
        description,
        postalcode,
        city,
        saletype,
        propertytype,
        status
      };
      addMutation.mutate(model); //addMutation.mutate({}) is the request
    }
  };

  const handleModalClose = () => {
    setFormData({}); // Reset form data
    setIsEmpty(false); // Reset empty state
    onClose(); // Close the modal
  };

  //request
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

  return (
    <>
      <Modal
        size="4xl"
        isOpen={isOpen}
        onClose={handleModalClose}
        isDismissable={false}
      >
        <ModalContent>
          {(handleModalClose) => (
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
                  <Select
                    isRequired
                    label="Status"
                    className="status-select col-span-3"
                    radius="sm"
                    name="status"
                    onChange={setFormData}
                  >
                    {statusTypes.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <Textarea
                  label="Description"
                  name="description"
                  isRequired
                  radius="sm"
                  type="faded"
                  labelPlacement="outside"
                  placeholder="Enter the description of your property"
                  className={`max-w-xl px-10 mb-3 description mx-10`}
                  data-focus="false"
                  classNames={{
                    input: "border-none focus:ring-0",
                  }}
                  onChange={setFormData}
                />
                <div className="addimage px-10 gap-3 mx-10 max-w-xl flex justify-start ">
                  {/* <label
                    htmlFor="formFile"
                    className=" inline-block text-neutral-700 dark:text-neutral-200 cursor-pointer"
                  ></label> */}
                  {/* <input
                    className="relative m-0 block w-full min-w-0 flex-auto rounded-lg border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary"
                    type="file"
                    id="formFile"
                    name="addimg"
                    onChange={setFormData}
                  /> */}
                  <UploadButton
                    endpoint="propertyPicture"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res);
                      alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                    className="relative ut-button:rounded-xl ut-button:bg-pr ut-button:hover:bg-prs ut-button:duration-300"
                  />
                  {/* <label htmlFor="addimg" className=""></label>
                  <input
                    type="file"
                    id="addimg"
                    className="add-img relative m-0 block w-full min-w-0 flex-auto rounded"
                    name="addimg"
                    onChange={setFormData}
                  /> */}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={handleModalClose}
                >
                  Close
                </Button>
                <Button className="bg-pr text-w2" onPress={handleSubmit}>
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
        onClose={() => setIsSuccessModalOpen(false)}
      />
      <Error
        message="Error"
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />
    </>
  );
}
