import { useState} from "react";
import { NavLink,useHistory, Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { ClickAwayListener } from "@mui/material";
import "./style.css"
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import styles from "./styles.module.scss";


const Sidebar = ({ handleComponentClick }) => {
	
	const { user } = useSelector((state) => state.auth);


	const [dataEntryMenu, setDataEntryMenu] = useState(false);
	const [directPatient, setDirectPatient] = useState(false);
	const [patientReportsMenu,setPatientReportsMenu]= useState(false)
	const [price,setPrice]=useState(false)
	
	return (
		<div className={styles.container}>
			<Link to="/" style={{ display: "flex" }}>
        <div>
        <a href="/" className="logo me-auto">
            <img src="https://logos-world.net/wp-content/uploads/2021/08/Booking-Logo.png" className="logo_img" alt="" />
          </a>
        </div>
        </Link>
			<NavLink
				to="/search"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<SearchIcon />
				<span>Search</span>
			</NavLink>
			<Link to="/adminHome" ><div
				
				
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				
				
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-speedometer2" className={styles.icons}  style={{color: "#8f5fe8"}}></i></span>
				<span>Home</span>
			</div>
			</Link>
			<div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={()=>{setDataEntryMenu(!dataEntryMenu)}}
				
			> 
				<span className={styles.side}></span>				
				<span className={styles.menu_icon}><i class="bi bi-database-add" className={styles.icons} style={{color: "#ffab00"}}></i></span>
				<span>Room Management</span>
				<span style={{ marginLeft: '80px' }} className={styles.toggle}>
				{dataEntryMenu ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
				</span>
				
			</div>
			{dataEntryMenu && (
				<ClickAwayListener onClickAway={() => setDataEntryMenu(false)}>
					<div className={styles.menu} onClick={() => setDataEntryMenu(false)}>
						<Link to="/admin/AllRooms">
							<div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "green",fontSize:"17px"}}></i></span>
							<p>All Rooms</p>
							</div>
						</Link>
						
						<Link to="/admin/AllBookedRooms"><div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "pink",fontSize:"17px"}}></i></span>
							<p>Booked Rooms</p>
							</div>
						</Link>
						
						<Link to="/admin/AllEmptyRooms">
						<div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "yellow",fontSize:"17px"}}></i></span>
							<p>Empty Rooms</p>
							</div>
						</Link>
						
						</div>

					
							
						
					
				</ClickAwayListener>
			)}

			<div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={()=>{(setPatientReportsMenu(!patientReportsMenu))}}
				
			> 
				<span className={styles.side}></span>				
				<span className={styles.menu_icon}><i class="bi bi-basket" className={styles.icons} style={{color: "green"}}></i></span>
				<span>Clients Details</span>
				<span style={{ marginLeft: '80px' }} className={styles.toggle}>
				{patientReportsMenu ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
				</span>
				
			</div>
			{patientReportsMenu && (
				<ClickAwayListener onClickAway={() => patientReportsMenu(false)}>
					<div className={styles.menu} onClick={() => setPatientReportsMenu(false)}>
						<Link to="/admin/AllClients">
							<div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "green",fontSize:"17px"}}></i></span>
							<p>Clients Info</p>
							</div>
						</Link>
						
						<Link to="/admin/AllClients/ClientsTransactions"><div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "pink",fontSize:"17px"}}></i></span>
							<p>Clients Transactions</p>
							</div>
						</Link>
						
						</div>

					
							
						
					
				</ClickAwayListener>
			)}


<div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={()=>{setPrice(!price)}}
				
			> 
				<span className={styles.side}></span>				
				<span className={styles.menu_icon}><i class="bi bi-person-check" className={styles.icons} style={{color: "pink"}}></i></span>
				<span>My Account</span>
				<span style={{ marginLeft: '80px' }} className={styles.toggle}>
				{price ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
				</span>
				
			</div>
			{price && (
				<ClickAwayListener onClickAway={() => setPrice(false)}>
					<div className={styles.menu} onClick={() => setPrice(false)}>
						<Link to="/admin/Profile">
							<div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "green",fontSize:"17px"}}></i></span>
							<p>Edit Profile</p>
							</div>
						</Link>
						
						<Link to="/admin/MyAccount/PriceList"><div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "yellow",fontSize:"17px"}}></i></span>
							<p>PriceList</p>
							</div>
						</Link>
						
						<Link>
						<div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "pink",fontSize:"17px"}}></i></span>
							<p>Agreement List</p>
							</div>
						</Link>
					</div>
				</ClickAwayListener>
			)}
			
			<Link to="/admin/AllGuestBookings" ><div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-speedometer2" className={styles.icons}  style={{color: "#8f5fe8"}}></i></span>
				<span>All DirectBookings</span>
			</div>
			</Link>
            
			<Link to="/admin/AllGuestBookings" ><div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "yellow"}}></i></span>
				<span>All GuestBookings</span>
			</div>
			</Link>
			<Link to="/admin/blog" ><div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-speedometer2" className={styles.icons}  style={{color: "blue"}}></i></span>
				<span>Upload Blog</span>
			</div>
			</Link>
			<div
				className={styles.create_playlist_btn}
				
			>
				<AddIcon />
				<Link to="/admin/GuestBooking">
				<span>Guest Booking</span></Link>
			</div>
			<div className={styles.underline}></div>
		</div>
	);
};

export default Sidebar;
