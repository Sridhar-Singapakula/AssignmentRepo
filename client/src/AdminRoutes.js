import {React} from'react'
import { Switch, Route, Redirect } from "react-router-dom"; 

import Home from "./Pages/AdminOptions/Home"
import ClientDetails from './Pages/AdminOptions/ClientsDetails';
import GuestBooking from "./Pages/AdminOptions/DataEntry/GuestBooking"
import AllRooms from "./Pages/AdminOptions/Rooms/All";
import AllBookedRooms from "./Pages/AdminOptions/Rooms/Booked";
import AllEmptyRooms from "./Pages/AdminOptions/Rooms/Empty"
import AllGuestBookings from "./Pages/AdminOptions/GuestBookings"
import AdminProfile from './Pages/AdminOptions/EditProfile';

const AdminRoutes = () => {
  return (
    <Switch>
        <Route exact path="/admin/home" component={Home} />
        <Route path="/admin/AllClients" component={ClientDetails}/>
        <Route path="/admin/AllRooms" component={AllRooms}/>
        <Route path="/admin/AllBookedRooms" component={AllBookedRooms}/>
        <Route path="/admin/AllEmptyRooms" component={AllEmptyRooms}/>
        <Route path="/admin/AllGuestBookings" component={AllGuestBookings}/>
        <Route path="/admin/Profile" component={AdminProfile}/>
        <Route path="/admin/GuestBooking" component={GuestBooking}/>
        <Route path="/">
              <Home />
         </Route>
    <Redirect to="/adminHome" />
    </Switch>
  )
}

export default AdminRoutes