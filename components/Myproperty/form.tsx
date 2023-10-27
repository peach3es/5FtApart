import React, { useReducer } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./rootstate"; // Import the type of your Redux state
import AddBrokerForm from "./AddProperty";
import UpdateBrokerForm from "./UpdateProperty";

interface FormState {
  [key: string]: string;
}

const formReducer = (state: FormState, event: React.ChangeEvent<HTMLInputElement>) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const Form: React.FC = () => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const formID = useSelector((state: RootState) => state.app.client.formID);

  return (
    <div className="mx-auto py-3">
      {formID ? (
        <UpdateBrokerForm formID={formID} formData={formData} setFormData={setFormData} />
      ) : (
        <AddBrokerForm formData={formData} setFormData={setFormData} />
      )}
    </div>
  );
};

export default Form;
