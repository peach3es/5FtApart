import React, { useState } from "react";
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
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { updateProperty, getProperty } from "@/backend/lib/helperProperties";
import { updateAction } from "@/backend/redux/reducer";
import { UploadButton } from "@/components/UploadPics/uploadthing";

export default function ModalUpdateProperty({
  isOpen,
  onClose,
  formID,
  formData,
  setFormData,
}: any) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const { isLoading, isError, data, error } = useQuery(
    ["properties", formID],
    () => getProperty(formID)
  );
  const UpdateMutation = useMutation(
    (newData) => updateProperty(formID, newData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("properties");
      },
      onError: () => {
        setIsErrorModalOpen(true);
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const {
    _id,
    propertytype,
    saletype,
    addimg,
    pricetag,
    address,
    postalcode,
    city,
    description,
  } = data;

  const cancelUpdateHandler = async () => {
    console.log("cancel");
    await dispatch(updateAction(null));
  };

  const handleSubmit = async () => {
    if (Object.keys(formData).length == 0) {
      console.log("Nothing has been changed");
      setIsErrorModalOpen(true);
    } else {
      console.log(formData);
      let updatedProperty = Object.assign({}, data, formData);
      console.log(updatedProperty);
      await UpdateMutation.mutate(updatedProperty);
      setIsSuccessModalOpen(true);
      onClose();
    }
  };

  return (
    <>
      <Modal size="4xl" isOpen={isOpen} onClose={onClose} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Property
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
                    defaultValue={address}
                  />
                  <Input
                    isRequired
                    type="faded"
                    radius="sm"
                    label="City"
                    name="city"
                    onChange={setFormData}
                    defaultValue={city}
                  />
                  <Input
                    isRequired
                    type="faded"
                    radius="sm"
                    label="Postal Code"
                    name="postalcode"
                    onChange={setFormData}
                    defaultValue={postalcode}
                    value={postalcode}
                  />
                  <Select
                    label="Property Type"
                    radius="sm"
                    isRequired
                    name="propertytype"
                    onChange={setFormData}
                    defaultSelectedKeys={[propertytype]}
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
                    defaultSelectedKeys={[saletype]}
                  >
                    {saletypes.map((saletype) => (
                      <SelectItem key={saletype.value} value={saletype.value}>
                        {saletype.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    isRequired
                    type="price"
                    label="Price"
                    radius="sm"
                    className="pricetag"
                    name="pricetag"
                    onChange={setFormData}
                    defaultValue={pricetag}
                  />
                </div>
                <Textarea
                  label="Description"
                  name="description"
                  isRequired
                  type="faded"
                  labelPlacement="outside"
                  placeholder="Enter the description of your property"
                  className={`max-w-xl px-10 mb-3 description ml-10`}
                  data-focus="false"
                  classNames={{
                    input: "border-none focus:ring-0",
                  }}
                  onChange={setFormData}
                  defaultValue={description}
                />
                <div className="addimage px-10 flex justify-start gap-3 max-w-xl ml-10">
                  {/* <label
                    htmlFor="formFile"
                    className=" inline-block text-neutral-700 dark:text-neutral-200 cursor-pointer"
                  ></label>
                  <input
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
                  {/* <input
                    type="file"
                    className="add-img"
                    name="addimg"
                    onChange={setFormData}
                  /> */}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    cancelUpdateHandler();
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button className="text-w2 bg-pr" onPress={handleSubmit}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Success
        message="Property was edited successfully."
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
      <Error
        message="Nothing has been changed."
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />
    </>
  );
}
