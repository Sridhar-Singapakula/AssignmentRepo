import React, { useEffect, useState } from 'react';
import Table from '../../../../components/Table';
import { useSelector } from 'react-redux';
import "./style.css";
import axiosInstance from "../../../../redux/axiosInstance";
import EditRoom from "../EditRoom"

const BookedRooms = () => {
  const [Rooms, setRooms] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const columns = ['roomNumber', 'type', 'capacity', 'status',"EditDetails"];
  const pageLimit = 8;

  useEffect(() => {
    getRooms();
    // getTestName();
  }, []);

  const getRooms = async () => {
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + `/rooms`;
      const { data } = await axiosInstance.get(url);
      setRooms(data.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  const openUpload = (RoomId) => {
    setSelectedRoomId({ id: RoomId});
    
  };

  const closeUpload = () => {
    setSelectedRoomId(null);
  };

  const transformData = () => {
    return Rooms.filter((room) => room.status === 'empty').map((room) => {
      let statusStyle = {};
  
      if (room.status === 'empty') {
        statusStyle = { color: 'red' };
      } else if (room.status === 'booked') {
        statusStyle = { color: 'green' };
      }
  
      return {
        roomNumber: room.roomNumber,
        type: room.type,
        capacity: room.capacity,
        status: <span style={statusStyle}>{room.status}</span>,
        EditDetails: (
          <button className="button-17" onClick={() => openUpload(room._id)}>
            Edit Details
          </button>
        )
      };
    });
  };
  
  
 
  
  
  
  

  return (
    <div className="container">
      <h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px" }}>
        Details of All Rooms
      </h1>
      <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
      {selectedRoomId && <EditRoom RoomId={selectedRoomId.id} onClose={closeUpload} />}
    </div>
  );
};

export default BookedRooms;
