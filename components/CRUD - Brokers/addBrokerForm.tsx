import Success from "./success";
import Error from "./error";
import { BiPlus } from "react-icons/bi";
import { useQueryClient, useMutation } from "react-query";
import { addUser, getUsers } from "../../backend/lib/helper";
import { useDispatch } from "react-redux";
import { toggleChangeAction } from "../../backend/redux/reducer";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState, useCallback } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function AddBrokerForm({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: any;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false); // New state
  const queryClient = useQueryClient();
  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.prefetchQuery("users", getUsers);
    },
  });

  const dispatch = useDispatch();

  const handler = useCallback(() => {
    dispatch(toggleChangeAction());
  }, [dispatch]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (Object.keys(formData).length == 0) {
      setError("Data Empty");
      setIsEmpty(true); // Set isEmpty to true when data is empty
      return;
    }

    setError(null);
    let { firstname, lastname, email, password, date, activeListings } =
      formData;

    const model = {
      name: `${firstname} ${lastname}`,
      avatar: `https://avataaars.io/?avatarStyle=Circle&topType=WinterHat4&accessoriesType=Sunglasses&hatColor=Gray02&facialHairType=MoustacheMagnum&facialHairColor=Red&clotheType=BlazerSweater&eyeType=Dizzy&eyebrowType=UpDown&mouthType=Grimace&skinColor=Black`,
      email,
      password,
      date,
      activeListings,
    };

    addMutation.mutate(model);
  };

  useEffect(() => {
    let timeoutId: any;
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

  if (addMutation.isLoading) return <div>Loading...</div>;
  if (addMutation.isError) {
    const errorMessage =
      addMutation.error &&
      typeof addMutation.error === "object" &&
      "message" in addMutation.error
        ? addMutation.error.message
        : "An unknown error occurred";

    return <Error message={errorMessage} />;
  }
  if (addMutation.isSuccess)
    return <Success message={"Added Successfully!"}></Success>;
  if (error) return <Error message={error}></Error>;

  return (
    <>
      <div className="fixed z-10 inset-0 bg-black opacity-50"></div>
      <div className="fixed z-20 inset-0 flex items-center justify-center">
        <div className="relative bg-white rounded-md shadow-lg max-w-lg w-full">
          <button
            className="absolute top-2 right-2  hover:bg-zinc-200 text-black rounded-full w-8 h-8 flex items-center justify-center"
            onClick={handler}
          >
            <AiFillCloseCircle size={30}></AiFillCloseCircle>
          </button>
          <div className="border-b p-4 text-xl font-semibold">Add Broker</div>
          <div className="p-4">
            <form
              className="grid lg:grid-cols-2 w-full gap-4 pl-3 "
              onSubmit={handleSubmit}
            >
              <div className="input-type">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  onChange={setFormData}
                  name="firstname"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md border-none bg-zinc-100"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="input-type">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  onChange={setFormData}
                  name="lastname"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md border-none bg-zinc-100"
                  placeholder="Last Name"
                />
              </div>
              <div className="input-type">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="text"
                  onChange={setFormData}
                  name="email"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md border-none bg-zinc-100"
                  placeholder="Email"
                />
              </div>
              <div className="input-type">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  onChange={setFormData}
                  name="password"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md border-none bg-zinc-100"
                  placeholder="Password"
                />
              </div>
              <div className="input-type">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Birthday
                </label>
                <input
                  type="date"
                  onChange={setFormData}
                  name="date"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md border-none bg-zinc-100"
                  placeholder="Salary"
                />
              </div>

              <div className="input-type">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Active Listings
                </label>
                <input
                  type="number"
                  onChange={setFormData}
                  name="activeListings"
                  className="border w-full px-5 py-3 focus:outline-none rounded-md border-none bg-zinc-100"
                  placeholder="Active Listings"
                />
              </div>

              <div className="input-type col-span-2">
                {/* <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                        <input type="file" onChange={setFormData} name="avatar" className="bg-zinc-100 w-full rounded-lg"/> */}
                <label
                  htmlFor="formFile"
                  className=" inline-block text-neutral-700 dark:text-neutral-200 cursor-pointer"
                ></label>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto rounded-lg border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary"
                  type="file"
                  id="formFile"
                  name="addimg"
                  onChange={setFormData}
                />
              </div>

              <div className="border col-span-2"></div>
              <Button
                className="text-white border rounded-md hover:bg-green-50 hover:border-green-500 hover:text-green-500 text-xl col-span-2"
                type="submit"
                variant="solid"
                color="success"
                size="lg"
              >
                Add<BiPlus size={24}></BiPlus>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddBrokerForm;
