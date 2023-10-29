import { useReducer } from "react";
import Success from "./success";
import {BiBrush}  from 'react-icons/bi'
import {useQuery, useMutation, useQueryClient} from 'react-query'
import { getUser,getUsers, updateUser } from "../../backend/lib/helper";
import {AiFillCloseCircle} from "react-icons/ai"
import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { toggleChangeAction } from "../../backend/redux/reducer";
import React, {useCallback, useEffect } from "react";

function UpdateBrokerForm({formID, formData, setFormData}: {formID: any, formData: any, setFormData: any}){
    const dispatch = useDispatch();

    const closeHandler = useCallback(() => {
        dispatch(toggleChangeAction());
      }, [dispatch]);

    const queryClient = useQueryClient();
    const {isLoading, isError, data, error} = useQuery(['users', formID],() => getUser(formID))

    const UpdateMutation = useMutation((newData) => updateUser(formID, newData),{
        onSuccess: async(data) => {
            queryClient.invalidateQueries(['users', formID]); 
            queryClient.prefetchQuery('users', getUsers);
        }
        
    })
    useEffect(() => {
        let timeoutId: any;
        if (UpdateMutation.isSuccess) {
          timeoutId = setTimeout(() => {
            closeHandler();
          }, 2500);
        }
        // Cleanup the timeout when the component is unmounted
        return () => {
          clearTimeout(timeoutId);
        };
      }, [UpdateMutation.isSuccess, closeHandler]); // Add isEmpty as a dependency
    
    if(isLoading) return <div>Loading...</div>
    if (isError) {
        const errorMessage = (error as any).message || 'An unknown error occurred';
        return <div>Error {errorMessage}</div>;
    }
    

    const {name, avatar, password, date, activeListings, email} = data;
    const[firstname, lastname] = name? name.split(' ') : formData



    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let userName = `${formData.firstname ?? firstname} ${formData.lastname ?? lastname}`
        let updated = Object.assign({}, data, formData, {name: userName})
        await UpdateMutation.mutate(updated)
    }

    if (UpdateMutation.isSuccess)
    return <Success message={"Updated Successfully!"}></Success>;
      

    return (
        <>
        <div className="fixed z-10 inset-0 bg-black opacity-50"></div>
        <div className="fixed z-20 inset-0 flex items-center justify-center">
          <div className="relative bg-white rounded-md shadow-lg max-w-lg w-full">
          <button  className="absolute top-2 right-2  hover:bg-zinc-200 text-black rounded-full w-8 h-8 flex items-center justify-center" onClick={closeHandler} ><AiFillCloseCircle size={30}></AiFillCloseCircle></button>
            <div className="border-b p-4 text-xl font-semibold">Edit Broker</div>
            <div className="p-4">
                <form className="grid lg:grid-cols-2 w-full gap-4 pl-3" onSubmit={handleSubmit}>
                        <div className="input-type">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <input type="text" onChange={setFormData} defaultValue = {firstname} name="firstname" className="border w-full px-5 py-3 focus:outline-none rounded-md border-none bg-zinc-100" placeholder="First Name" />
                        </div>
                        <div className="input-type">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <input type="text" onChange={setFormData} defaultValue = {lastname}  name="lastname" className="border w-full px-5 py-3 focus:outline-none rounded-md border-none bg-zinc-100" placeholder="Last Name" />
                        </div>
                        <div className="input-type">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="text" onChange={setFormData} defaultValue = {email}  name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md border-none bg-zinc-100" placeholder="Email" />
                        </div>
                        <div className="input-type">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="text" onChange={setFormData} defaultValue = {password} name="password" className="border w-full px-5 py-3 focus:outline-none rounded-md border-none bg-zinc-100" placeholder="Password" />
                        </div>
                        <div className="input-type">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthday</label>
                            <input type="date" onChange={setFormData} defaultValue = {date} name="date" className="border w-full px-5 py-3 focus:outline-none rounded-md border-none bg-zinc-100" placeholder="Date" />
                        </div>
                        <div className="input-type">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Active Listings</label>
                            <input type="number" onChange={setFormData} defaultValue = {activeListings} name="activeListings" className="border w-full  px-5 py-3 focus:outline-none rounded-md border-none bg-zinc-100" placeholder="Active Listings" />
                        </div>

                        <div className="input-type col-span-2">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
                            <input type="file" onChange={setFormData} name="avatar" className="bg-zinc-100 w-full rounded-lg"/>
                        </div>

                        <div className="border col-span-2"></div>
                        <Button  className="text-white border rounded-md hover:bg-warning-50 hover:border-warning-500 hover:text-warning-500 text-xl col-span-2" type="submit" variant="solid"color="warning"size="lg">
                            Update<BiBrush size={24}></BiBrush>
                        </Button>
            </form>
            </div>
          </div>
        </div>
      </>

        
        


    )
}

export default UpdateBrokerForm;