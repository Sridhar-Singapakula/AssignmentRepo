import { useState } from "react";
import { Link,useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import Joi from "joi";
import TextField from "../../components/Inputs/TextField";
import Checkbox from "../../components/Inputs/Checkbox";
import Button from "../../components/Button";
import GoogleIcon from "@mui/icons-material/Google";
import {login }from "../../redux/authSlice/apiCalls"
import styles from "./styles.module.scss";
import "./style.css"


const Login = () => {
  const [data, setData] = useState({ emailId: "", password: "" });
  const [errors, setErrors] = useState({});
  const { isFetching } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputState = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleErrorState = (name, value) => {
    value === "" ? delete errors[name] : setErrors({ ...errors, [name]: value });
  };

  const schema = {
    emailId: Joi.string().email({ tlds: false }).required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      
       const {success,decodeData}= await login(data,dispatch);
       if(success){
      if(decodeData.isAdmin){
         history.push("/admin/dashboard")
         toast.success("Successfull Admin login ");
      }
      else if(decodeData.isClient){
         history.push("/client/dashboard");
         toast.success("Successfull Client login ");
      }
      else{
        history.push("/signup");
        toast.error("You are not Authorized yet by the Admin");
      }

      
    }
    } else {
      console.log("Please fill out the form properly");
    }
  
}

  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
      <Link to="/" style={{ display: "flex" }}>
        <div>
        <a href="/" className="logo me-auto">
            <img src="https://logos-world.net/wp-content/uploads/2021/08/Booking-Logo.png" className="logo_img" alt="" />
          </a>
        </div>
        </Link>
      </div>
      <main className={styles.main}>
        <h1 className={styles.heading}>
          To continue, log in to Hotel Paradise.
        </h1>

        <button className={styles.outline_btn}>
          <GoogleIcon /> Continue with Google
        </button>

        <p className={styles.or_container}>or</p>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <div className={styles.input_container}>
            <TextField
              label="Enter your email"
              placeholder="Enter your email"
              name="emailId"
              handleInputState={handleInputState}
              schema={schema.emailId}
              handleErrorState={handleErrorState}
              value={data.emailId}
              error={errors.emailId}
              required={true}
            />
          </div>
          <div className={styles.input_container}>
            <TextField
              label="Password"
              placeholder="Password"
              name="password"
              handleInputState={handleInputState}
              schema={schema.password}
              handleErrorState={handleErrorState}
              value={data.password}
              error={errors.password}
              type="password"
              required={true}
            />
          </div>
          <p className={styles.forgot_password}>Forgot your password?</p>
          <div className={styles.form_bottom}>
            <Checkbox label="Remember me" />
            <Button
              type="submit"
              label="LOG IN"
              isFetching={isFetching}
              style={{
                color: "white",
                background: "#070D59",
                width: "20rem",
              }}
            />
          </div>
        </form>
        <h1 className={styles.dont_have_account}>Don't have an account?</h1>

        <Link to="/signup">
          <button className={styles.outline_btn}>
            Sign up for Hotel Paradise
          </button>
        </Link>
      </main>
    </div>
  );
};

export default Login;
