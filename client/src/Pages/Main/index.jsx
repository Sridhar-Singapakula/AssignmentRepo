import { Link,useHistory} from "react-router-dom";
import React from 'react';
import AOS from 'aos';
import Joi from "joi";
import { useEffect,useState } from 'react';
import {useDispatch} from "react-redux";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import TextField from "../../components/Inputs/TextField";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'glightbox/dist/css/glightbox.min.css';
import 'remixicon/fonts/remixicon.css';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import './style.css';


const Main = () => {
  const [data, setData] = useState({
		name: "",
		mobileNumber: "",
		emailId: "",
		subject: "",
		message: "",
	});
	const [errors, setErrors] = useState({});
	const [isFetching, setIsFetching] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleInputState = (name, value) => {
		setData((data) => ({ ...data, [name]: value }));
	};
    const schema = {
        name: Joi.string().allow(""),
        mobileNumber: Joi.string().allow(""),
        emailId: Joi.string().allow(""),
        subject: Joi.string().allow(""),
        message: Joi.string().allow("")}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = { data};
		// const res = await Query(payload, dispatch);
		// res && history.push("/");
	};

    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); 

    const handleMobileNavToggle = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };
    const handleNavLinkClick = () => {
      setIsMobileNavOpen(false);
    };
    const sliderSettings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000, // Set the interval between slides (in milliseconds)
      };
      useEffect(() => {
        AOS.init();
        
      }, []);

  return (
    <div className="main">
      <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" style={{ display: "flex" }}>
          <div>
          <a href="/" className="logo me-auto">
            <img src="https://logos-world.net/wp-content/uploads/2021/08/Booking-Logo.png" alt="" />
          </a>
          </div>
         
        </Link>

        <nav id="navbar" className={`navbar order-last order-lg-0 ${isMobileNavOpen ? 'mobile-nav-open' : ''}`}>
          <ul>
          <ul>
            <li onClick={handleNavLinkClick}><a className="nav-link scrollto active" href="/">Home</a></li>
            <li onClick={handleNavLinkClick}><a className="nav-link scrollto" href="#AboutUs">About Us</a></li>
            <li onClick={handleNavLinkClick}><a className="nav-link scrollto" href="#services">Services</a></li>
            <li onClick={handleNavLinkClick}><a className="nav-link scrollto" href="#tabs">Availability</a></li>
            
            <li onClick={handleNavLinkClick} >
              <a href="#portfolio">
                <span>Gallery</span>
                
              </a>
              
            </li>
            
            <li onClick={handleNavLinkClick}><a className="nav-link scrollto" href="#contact">Contact</a></li>
          </ul>
          </ul>
          <i className="bi bi-list mobile-nav-toggle" onClick={handleMobileNavToggle} ></i>
        </nav>
      </div>
    </header>
   



    <section id="hero" className="d-flex align-items-center">
      <div className="container" data-aos="zoom-out" data-aos-delay="100">
        <div className="row">
          <div className="col-xl-7">
            <h1>Welcome:<br/><span style={{color:"lightblue"}}>"Hotel Paradise" <span style={{color:"gray"}}> Mumbai</span></span></h1>
            <h2>"Discover the perfect blend of comfort, elegance, and exceptional service for your dream getaway."</h2>
            <Link to="/login" className="btn-get-started">Get started</Link>
            <Link to="/Patient" className="btn-buy">Book Room</Link>
          </div>
        </div>
      </div>
    </section>

  <div id="main">
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>Contact</h2>
          <p>Have a Question? Contact Us</p>
        </div>

        <div className="row" data-aos="fade-up" data-aos-delay="100">

          <div className="col-lg-6">

            <div className="row">
              <div className="col-md-12">
                <div className="info-box">
                <i class="bi bi-geo-alt"></i>
                  <h3>Our Address</h3>
                  <p> IIT Bombay, Maharashtra 4093010</p>
                  <p> IIT Powai, Maharashtra 488920</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-box mt-4">
                <i class="bi bi-envelope-at"></i>
                  <h3>Email Us</h3>
                  <p>info@gmail.com<br/>info2@gmail.com</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-box mt-4">
                <i class="bi bi-telephone-forward"></i>
                  <h3>Call Us</h3>
                  <p>+91 5768790909090<br/>+91 46576788990</p>
                </div>
              </div>
            </div>

          </div>

          <div className="col-lg-6">
            <form onSubmit={handleSubmit} className="php-email-form">
              <div className="row">
                <div className="col form-group">
                      <TextField
						            label="Name"
                        name="name"
						            placeholder="Enter your Name"
                        handleInputState={handleInputState}
                        schema={schema.name}
						            value={data.name}
                        error={errors.name}
                        type="name"
						            style={{ width: '150px', fontSize: '12px', padding: '4px', height: '40px', }}
					            />
                </div>
                <div className="col form-group">
                      <TextField
						            label="Mobile Number"
						            placeholder="Enter your Mobile Number"
                        name="mobileNumber"
						            handleInputState={handleInputState}
                        schema={schema.mobileNumber}
						            value={data.mobileNumber}
                        error={errors.mobileNumber}
                        type="mobileNumber"
						            style={{ width: '150px', fontSize: '12px', padding: '4px', height: '40px' }}
					            />
                </div>
                <div className="col form-group">
                      <TextField
						            label="Email Id"
						            placeholder="Enter your Email Id"
                        name="emailId"
						            handleInputState={handleInputState}
                        schema={schema.emailId}
						            value={data.emailId}
                        error={errors.emailId}
                        type="emailId"
						            style={{ width: '150px', fontSize: '12px', padding: '4px', height: '40px' }}
					            />
                </div>
              </div>
              <div className="form-group">
                      <TextField
						            label="Subject"
						            placeholder="Subject"
                        name="subject"
						            handleInputState={handleInputState}
                        schema={schema.subject}
						            value={data.subject}
                        error={errors.subject}
                        type="subject"
						            style={{ width: '500px', fontSize: '12px', padding: '4px', height: '40px' }}
					            />
              </div>
              <div className="form-group">
              <TextField
						            label="Message?"
						            placeholder="message"
                        name="message"
						            handleInputState={handleInputState}
                        schema={schema.message}
						            value={data.message}
                        error={errors.message}
                        type="message"
						            style={{ width: '500px', fontSize: '12px', padding: '4px', height: '40px' }}
					            />
              </div>
              <div className="text-center"><button type="submit">Send Message</button></div>
            </form>
          </div>

        </div>

      </div>
    </section>

  </div>
  <div id="footer">

  <div className="footer-top">
    <div className="container">
      <div className="row">

        <div className="col-lg-3 col-md-6 footer-contact">
          <h3>Hotel Paradise<span>.</span></h3>
          <p>
          Main Building Oppo, IIT Powai, Mumbai<br />
          Maharashtra 4087790<br /><br />
            <strong>Phone:</strong> +91 7676778990<br />
            <strong>Email:</strong> info@gmail.com<br />
          </p>
        </div>

        <div className="col-lg-2 col-md-6 footer-links">
          <h4>Useful Links</h4>
          <ul>
            <Link to="/terms"><li><i className="bx bx-chevron-right"></i><a>Refund and Cancellation</a></li></Link>
            <li><i className="bx bx-chevron-right"></i> <a href="/">Home</a></li>
            <li><i className="bx bx-chevron-right"></i> <a href="#Aboutus">About us</a></li>
            <li><i className="bx bx-chevron-right"></i> <a href="#services">Services</a></li>
            <Link to="/terms"><li><i className="bx bx-chevron-right"></i> <a href="/">Terms and Conditions&</a></li></Link>
            <Link to="/terms"><li><i className="bx bx-chevron-right"></i> <a href="/">Privacy policy</a></li></Link>
          </ul>
        </div>

        <div className="col-lg-3 col-md-6 footer-links">
          <h4>Our Services</h4>
          <ul>
            <li><i className="bx bx-chevron-right"></i> <a href="/">Mumbai</a></li>
            <li><i className="bx bx-chevron-right"></i> <a href="/">Delhi</a></li>
            <li><i className="bx bx-chevron-right"></i> <a href="/">Banglore</a></li>
            <li><i className="bx bx-chevron-right"></i> <a href="/">Hyderabad </a></li>
            <li><i className="bx bx-chevron-right"></i> <a href="/">Chennai</a></li>
          </ul>
        </div>

        <div className="col-lg-4 col-md-6 footer-newsletter">
          <h4>Join Our Newsletter</h4>
          <p>Don't worry we donot spam your inbox.</p>
          <form action="" method="post">
            <input type="email" name="email" /><input type="submit" value="Subscribe" />
          </form>
        </div>

      </div>
    </div>
  </div>


    <div className="container d-md-flex py-4">
        <div className="me-md-auto text-center text-md-start">
            <div className="copyright">
             &copy; Copyright <strong><span>Hotel Paradise</span></strong>. All Rights Reserved
            </div>
        </div>
        <div className="social-links text-center text-md-end pt-3 pt-md-0">
            <a href="/" className="twitter"><i class="bi bi-twitter"></i></a>
            <a href="/" className="facebook"><i class="bi bi-facebook"></i></a>
            <a href="/" className="instagram"><i class="bi bi-instagram"></i></a>
            <a href="/" className="google-plus"><i class="bi bi-skype"></i></a>
            <a href="/" className="linkedin"><i class="bi bi-linkedin"></i></a>
        </div>
    </div>
</div>

  <a href="/" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
</div>
  )
}

export default Main
