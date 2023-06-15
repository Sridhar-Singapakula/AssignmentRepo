import React from 'react'
import { useEffect,useState,Fragment} from 'react';
import { Link,useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";
import AOS from 'aos';
import logo from "../../img/images/logo.jpg"
import "./style.css"

const Terms = () => {

    const [blogs,setBlogs]=useState([]);
    const [selected, setSelected] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); 

    const handleMobileNavToggle = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };
    const sliderSettings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000, // Set the interval between slides (in milliseconds)
      };
    useEffect(() => {
        AOS.init();
        getBlogs();
      }, []);
      const openPop = (img,subject,blog) => {
        setSelected({ img: img,subject:subject,blog:blog });
        
      };
    
      const closePop = () => {
        setSelected(null);
      };
    


      const getBlogs = async () => {
		try {
			setIsFetching(true);
			const url = process.env.REACT_APP_API_URL + `/blog`;
			const { data } = await axios.get(url);
			console.log(data)
			setBlogs(data.data);
			console.log(blogs)
			setIsFetching(false);
		} catch (error) {
			console.log(error);
			setIsFetching(false);
		}
	};
  return (
    <div className='main'>
            <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center">
        
      <Link to="/" style={{ display: "flex" }}>
          <div>
          <a href="/" className="logo me-auto">
            <img src={logo} alt="" />
          </a>
          </div>
          
          <div style={{display:"block"}}>
          <div style={{fontSize:"30px", marginRight: "22px",fontWeight:"bolder",className:"font_style",letterSpacing:"2px"}}>
            <span style={{ color: "#DB4437" }}>D</span>
            <span style={{ color: "#4285F4" }}>H</span>
            <span style={{ color: "#0F9D58" }}>R</span>
            <span style={{ color: "" }}>U</span>
            <span style={{ color: "#F4B400" }}>V</span> 
          </div>
          <div style={{fontWeight:"750",fontSize: "20px",marginTop:"-7px" }}>Diagnostics</div>
          </div>
         
        </Link>

        <nav id="navbar" className={`navbar order-last order-lg-0 ${isMobileNavOpen ? 'mobile-nav-open' : ''}`}>
          <ul>
            <li><a className="nav-link scrollto active" href="/">Home</a></li>
            <li><a className="nav-link scrollto" href="#AboutUs">About Us</a></li>
            <li><a className="nav-link scrollto" href="#services">Services</a></li>
            <li><a className="nav-link scrollto" href="#counts">Wellness Packages</a></li>
            <li><a className="nav-link scrollto" href="#tabs">Accreditation</a></li>
            <li><a href="#faq">News&Events</a></li>
            <li className="dropdown">
              <a href="#portfolio">
                <span>Gallery</span>
                
              </a>
              
            </li>
            <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
            <Link to="/blogs"><li><a className="nav-link scrollto" href="/blogs">Blogs</a></li></Link>
           
          </ul>
          <i className="bi bi-list mobile-nav-toggle" onClick={handleMobileNavToggle}></i>
         
        </nav>
      </div>
    </header>
    <section style={{marginTop:"50px"}}>
        <h2 style={{textAlign:"center",fontWeight:"650",fontSize:"38px",marginBottom:"25px"}}>Terms&Conditions</h2>
        <div style={{textAlign:"Center"}}>
            <h2 >
                1. General Information:
            </h2>
            <ul style={{fontSize:"13px"}}>
                <li style={{listStyle:"none"}}>
                i) Our website provides general information about the services offered by Dhruv Diagnostics, including Pathology, Immunology, Eye Clinic, Dental Clinic, Radiology, Microbiology, and more.
                </li>
                <li style={{listStyle:"none"}}>
                ii) The content on our website is for general informational purposes only and should not be considered a substitute for professional medical advice or treatment. Always consult a qualified healthcare professional for accurate diagnosis and treatment.
                </li>
            </ul>
        </div>
        <div style={{textAlign:"Center"}}>
            <h2 >
                2. Intellectual Property::
            </h2>
            <ul style={{fontSize:"13px"}}>
                <li style={{listStyle:"none"}}>
                i) All intellectual property rights related to the content, logo, trademarks, and other materials on our website are owned by Dhruv Diagnostics and are protected by applicable laws.
                </li>
                <li style={{listStyle:"none"}}>
                ii) You must not reproduce, distribute, or use any copyrighted material from our website without obtaining explicit permission from us.
                </li>
            </ul>
        </div>
        <div style={{textAlign:"Center"}}>
            <h2 >
                3. User Responsibilities:
            </h2>
            <ul style={{fontSize:"13px"}}>
                <li style={{listStyle:"none"}}>
                i) By using our website, you agree to provide accurate and up-to-date personal information during registration or when prompted.
