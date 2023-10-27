import Success from "./success";
import Error from "./error";
import { BiPlus } from "react-icons/bi";
import { useQueryClient, useMutation } from "react-query";
import { addUser, getUsers } from "../../backend/lib/helper";
import { useDispatch } from "react-redux";
import { toggleChangeAction } from "../../backend/redux/reducer";
import React, { useEffect, useState, useCallback } from "react";

function AddBrokerForm({ formData, setFormData }) {
  const [error, setError] = useState(null);
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

  const handleSubmit = (e) => {
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
    let timeoutId;
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
  if (addMutation.isError)
    return <Error message={addMutation.error.message}></Error>;
  if (addMutation.isSuccess)
    return <Success message={"Added Successfully!"}></Success>;
  if (error) return <Error message={error}></Error>;

  return (
    <form
      className="grid lg:grid-cols-2 w-4/6 gap-4 pl-3"
      onSubmit={handleSubmit}
    >
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="firstname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="FirstName"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="lastname"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="LastName"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Email"
        />
      </div>
      <div className="input-type">
        <input
          type="password"
          onChange={setFormData}
          name="password"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Password"
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          onChange={setFormData}
          name="date"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Salary"
        />
      </div>

      <div className="input-type">
        <input
          type="number"
          onChange={setFormData}
          name="activeListings"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Active Listings"
        />
      </div>

      <button
        type="submit"
        className="flex justify-center text-md w-full bg-green-500 text-white px-4 py-5 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500 text-xl"
      >
        Add{" "}
        <span className="px-1">
          <BiPlus size={28}></BiPlus>
        </span>
      </button>

      <div className="border input-type focus:outline-none rounded-md px-5 py-3 flex justify-between items-center">
        <label htmlFor="avatar">Avatar Picture:</label>
        <input type="file" onChange={setFormData} name="avatar" />
      </div>
    </form>
  );
}

export default AddBrokerForm;
