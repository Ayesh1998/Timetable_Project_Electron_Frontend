import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { proxy } from '../../conf';
import { setBuildings } from './buildings-slice';

const BuildingsList: React.FC = () => {
  const dispatch = useDispatch();
  const [buildings, setBuildingsList] = useState<any>([]);

  const getBuildings = async () => {
    try {
      const response = await fetch(`${proxy}/buildings/buildings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      setBuildingsList(responseData);
      await dispatch(setBuildings(responseData));
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    getBuildings().then(() => {});
  }, []);

  return (
    <div>
      <div>Search Form</div>
      <div>Cards</div>
    </div>
  );
};

export default BuildingsList;