You must not engage in unauthorized activities on our website, including but not limited to unauthorized access, hacking, or data manipulation.

                </li>
                <li style={{listStyle:"none"}}>
                ii) It is your responsibility to maintain the security and confidentiality of your account credentials.
                </li>
            </ul>
        </div>
        <div style={{textAlign:"Center"}}>
            <h2 >
                4. Limitation of Liability:
            </h2>
            <ul style={{fontSize:"13px"}}>
                <li style={{listStyle:"none"}}>
                i) Dhruv Diagnostics shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use of our website or the services provided.

                </li>
                <li style={{listStyle:"none"}}>
                ii) We do not guarantee the accuracy, completeness, or timeliness of the information on our website.
                </li>
            </ul>
        </div>
    </section>
    <section style={{marginTop:"50px"}}>
        <h2 style={{textAlign:"center",fontWeight:"650",fontSize:"38px",marginBottom:"25px"}}>Privacy Policy</h2>
        <p style={{textAlign:"center",fontSize:"13px"}}>Protecting your privacy is important to us. Our privacy policy outlines how we collect, use, and protect your personal information. By using our website, you consent to the terms of our privacy policy.</p>
        <div style={{textAlign:"Center"}}>
            <h2 >
                1. Information Collection:
            </h2>
            <ul style={{fontSize:"13px"}}>
                <li style={{listStyle:"none"}}>
                i) We may collect personal information from you, such as name, contact details, and medical history, when you provide it to us voluntarily through online forms or other means.
                </li>
                <li style={{listStyle:"none"}}>
                    ii)We may also collect non-personal information, such as cookies and website usage data, to improve our website and services.
                </li>
            </ul>
        </div>
        <div style={{textAlign:"Center"}}>
            <h2 >
                2. Use of Information:
            </h2>
            <ul style={{fontSize:"13px"}}>
                <li style={{listStyle:"none"}}>
                i) We use the collected information to provide and improve our services, including appointment scheduling, sharing diagnostic test results, and communication with you.
We prioritize the confidentiality and security of your personal information and take appropriate measures to protect it.
                </li>
            </ul>
        </div>
        <div style={{textAlign:"Center"}}>
            <h2 >
                3. Information Sharing:
            </h2>
            <ul style={{fontSize:"13px"}}>
                <li style={{listStyle:"none"}}>
                i) We may share your personal information with authorized medical professionals involved in your diagnosis and treatment.
We may disclose personal information if required by law or to protect our rights and interests.

                </li>
              
            </ul>
        </div>
        <div style={{textAlign:"Center"}}>
            <h2 >
                4. Data Security:
            </h2>
            <ul style={{fontSize:"13px"}}>
                <li style={{listStyle:"none"}}>
                i) We implement security measures to protect your personal information from unauthorized access, disclosure, or alteration.
However, please note that no method of data transmission or storage over the internet is completely secure, and we cannot guarantee absolute security.
                </li>
            </ul>
        </div>
    </section>
    <section style={{marginTop:"50px"}}>
        <h2 style={{textAlign:"center",fontWeight:"650",fontSize:"38px",marginBottom:"25px"}}>Refund and Cancellation  Policy</h2>
        <p style={{textAlign:"center",fontSize:"13px"}}>At Dhruv Diagnostics, we strive to provide the best services. Our refund and cancellation policy outlines the procedures and conditions for refund requests and appointment cancellations.</p>
        <div style={{textAlign:"Center"}}>
            <h2 >
                1. Refund Eligibility:
            </h2>
            <ul style={{fontSize:"13px"}}>
                <li style={{listStyle:"none"}}>
                i) You may be eligible for a refund if a diagnostic test was not performed correctly or if there was an error in billing.
Refund eligibility is subject to assessment by our customer service department.
                </li>
            </ul>
        </div>
        <div style={{textAlign:"Center"}}>
            <h2 >
                2. Refund Process:
            </h2>
            <ul style={{fontSize:"13px"}}>
                <li style={{listStyle:"none"}}>
                i) To request a refund, please contact our customer service department and provide relevant details and supporting documentation.
We will review your request and process the refund if it meets the eligible criteria.
                </li>
            </ul>
        </div>
        <div style={{textAlign:"Center"}}>
            <h2 >
                3. Cancellation Policy:
            </h2>
            <ul style={{fontSize:"13px"}}>
                <li style={{listStyle:"none"}}>
                i) If you need to cancel an appointment, please notify us within the specified timeframe. Failure to do so may result in cancellation fees.

                </li>
                <li style={{listStyle:"none"}}>
                ii) It is your responsibility to maintain the security and confidentiality of your account credentials.
                </li>
            </ul>
        </div>
        <div style={{textAlign:"Center"}}>
            <h2 >
                4. Refund Disbursement:
            </h2>
            <ul style={{fontSize:"13px"}}>
                <li style={{listStyle:"none"}}>
                i) Refunds will be processed within a reasonable timeframe and in the same manner as the original payment method, unless otherwise agreed upon.

                </li>
            </ul>
        </div>
       
    </section>
  
    

    <div id="footer">

  <div className="footer-top">
    <div className="container">
      <div className="row">

        <div className="col-lg-3 col-md-6 footer-contact">
          <h3>Dhruv Diagnostics<span>.</span></h3>
          <p>
          3rd Floor, Aditya Enclave, 20A, Central Bazar Road, opposite Somalwar School, <br />
          Ramdaspeth, Nagpur<br />
          Maharashtra 440010<br /><br />
            <strong>Phone:</strong> +91 712-2461355<br />
            <strong>Email:</strong> dhruvlabslaxminagar@gmail.com<br />
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
            <li><i className="bx bx-chevron-right"></i> <a href="/">Pathology</a></li>
            <li><i className="bx bx-chevron-right"></i> <a href="/">Imunology</a></li>
            <li><i className="bx bx-chevron-right"></i> <a href="/">Microbiology</a></li>
            <li><i className="bx bx-chevron-right"></i> <a href="/">Molocular Diagnostics </a></li>
            <li><i className="bx bx-chevron-right"></i> <a href="/">Research Clinical Trials</a></li>
          </ul>
        </div>

        <div className="col-lg-4 col-md-6 footer-newsletter">
          <h4>Join Our Newsletter</h4>
          <p>Don't worry we don not spam your inbox.</p>
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
             &copy; Copyright <strong><span>Dhruv Diagnostics</span></strong>. All Rights Reserved
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

export default Terms