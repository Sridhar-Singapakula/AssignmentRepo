import { Fragment, useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./redux/userSlice/apiCalls";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "./Pages/AdminDashboard"
import Main from "./Pages/Main";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import AdminHome from "./Pages/AdminOptions/Home";
import ClientDetails from "./Pages/AdminOptions/ClientsDetails";
import GuestBooking from "./Pages/AdminOptions/DataEntry/GuestBooking"
import AllRooms from "./Pages/AdminOptions/Rooms/All"
import AllBookedRooms from "./Pages/AdminOptions/Rooms/Booked"
import AllEmptyRooms from "./Pages/AdminOptions/Rooms/Empty";
import AllGuestBookings from "./Pages/AdminOptions/GuestBookings"
import AdminProfile from "./Pages/AdminOptions/EditProfile";




const App = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { user,loading } = useSelector((state) => state.auth);
	
	

	useEffect(() => {
		let token = null;
		const root = JSON.parse(window.localStorage.getItem("persist:root"));

		if (root) {
			const { auth } = root;
			const { user } = JSON.parse(auth);
			if (user) token = user.token;
		}
		if (user && token) {
			getUser(user._id, dispatch);
		}
	}, [dispatch, user]);
	if (loading) {
		// Render a loading state until user data is fetched
		return <div>Loading...</div>;
	  }

	return (
		<Fragment>
			{user && user.isAdmin &&
				location.pathname !== "/login" &&
				location.pathname !== "/" &&
				location.pathname !== "/signup" &&
				location.pathname !== "/Not-found" && (
					<Fragment>
						<AdminDashboard/>
					</Fragment>
				)}
			<Switch>
				<Route exact path="/" component={Main} />
				<PrivateRoute
					exact
					user={user}
					path="/admin/dashboard"
					component={AdminDashboard}
					isAdmin={user && user.isAdmin}
					/>
				
				
				<PrivateRoute exact user={user} isAdmin={user && user.isAdmin} path="/adminHome" component={AdminHome} />
				<PrivateRoute  user={user} isAdmin={user && user.isAdmin} path="/admin/AllClients" component={ClientDetails} />
				<PrivateRoute  user={user} isAdmin={user && user.isAdmin} path="/admin/AllRooms" component={AllRooms} />
				<PrivateRoute  user={user} isAdmin={user && user.isAdmin} path="/admin/AllBookedRooms" component={AllBookedRooms} />
				<PrivateRoute  user={user} isAdmin={user && user.isAdmin} path="/admin/AllEmptyRooms" component={AllEmptyRooms} />
				<PrivateRoute  user={user} isAdmin={user && user.isAdmin} path="/admin/AllGuestBookings" component={AllGuestBookings} />
				<PrivateRoute  user={user} isAdmin={user && user.isAdmin} path="/admin/Profile" component={AdminProfile} />
				<PrivateRoute  user={user} isAdmin={user && user.isAdmin} path="/admin/GuestBooking" component={GuestBooking} />
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={Login} />
				<Route path="/Not-found" component={NotFound} />
				<Redirect to="/Not-found" />
			</Switch>
		</Fragment>
	);
};

export default App;
