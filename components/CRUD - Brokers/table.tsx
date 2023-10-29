import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getUsers } from "../../backend/lib/helper";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
} from "../../backend/redux/reducer";
import Image from "next/image";
import { RootState } from "../Myproperty/rootstate";
import { BiUserPlus } from "react-icons/bi";
import { Button } from "@nextui-org/react";

export default function Table() {
  const { isLoading, isError, data, error } = useQuery("users", getUsers);
  const dispatch = useDispatch();
  const handler = () => {
    dispatch(toggleChangeAction());
  };

  if (isLoading) return <div>Broker is loading...</div>;
  if (isError) return <div>Error FDSAFDASDASSDAS</div>;

  return (
    <div className="property-cards rounded-lg bg-zinc-100 p-10 mx-8">
      <div className="grid lg:grid-cols-2">
      <h2 className="text-2xl font-bold ml-2 mb-2">My Brokers</h2>
      <div className="grid justify-items-end">
      <Button className="bg-black text-white mb-4 w-min" size="lg" onPress={handler}>
                Add Broker <span><BiUserPlus size={23}></BiUserPlus></span>
      </Button>
      </div>
      </div>
    <table className="table-auto w-full">
      <thead>
        <tr className="bg-gray-800 text-center">
          <th className="px-16 py-2 rounded-tl-lg">
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
          <th className="px-16 py-2 rounded-tr-lg">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200 text-center">
        {data.map((obj: any, i: any) => (
          <Tr {...obj} key={i} />
        ))}
      </tbody>
    </table>
    </div>
  );
}

function Tr({ _id, name, avatar, email, password, date, activeListings }: {_id: any, name: any, avatar: any, email: any, password: any, date: any, activeListings: any}) {
  const visible = useSelector((state: RootState) => state.app.client.toggleForm);
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
        <Image
          src={avatar || "#"}
          alt=""
          height={200}
          width={200}
          className="h-20 w-20 rounded-full object-cover"
        />
      </td>
      <td className="px-16 py-2">
        <span>{name || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{email || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{password || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{date || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span>{activeListings || "Unknown"}</span>
      </td>
      <td className=" px-16 py-2  gap-5">
        <button className="cursor-pointer pr-2" onClick={onUpdate}>
          <BiEdit size={25} color={"rgb(34,197,94)"} />
        </button>
        <button className="cursor-pointer">
          <BiTrashAlt size={25} color={"rgb(244,63,94)"} onClick={onDelete} />
        </button>
      </td>
    </tr>
  );
}
