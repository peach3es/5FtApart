import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useCallback,
} from "react";
import { BiPlus } from "react-icons/bi";
import { useQueryClient, useMutation, UseMutationResult } from "react-query";
import { useDispatch } from "react-redux";
import { toggleChangeAction } from "../../backend/redux/reducer";
import { addProperty, getProperties } from "../../backend/lib/helper";
import Success from "./success";
import Error from "./error";

interface FormData {
  //   firstname?: string;
  //   lastname?: string;
  //   email?: string;
  //   password?: string;
  //   date?: string;
  //   activeListings?: number;
  //   [key: string]: any; // This line is to accommodate other properties with different types
  address?: String;
  price?: Number;
  postalCode?: String;
  city?: String;
  saleType?: String;
  propertyType?: String;
}

interface AddBrokerFormProps {
  formData: FormData;
  setFormData: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AddBrokerForm: React.FC<AddBrokerFormProps> = ({
  formData,
  setFormData,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const addMutation: UseMutationResult<void, { message: string }> = useMutation(
    addProperty,
    {
      onSuccess: () => {
        queryClient.prefetchQuery("property", getProperties);
      },
    }
  );

  const handler = useCallback(() => {
    dispatch(toggleChangeAction());
  }, [dispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      setError("Data Empty");
      setIsEmpty(true);
      return;
    }

    setError(null);
    const { address, price, postalCode, city, saleType, propertyType } =
      formData;

    const model = {
      address,
      avatar: `https://avataaars.io/?avatarStyle=Circle&topType=WinterHat4&accessoriesType=Sunglasses&hatColor=Gray02&facialHairType=MoustacheMagnum&facialHairColor=Red&clotheType=BlazerSweater&eyeType=Dizzy&eyebrowType=UpDown&mouthType=Grimace&skinColor=Black`,
      price,
      postalCode,
      city,
      saleType,
      propertyType,
    };

    addMutation.mutate(model);
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (addMutation.isSuccess || isEmpty) {
      timeoutId = setTimeout(() => {
        handler();
      }, 2500);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [addMutation.isSuccess, isEmpty, handler]);

  if (addMutation.isLoading) return <div>Loading...</div>;
  if (addMutation.isError) return <Error message={addMutation.error.message} />;
  if (addMutation.isSuccess) return <Success message="Added Successfully!" />;
  if (error) return <Error message={error} />;

  return (
    <form
      className="grid lg:grid-cols-2 w-4/6 gap-4 pl-3"
      onSubmit={handleSubmit}
    >
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="address"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Address"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="price"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Price"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="postalCode"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Postal Code"
        />
      </div>
      <div className="input-type">
        <input
          type="password"
          onChange={setFormData}
          name="city"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="City"
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          onChange={setFormData}
          name="saleType"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Sale Type"
        />
      </div>

      <div className="input-type">
        <input
          type="number"
          onChange={setFormData}
          name="propertyType"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Property Type"
        />
      </div>

      <button
        type="submit"
        className="flex justify-center text-md w-full bg-green-500 text-white px-4 py-5 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500 text-xl"
      >
        Submit{" "}
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
};

export default AddBrokerForm;
