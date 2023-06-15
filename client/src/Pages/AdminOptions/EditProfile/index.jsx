import {React,useState} from 'react'
import  "./style.css"
import { useSelector,useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import Joi from "joi";
import TextField from "../../../components/Inputs/TextField";

import { updateUser } from '../../../redux/userSlice/apiCalls';


const AdminProfile = () => {
	const [data, setData] = useState({
		name: "",
		mobileNumber: "",
		emailId: "",
		address: "",
		contactPersonName: "",
	});
	const [errors, setErrors] = useState({});
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleInputState = (name, value) => {
		setData((data) => ({ ...data, [name]: value }));
	};



    const schema = {
        name: Joi.string().allow(""),
        mobileNumber: Joi.string().allow(""),
        emailId: Joi.string().allow(""),
        address: Joi.string().allow(""),
       }

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = { data, id: user._id };
		const res = await updateUser(payload, dispatch);
		res && history.push("/clientHome");
	};

    return (
        <div className='Pro'>

<h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px",marginLeft:"20px" }}>
            Edit Your Details
          </h1>
        <div className="Profile_Cont">
                    
                    <TextField
						label=" Name?"
                        name="name"
						placeholder="Enter your Lab Name"
                        handleInputState={handleInputState}
                        schema={schema.name}
						value={data.name}
                        error={errors.name}
                        type="name"
						
						style={{ width: '200px', fontSize: '12px', padding: '4px', height: '40px', background:"transparent",border:"1px solid white",color:"orange"}}
					/>
                    <TextField
						label="Mobile Number?"
						placeholder="Enter your Mobile Number"
                        name="mobileNumber"
						handleInputState={handleInputState}
                        schema={schema.mobileNumber}
						value={data.mobileNumber}
                        error={errors.mobileNumber}
                        type="mobileNumber"
						style={{ width: '200px', fontSize: '12px', padding: '4px', height: '40px',background:"transparent",border:"1px solid white",color:"orange" }}
					/>
                    <TextField
						label="Email Id?"
						placeholder="Enter your emailId"
                        name="emailId"
						handleInputState={handleInputState}
                        schema={schema.emailId}
						value={data.emailId}
                        error={errors.emailId}
                        type="emailId"
						style={{ width: '200px', fontSize: '12px', padding: '4px', height: '40px',background:"transparent",border:"1px solid white",color:"orange" }}
					/>
                    <TextField
						label="Address?"
						placeholder="Enter your Lab Address"
                        name="address"
						handleInputState={handleInputState}
                        schema={schema.address}
						value={data.address}
                        error={errors.address}
                        type="address"
						style={{ width: '200px', fontSize: '12px', padding: '4px', height: '40px',background:"transparent",border:"1px solid white",color:"orange" }}
					/>
                   

        </div>
        <button className='button-17' onClick={handleSubmit} style={{marginLeft:"40px"}}>Update the details</button>
        </div>

    );
};

export default AdminProfile;