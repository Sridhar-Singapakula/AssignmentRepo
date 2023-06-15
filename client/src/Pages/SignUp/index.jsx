import { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import passwordComplexity from "joi-password-complexity";
import TextField from "../../components/Inputs/TextField";
import Checkbox from "../../components/Inputs/Checkbox";
import Button from "../../components/Button";
import styles from "./styles.module.scss";
import "./style.css"


const SignUp = () => {
	const [data, setData] = useState({
		emailId: "",
		password: "",
		name: "",
		mobileNo:"",
		pincode:"",
		state:"",
		city:"",
		address:"",
	});
	const [errors, setErrors] = useState({});
	const [isFetching, setIsFetching] = useState(false);

	const history = useHistory();

	const handleInputState = (name, value) => {
		setData((data) => ({ ...data, [name]: value }));
	};

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors(() => ({ ...errors, [name]: value }));
	};

	const schema = {
		emailId: Joi.string().email({ tlds: false }).required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		name: Joi.string().min(5).max(10).required().label("name"),
		mobileNo: Joi.string().required().label("Mobile Number"),
		pincode: Joi.string().required().label("Pincode"),
		state: Joi.string().required().label("State"),
		city: Joi.string().required().label("City"),
		address: Joi.string().required().label("Address"),
		
	};

	const handleSubmit = async (e) => {
		
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			
			try {
				setIsFetching(true);
				const url = process.env.REACT_APP_API_URL + "/clients";
				await axios.post(url, data);
				
				setIsFetching(false);
				toast.success("Account created successfully");
				history.push("/login");
			} catch (error) {
				setIsFetching(false);
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status < 500
				) {
					toast.error(error.response.data);
				} else {
					console.log(error.response);
					toast.error("Something went wrong!");
				}
			}
		} else {
			console.log("please fill out properly");
		}
	};

	return (
		<div className={styles.container}>
			<Link to="/" style={{ display: "flex"}}>
				<div>
				<a href="/" className="logo me-auto">
            <img src="https://logos-world.net/wp-content/uploads/2021/08/Booking-Logo.png" className="logo_img" alt="" />
          </a>
				</div>
        </Link>
			<h1 className={styles.heading}>Sign up </h1>
			<Button
				label="Sign up with Google Account"
				style={{ background: "#070D59", color: "white" }}
			/>
			<p className={styles.or_container}>or</p>
			<form onSubmit={handleSubmit} className={styles.form_container}>
				
				<div className={styles.input_container}>
					<TextField
						label="What's your emailId?"
						placeholder="Enter your emailId"
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
						label="Create a password"
						placeholder="Create a password"
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
				<div className={styles.input_container}>
					<TextField
						label="What should we call you?"
						placeholder="Enter a profile name"
						name="name"
						handleInputState={handleInputState}
						schema={schema.name}
						handleErrorState={handleErrorState}
						value={data.name}
						error={errors.name}
						required={true}
					/>
				</div>
				<div className={styles.input_container}>
					<TextField
						label="Mobile Number"
						placeholder="Enter your Mobile Number"
						name="mobileNo"
						handleInputState={handleInputState}
						schema={schema.mobileNo}
						handleErrorState={handleErrorState}
						value={data.mobileNo}
						error={errors.mobileNo}
						required={true}
					/>
				</div>
				<div className={styles.input_container}>
					<TextField
						label="pincode"
						placeholder="Enter your pincode"
						name="pincode"
						handleInputState={handleInputState}
						schema={schema.pincode}
						handleErrorState={handleErrorState}
						value={data.pincode}
						error={errors.pincode}
						required={true}
					/>
				</div>
				<div className={styles.date_of_birth_container}>
					<p>What's your Address</p>
					<div className={styles.date_of_birth}>
						<div className={styles.month}>

						    <TextField
								label="state"
								placeholder="state"
								name="state"
								value={data.state}
								schema={schema.state}
								error={errors.state}
								handleErrorState={handleErrorState}
								handleInputState={handleInputState}
								required={true}
							/>
						</div>
						<div className={styles.date}>
							<TextField
								label="city"
								placeholder="city"
								name="city"
								value={data.city}
								schema={schema.city}
								error={errors.city}
								handleErrorState={handleErrorState}
								handleInputState={handleInputState}
								required={true}
							/>
						</div>
						<div className={styles.year}>
							<TextField
								label="Address"
								placeholder="Address"
								name="address"
								value={data.address}
								schema={schema.address}
								error={errors.address}
								handleErrorState={handleErrorState}
								handleInputState={handleInputState}
								required={true}
							/>
						</div>
						
					</div>
				</div>
				
				<div className={styles.checkbox_container}>
					<Checkbox
						required={true}
						label="Share my registration data with Dhruv Diagnostics."
					/>
				</div>
				<p className={styles.terms_condition}>
					By clicking on sign-up, you agree to Dhruv Diagnostics{" "}
					<Link to="/terms"><a href="/#">Terms and Conditions of Use.</a></Link>
				</p>
				<p className={styles.terms_condition}>
					To learn more about how Dhruv collects, uses, shares and protects
					your personal data, please see{" "}
					<Link to="/terms"><a href="/#">Dhruv's Privacy Policy.</a></Link>
				</p>
				<div className={styles.submit_btn_wrapper}>
					<Button label="Sign Up" type="submit" isFetching={isFetching} />
				</div>
				<p className={styles.terms_condition} style={{ fontSize: "1.6rem" }}>
					Have an account? <Link to="/login"> Log in.</Link>
				</p>
			</form>
		</div>
	);
};

export default SignUp;
