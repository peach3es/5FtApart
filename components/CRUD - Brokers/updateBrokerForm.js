import { useReducer } from "react";
import Error from "./error";
import {BiBrush}  from 'react-icons/bi'
import {useQuery, useMutation, useQueryClient} from 'react-query'
import { getUser,getUsers, updateUser } from "../../backend/lib/helper";

function UpdateBrokerForm({formID, formData, setFormData}){

    const queryClient = useQueryClient();
    const {isLoading, isError, data, error} = useQuery(['users', formID],() => getUser(formID))

    const UpdateMutation = useMutation((newData) => updateUser(formID, newData),{
        onSuccess: async(data) =>{
            //queryClient.setQueryData('users', (old) => [data])
            queryClient.prefetchQuery('users', getUsers)

        }
    })
    
    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error {error}</div>

    const {name, avatar, password, date, activeListings, email} = data;
    const[firstname, lastname] = name? name.split(' ') : formData



    const handleSubmit = async (e) => {
        e.preventDefault();
        let userName = `${formData.firstname ?? firstname} ${formData.lastname ?? lastname}`
        let updated = Object.assign({}, data, formData, {name: userName})
        await UpdateMutation.mutate(updated)


    }


    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4 pl-3" onSubmit={handleSubmit}>
        <div className="input-type">
            <input type="text" onChange={setFormData} defaultValue = {firstname} name="firstname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="FirstName" />
        </div>
        <div className="input-type">
            <input type="text" onChange={setFormData} defaultValue = {lastname}  name="lastname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="LastName" />
        </div>
        <div className="input-type">
            <input type="text" onChange={setFormData} defaultValue = {email}  name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
        </div>
        <div className="input-type">
            <input type="text" onChange={setFormData} defaultValue = {password} name="password" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Password" />
        </div>
        <div className="input-type">
            <input type="date" onChange={setFormData} defaultValue = {date} name="date" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Date" />
        </div>
        <div className="input-type">
            <input type="number" onChange={setFormData} defaultValue = {activeListings} name="activeListings" className="border w-full  px-5 py-3 focus:outline-none rounded-md" placeholder="Active Listings" />
        </div>


        <button className="flex justify-center text-md w-full bg-yellow-400 text-white px-4 py-5 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500 text-xl">
         Update <span className="px-1"><BiBrush size={28}></BiBrush></span>
        </button>

        <div className="border input-type focus:outline-none rounded-md px-5 py-3 flex justify-between items-center">
            <label htmlFor="avatar">Avatar Picture:</label>
            <input type="file" onChange={setFormData} name="avatar"/>
        </div>


    </form>


    )
}

export default UpdateBrokerForm;