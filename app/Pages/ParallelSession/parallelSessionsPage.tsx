/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {RadioButton, RadioGroup} from 'react-radio-buttons';
import CheckboxGroup from 'react-checkbox-group';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import styles from './parallelSessions.css';
import {setNotAvailables} from './parallelSessionsSlice';
import {setRoomUnavailability, setUnavailableRoom} from '../RoomsUnavailability/rooms-unavailability-slice'
import {setEditingRoom, setEditingRoomId, setEditRoom, setExistingRoom} from '../Rooms/rooms-slice'
import {
  setEditBuilding,
  setEditingBuilding,
  setEditingBuildingId,
  setExistingBuilding,
  setExistingRoomsForBuilding
} from '../Buildings/buildings-slice';
import {proxy} from '../../conf';
import TwoSessionAdd from './twoSessionAdd.tsx';
import ThreeSessionAdd from './threeSessionAdd.tsx';

const categoryList = ['(A,B,C)', '(E,F)', '(H,J)'];
const weekends = ['Saturday', 'Sunday'];

const ParallelSessionsPage: React.FC = () => {
  const dispatch = useDispatch();

  dispatch(setEditRoom(false))
  dispatch(setEditingRoomId(''))
  dispatch(setEditingRoom(null))
  dispatch(setExistingRoom(false))

  dispatch(setEditBuilding(false))
  dispatch(setEditingBuildingId(''))
  dispatch(setEditingBuilding(null))
  dispatch(setExistingBuilding(false))
  dispatch(setExistingRoomsForBuilding(false))

  dispatch(setRoomUnavailability(false))
  dispatch(setUnavailableRoom(null))

  const [lecturer, setLecturer] =useState<boolean | null>(false);
  const [session, setSession] =useState<boolean | null>(false);
  const [two, setTwo] =useState<boolean | null>(false);
  const [three, setThree] =useState<boolean | null>(false);

  const [days, setDays] = useState<string[] | null>(null);
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(
    false
  );
  const [error, setError] = useState<string | null>(null);
  const [weekType, setWeekType] = useState<string | null>(null);
  const [noOfWorkingDays, setNoOfWorkingDays] = useState<any>(null);
  const [noOfWorkingDaysDropDown, setNoOfWorkingDaysDropDown] = useState<number | null>(null);
  const [daysSelected, setDaysSelected] = useState<any>([]);
  const [timeSlots, setTimeSlots] = useState<any>([
    'One Hour',
    'Thirty Minutes'
  ]);
  const [workingTimePerDay, setWorkingTimePerDay] = useState<{
    hours: string;
    minutes: string;
  }>({
    hours: '00',
    minutes: '00'
  });
  const [subject, setSubject] = useState<any>(null);
  const [id1, setId1] = useState<string>('');

  // useEffect(() => {   //----------1.meke distinct method  ekata cl karala  ena category tika ganna
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${proxy}subjects/subjects`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json'
  //           }
  //         }
  //       );

  //       const responseData = await response.json();
  //       setSubject(responseData);
  //       set

  //       console.log(responseData.workingDaysAndHours);

  //       if (!responseData) {
  //         // noinspection ExceptionCaughtLocallyJS
  //         throw new Error(responseData.message);
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  //   // noinspection JSIgnoredPromiseFromCall
  //   fetchData();
  // }, []);


  const handleCategory = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setId1(e.target.value);
    //-------------------2.category eka find ekakata yawala ena data walin category count eka alla ganna

    var count = 2;
    if(count === 2){
      setTwo(true);
      setThree(false);
    }
    if(count === 3){
      setTwo(false);
      setThree(true);
    }

  };

  // const handleSubmit = async () => {
  //   const workingDaysFinal: { day: any }[] = [];
  //   const finalTimeSlots: { type: any }[] = [];
  //   daysSelected.map((day: any) => {
  //     const tempObj = {day};
  //     workingDaysFinal.push(tempObj);
  //     return workingDaysFinal;
  //   });

  //   timeSlots.map((type: any) => {
  //     const tempObj = {type};
  //     finalTimeSlots.push(tempObj);
  //     return finalTimeSlots;
  //   });

  //   const finalObject = {
  //     numberOfWorkingDays: noOfWorkingDays,
  //     workingDays: workingDaysFinal,
  //     workingTimePerDay,
  //     weekType,
  //     timeSlots: finalTimeSlots
  //   };
  //   // eslint-disable-next-line radix
  //   if (parseInt(noOfWorkingDays) !== daysSelected.length) {
  //     setError('!! No of days in the week and days selected are not equal !!');
  //     return;
  //   }
  //   if (parseInt(workingTimePerDay.hours) > 24) {
  //     setError('!! No of hours should be equal or less than 24 !!');
  //     return;
  //   }
  //   if (workingTimePerDay.hours === '00') {
  //     setError('!! Please enter no of hours for working time per day !!');
  //     return;
  //   }
  //   if (parseInt(workingTimePerDay.minutes) > 60) {
  //     setError('!! No of minutes should be equal or less than 60 !!');
  //     return;
  //   }
  //   if (timeSlots.length === 0) {
  //     setError('!! Please select a time slot !!');
  //     return;
  //   }

  //   setError(null);

  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/workingDaysHours/create`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(finalObject)
  //       }
  //     );

  //     const responseData = await response.json();
  //     setRenderRedirectTo(true);
  //     // console.log(responseData.userDetails);

  //     if (!responseData) {
  //       // noinspection ExceptionCaughtLocallyJS
  //       throw new Error(responseData.message);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.WORKING_DAYS_AND_HOURS_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };



  return (
    <div
      style={{
        backgroundColor: '#37474F',
        height: '120vh'
      }}
    >

      {renderRedirect()}
      <NavBar/>
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>Add Parallel Session</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5  ${styles.parallelSessionsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >
        <Row className="mt-2 mb-3 justify-content-md-center">
        <Col xs={12} md={4} className="mt-auto">
              <p>Select a Category</p>
            </Col>
            <Col xs={3} md={4}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{borderWidth: '2.5px'}}
                    value={id1}
                    onChange={handleCategory}
                  >
                    <option>Select</option>
                    {categoryList?.map((category, index) => (
                      <option>{category}</option>
                    ))}
                  </Form.Control>

                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={2}/>
        </Row>



        {two && (
            <TwoSessionAdd/>
        )
        }

        {three && (
            <ThreeSessionAdd/>
        )
        }

      </Container>
    </div>
  );
};

export default ParallelSessionsPage;