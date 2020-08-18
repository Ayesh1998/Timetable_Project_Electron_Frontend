import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { proxy } from '../../conf';
import { setRooms } from './rooms-slice';

const RoomsList: React.FC = () => {
  const dispatch = useDispatch();
  const [rooms, setRoomsList] = useState<any>([]);

  const getRooms = async () => {
    try {
      const response = await fetch(`${proxy}/rooms/rooms`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      setRoomsList(responseData);
      await dispatch(setRooms(responseData));
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    getRooms().then(() => {});
  }, []);

  return (
    <div>
      <div>Search Form</div>
      <div>Cards</div>
    </div>
  );
};

export default RoomsList;
