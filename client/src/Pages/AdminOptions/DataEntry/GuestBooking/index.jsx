import {React,useEffect,useState} from 'react'
import styles from "./styles.module.scss"
import { useSelector,useDispatch} from 'react-redux';
import { Link,useHistory} from "react-router-dom";
import axios from "axios";
import axiosInstance from '../../../../redux/axiosInstance';
import Joi from "joi";
import TextField from "../../../../components/Inputs/TextField";
import Select from "../../../../components/Inputs/Select";
import Radio from "../../../../components/Inputs/Radio"
import Button from "../../../../components/Button";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from "react-toastify";

const DataEntry = () => {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState({ 
    name:"",
    contactInfo:"",
    identityProof:"",
    assignedRoom:"",
    checkInDate:"",
    checkOutDate:"",
});
  const [fetchedRooms,setFetchedRooms]=useState({})
  const history=useHistory();

  
	const [errors, setErrors] = useState({});
	const { isFetching } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
  const gender = ["Male", "Female"];
  useEffect(() => {
    // fetchOptions();
   
    
  },[]);
  // const fetchOptions = async () => {
  //   try {
  //     const url = process.env.REACT_APP_API_URL;
  //     const response = await axios.get(url + '/rooms');
  //     const responseData = response.data;
  
  //     if (response.status === 200) {
  //       const transformedRooms = responseData.data
  //         .filter((room) => room.status === 'empty')
  //         .map((room) => ({
  //           name: room.roomNumber,
  //           value: room._id,
  //         }));
  
  //       setFetchedRooms(transformedRooms);
  //     } else {
  //       console.error('Failed to fetch rooms');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  



  console.log(data)
  const handleInputState = (name, value) => {
    if (name === 'checkOutDate') {
      setData({ ...data, [name]: value });
    }
    else {
      setData({ ...data, [name]: value});
      
    }
    
  };
  
  

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors({ ...errors, [name]: value });
	};

	const schema = {
    name: Joi.string().required(),
    contactInfo: Joi.string().required(),
    identityProof: Joi.string().required(),
    assignedRoom: Joi.string().required(),
    checkInDate: Joi.date().required(),
    checkOutDate: Joi.date(),
  };

      const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        if (Object.keys(errors).length === 0) {
          await axiosInstance.post(process.env.REACT_APP_API_URL+"/guestBooking",data)
          history.push("/adminHome")
          toast.success("Booked Room Successfully")
        } else {
          console.log("please fill out properly");
        }
      };
  
  return (
    <div className={styles.MainContainer}>
      <div >
        <h1>Guest Booking </h1>
        
      </div>
      <div className={styles.btn_body}>
      <button disabled className={styles.btn} >Hotel Paradise</button>
      
      <button disabled className={styles.btn}>Mumbai,India</button>
      </div>
      <form onSubmit={handleSubmit} className={styles.form_container}>
  <div className={styles.input_container}>
    <TextField
      label="Guest's Name *"
      placeholder="Enter Guest Name"
      name="name"
      handleInputState={handleInputState}
      value={data.name}
      required={true}
      style={{ width: "230px", fontSize: "14px", padding: "4px", height: "40px" }}
    />
  </div>
  <div className={styles.input_container}>
    <TextField
      label="Contact Info *"
      placeholder="Enter Contact Info"
      name="contactInfo"
      handleInputState={handleInputState}
      value={data.contactInfo}
      required={true}
      style={{ width: "230px", fontSize: "14px", padding: "4px", height: "40px" }}
    />
  </div>
  <div className={styles.input_container}>
    <TextField
      label="Identity Proof *"
      placeholder="Enter Identity Proof"
      name="identityProof"
      handleInputState={handleInputState}
      value={data.identityProof}
      required={true}
      style={{ width: "230px", fontSize: "14px", padding: "4px", height: "40px" }}
    />
  </div>
  <div className={styles.input_container}>
    <TextField
      label="Assigned Room *"
      placeholder="Enter Assigned Room"
      name="assignedRoom"
      handleInputState={handleInputState}
      value={data.assignedRoom}
      required={true}
      style={{ width: "230px", fontSize: "14px", padding: "4px", height: "40px" }}
    />
  </div>
  <div className={styles.input_container}>
  <label>Check-Out Date *</label>
  <DatePicker
    selected={data.checkInDate}
    onChange={(date) => handleInputState('checkInDate', date)}
    name="checkInDate"
    placeholderText="Enter Check-In Date"
    required
    dateFormat="MM/dd/yyyy" // Customize the date format if needed
    className={styles.datepicker} // Apply your custom styles
    
  />
  </div>
  <div className={styles.input_container}>
  <label>Check-Out Date *</label>
  <DatePicker
    selected={data.checkOutDate}
    onChange={(date) => handleInputState('checkOutDate', date)}
    name="checkOutDate"
    placeholderText="Enter Check-Out Date"
    required
    dateFormat="MM/dd/yyyy" 
    className={styles.datepicker}
   
    
  />
  </div>
  <div className={styles.form_bottom}>
    <Button
      type="submit"
      label="Book Test"
      isFetching={isFetching}
      style={{ color: "white", background: "#070D59", width: "20rem" }}
    />
  </div>
</form>

    </div>
  )
}

export default DataEntry