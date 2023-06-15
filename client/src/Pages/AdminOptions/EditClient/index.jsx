import React, {useState } from 'react';
import PropTypes from 'prop-types';
import "./style.css";
import { toast } from "react-toastify";
import { useSelector,useDispatch} from 'react-redux';
import Select from "../../../components/Inputs/Select";
import TextField from '../../../components/Inputs/TextField';
import axiosInstance from '../../../redux/axiosInstance';





const EditClient = ({ clientId,onClose}) => {
    const { user } = useSelector((state) => state.user);

  const [errors, setErrors] = useState({});
  const [isFetching, setIsFetching] = useState(false);
	const dispatch = useDispatch();
  

  const [data, setData] = useState({ 
    isAdmin:false
  });
  const yesOrNo=[
    {name:"Yes",value:true},
    {name:"No",value:false}
 ]
     
   


  const handleInputState = (name, value) => {
      if(name="isAdmin"){
        setData((prevState) => ({
          ...prevState,
          [name]: value[0],
        }));
      }
      else {setData((prevState) => ({
        ...prevState,
        [name]: value,
      }));}
    
  };
  

  const handleErrorState = (name, value) => {
    value === ""
        ? delete errors[name]
        : setErrors({ ...errors, [name]: value });
};
     


        console.log(data)
        const handleSubmit = async (e) => {
		
            e.preventDefault();
        
            if (Object.keys(errors).length === 0) {
                
              setIsFetching(true);
              const url = process.env.REACT_APP_API_URL + `/clients/${clientId}`;
              await axiosInstance.put(url, data);
              
              setIsFetching(false);
              toast.success("Updated Client successfully");
                onClose()
            } else {
                console.log("please fill out properly");
            }
        };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Update client: {clientId}</h2>
        <div className="select-container">
        <form onSubmit={handleSubmit} className="form_container">
                
                    <Select
								name="isAdmin"
                                handleInputState={(name, value) => handleInputState("isAdmin", value)}
								label="Is it Admin"
								placeholder="Admin (Yes Or No)"
								options={yesOrNo}
								value={data.isAdmin}
								required={true}
                style={{ width: '200px', fontSize: '12px', padding: '4px', height: '40px', background:"transparent",border:"1px solid white",color:"orange"}}
							    />

                      



                <div className="form_bottom">
						<button
							type="submit"
							label="Addon Test"
              className="button-17"
              style={{marginLeft:"-5px"}}
						
							>Update Client</button>
						
					</div>
				</form>
                <button onClick={onClose} className="button-17" style={{marginTop:"-20px",marginLeft:"280px",fontSize:"13px"}}>Close</button>
        </div>
      </div>
    </div>
  );
};

EditClient.propTypes = {
  clientId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditClient;
