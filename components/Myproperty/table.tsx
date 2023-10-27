import React from 'react';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../backend/lib/helper';
import { toggleChangeAction, updateAction, deleteAction } from '../../backend/redux/reducer';
import { AppState } from './rootstate'; // Import AppState from your store file

export interface User {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  password: string;
  date: string;
  activeListings: string;
}

export default function Table() {
  const { isLoading, isError, data, error } = useQuery<User[]>('users', getUsers);

  if (isLoading) return <div>Broker is loading...</div>;
  if (isError) return <div>Error: {error?.message || 'An error occurred'}</div>;

  return (
    <table className="table-auto w-screen">
      <thead>
        <tr className="bg-gray-800 text-center">
          <th className="px-16 py-2">
            <span className="text-gray-200">Avatar</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Password</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Birthday</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Active Listings</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200 text-center">
        {data?.map((obj, i) => (
          <Tr {...obj} key={obj._id} />
        ))}
      </tbody>
    </table>
  );
}

interface TrProps extends User {}

function Tr({ _id, name, avatar, email, password, date, activeListings }: TrProps) {
  const visible = useSelector((state: AppState) => state.app.client.toggleForm);
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  const onDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id));
    }
  };

  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex justify-center items-center">
        <img src={avatar || '#'} alt={`${name}'s avatar`} className="h-20 w-20 rounded-full object-cover" />
      </td>
      <td className="px-16 py-2">
        <span>{name || 'Unknown'}</span>
      </td>
      <td className="px-16 py-2">
        <span>{email || 'Unknown'}</span>
      </td>
      <td className="px-16 py-2">
        {/* You might want to remove the password from being displayed */}
        <span>{password || 'Unknown'}</span>
      </td>
      <td className="px-16 py-2">
        <span>{date || 'Unknown'}</span>
      </td>
      <td className="px-16 py-2">
        <span>{activeListings || 'Unknown'}</span>
      </td>
      <td className="px-16 py-2 flex justify-center items-center gap-5">
        <button className="cursor-pointer" onClick={onUpdate}>
          <BiEdit size={25} color={'rgb(34,197,94)'} />
        </button>
        <button className="cursor-pointer" onClick={onDelete}>
          <BiTrashAlt size={25} color={'rgb(244,63,94)'} />
        </button>
      </td>
    </tr>
  );
}
