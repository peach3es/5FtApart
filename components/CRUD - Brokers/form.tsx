import AddBrokerForm from "./addBrokerForm"
import UpdateBrokerForm from "./updateBrokerForm"
import { useSelector } from "react-redux";
import { useReducer } from "react";
import { RootState } from "../Myproperty/rootstate.js";

const formReducer = (state: any, event: any) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}

function Form(){

    const [formData, setFormData] = useReducer(formReducer, {})
    const formID = useSelector((state: RootState) => state.app.client.formID)

    return (
        <div className=" mx-auto py-3">
            {formID ? UpdateBrokerForm({formID, formData, setFormData}): AddBrokerForm({formData, setFormData})}
        </div>
    )
}

export default Form;