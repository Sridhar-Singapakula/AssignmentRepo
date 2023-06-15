import React, { useEffect, useState } from 'react';
import Table from '../../../components/Table';
import { useSelector } from 'react-redux';
import "./style.css";
import axiosInstance from "../../../redux/axiosInstance";
import EditClient from "../EditClient"

const GuestBookings = () => {
  const [clients, setClients] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const columns = ['name', 'contactInfo', 'identityProof', 'assignedRoom', 'checkInDate', 'checkOutDate', 'EditDetails'];
 const pageLimit = 8;

  useEffect(() => {
    getClients();
    // getTestName();
  }, []);

  const getClients = async () => {
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + `/guestBooking`;
      const { data } = await axiosInstance.get(url);
      setClients(data.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  const openUpload = (clientId) => {
    setSelectedClientId({ id: clientId});
    
  };

  const closeUpload = () => {
    setSelectedClientId(null);
  };

  const transformData = () => {
    return clients.map((client) => {
      return {
        name: client.name,
        contactInfo: client.contactInfo,
        identityProof: client.identityProof,
        assignedRoom: client.assignedRoom,
        checkInDate: client.checkInDate,
        checkOutDate: client.checkOutDate,
        EditDetails: (
          <button className="button-17" onClick={() => openUpload(client._id)}>
            Edit Details
          </button>
        )
      };
    });
  };
  
  
 
  
  
  
  

  return (
    <div className="container">
      <h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px" }}>
        Details of Guests
      </h1>
      <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
      {selectedClientId && <EditClient clientId={selectedClientId.id} onClose={closeUpload} />}
    </div>
  );
};

export default GuestBookings;
