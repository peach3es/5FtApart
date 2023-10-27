import React, { useReducer, FormEvent, ChangeEvent } from "react";
import Error from "./error";
import { BiBrush } from 'react-icons/bi'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getUser, getUsers, updateUser } from "../../backend/lib/helper";

interface UpdateBrokerFormProps {
  formID: string;
  formData: any;
  setFormData: React.Dispatch<any>;
}

interface UserData {
  name?: string;
  avatar?: string;
  password?: string;
  date?: string;
  activeListings?: number;
  email?: string;
}

const UpdateBrokerForm: React.FC<UpdateBrokerFormProps> = ({ formID, formData, setFormData }) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery<UserData, Error>(['users', formID], () => getUser(formID));

  const UpdateMutation = useMutation((newData: UserData) => updateUser(formID, newData), {
    onSuccess: async (data) => {
      queryClient.prefetchQuery('users', getUsers);
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error {error?.message}</div>;

  const { name, avatar, password, date, activeListings, email } = data || {};
  const [firstname, lastname] = name ? name.split(' ') : [formData.firstname, formData.lastname];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let userName = `${formData.firstname ?? firstname} ${formData.lastname ?? lastname}`;
    let updated = { ...data, ...formData, name: userName };
    UpdateMutation.mutate(updated);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4 pl-3" onSubmit={handleSubmit}>
      {/* ... other inputs ... */}
      <button className="flex justify-center text-md w-full bg-yellow-400 text-white px-4 py-5 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500 text-xl">
        Update <span className="px-1"><BiBrush size={28} /></span>
      </button>
      {/* ... other inputs ... */}
    </form>
  );
}

export default UpdateBrokerForm;
