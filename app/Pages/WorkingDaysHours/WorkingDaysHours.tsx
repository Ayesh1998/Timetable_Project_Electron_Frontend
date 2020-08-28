/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {RadioButton, RadioGroup} from 'react-radio-buttons';
import CheckboxGroup from 'react-checkbox-group';
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './working-days-hours.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {setWorkingDaysHours} from './workingDaysHoursSlice';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const weekends = ['Saturday', 'Sunday'];

// noinspection DuplicatedCode
const WorkingDaysHours: React.FC = () => {
  const dispatch = useDispatch();
  // const value = useSelector();

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
  const [workingDaysAndHoursObject, setWorkingDaysAndHoursObject] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/workingDaysHours/getWorkingDaysAndHours`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const responseData = await response.json();
        setWorkingDaysAndHoursObject(responseData.workingDaysAndHours[0]);
        dispatch(setWorkingDaysHours(responseData.workingDaysAndHours[0]));
        console.log(responseData.workingDaysAndHours);

        if (!responseData) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error(responseData.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    // noinspection JSIgnoredPromiseFromCall
    fetchData();
  }, []);

  const renderRedirectToView = () => {
    if (workingDaysAndHoursObject) {
      return <Redirect to={routes.WORKING_DAYS_AND_HOURS_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const handleWeekdayWeekend = (value: string) => {
    if (value === 'weekday') {
      setWeekType('weekday');
      setDaysSelected(weekdays);
      setDays(weekdays);
      setNoOfWorkingDaysDropDown(7);
    }
    if (value === 'weekend') {
      setWeekType('weekend');
      setDays(weekends);
      setNoOfWorkingDaysDropDown(2);
      setDaysSelected(weekends);
    }
  };

  const handleSubmit = async () => {
    const workingDaysFinal: { day: any }[] = [];
    const finalTimeSlots: { type: any }[] = [];
    daysSelected.map((day: any) => {
      const tempObj = {day};
      workingDaysFinal.push(tempObj);
      return workingDaysFinal;
    });

    timeSlots.map((type: any) => {
      const tempObj = {type};
      finalTimeSlots.push(tempObj);
      return finalTimeSlots;
    });

    const finalObject = {
      numberOfWorkingDays: noOfWorkingDays,
      workingDays: workingDaysFinal,
      workingTimePerDay,
      weekType,
      timeSlots: finalTimeSlots
    };
    // eslint-disable-next-line radix
    if (parseInt(noOfWorkingDays) !== daysSelected.length) {
      setError('!! No of days in the week and days selected are not equal !!');
      return;
    }
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/workingDaysHours/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObject)
        }
      );

      const responseData = await response.json();
      setRenderRedirectTo(true);
      // console.log(responseData.userDetails);

      if (!responseData) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.WORKING_DAYS_AND_HOURS_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const handleChangeNoOfWorkingDays = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNoOfWorkingDays(e.target.value);
  };

  const handleChangeHour = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkingTimePerDay({...workingTimePerDay, hours: e.target.value});
  };

  const handleChangeMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkingTimePerDay({...workingTimePerDay, minutes: e.target.value});
  };

  return (
    <div
      style={{
        backgroundColor: '#37474F',
        height: '100vh'
      }}
    >
      {renderRedirectToView()}
      {renderRedirect()}
      <NavBar/>
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>Working Days and Hours</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5 ${styles.workingDaysHoursTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >
        <Row className="mt-3 mb-4 justify-content-md-center">
          <Col xs={12} md={4} className="mt-auto">
            <p>Select</p>
          </Col>
          <Col xs={3} md={4}>
            <RadioGroup onChange={handleWeekdayWeekend} horizontal>
              <RadioButton iconInnerSize={10} iconSize={20} value="weekday">
                Weekday
              </RadioButton>
              <RadioButton iconInnerSize={10} iconSize={20} value="weekend">
                Weekend
              </RadioButton>
            </RadioGroup>
          </Col>
          <Col xs={3} md={2}/>
        </Row>
        {days && (
          <div>
            <Row className="mt-3 mb-3 justify-content-md-center">
              <Col xs={12} md={4} className="mt-auto">
                <p>No of Working Days</p>
              </Col>
              <Col xs={3} md={3}>
                <Form className="">
                  <Form.Group controlId="formBasicEmail">
                    {noOfWorkingDaysDropDown === 7 ? (
                      <Form.Control
                        as="select"
                        defaultValue="Choose..."
                        style={{borderWidth: '2.5px'}}
                        value={noOfWorkingDays}
                        onChange={handleChangeNoOfWorkingDays}
                      >
                        <option>Select</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    ) : (
                      <Form.Control
                        as="select"
                        defaultValue="Choose..."
                        style={{borderWidth: '2.5px'}}
                        value={noOfWorkingDays}
                        onChange={handleChangeNoOfWorkingDays}
                      >
                        <option>Select</option>
                        <option>1</option>
                        <option>2</option>
                      </Form.Control>
                    )}
                  </Form.Group>
                </Form>
              </Col>
              <Col xs={3} md={3}/>
            </Row>
            <Row className="mt-3 mb-3 justify-content-md-center">
              <Col xs={12} md={4}>
                <p>Working Days</p>
              </Col>
              <Col xs={2} md={6}>
                <CheckboxGroup
                  name="setDaysSelected"
                  value={daysSelected}
                  onChange={setDaysSelected}
                >
                  {(Checkbox) => (
                    <>
                      {days?.map((day, index) => (
                        <label className="mr-sm-2 mr-md-3" key={index}>
                          <Checkbox value={day}/> {day}
                        </label>
                      ))}
                    </>
                  )}
                </CheckboxGroup>
              </Col>
            </Row>
            <Row className="mt-3 mb-3 justify-content-md-center">
              <Col xs={12} md={4}>
                <p>Working Time per Day</p>
              </Col>
              <Col xs={12} md={5}>
                <Row>
                  <Col xs={12} md={5}>
                    <Form.Group controlId="formGridEmail">
                      <Form.Label>Hours</Form.Label>
                      <Form.Control
                        style={{
                          width: '60px',
                          display: 'inline',
                          marginLeft: '10px'
                        }}
                        type="number"
                        value={workingTimePerDay.hours}
                        onChange={handleChangeHour}
                        placeholder="Hours"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={5}>
                    <Form.Group controlId="formGridPassword">
                      <Form.Label>Minutes</Form.Label>
                      <Form.Control
                        style={{
                          width: '60px',
                          display: 'inline',
                          marginLeft: '10px'
                        }}
                        type="number"
                        value={workingTimePerDay.minutes}
                        onChange={handleChangeMinutes}
                        placeholder="Minutes"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col xs={3} md={1}/>
            </Row>
            <Row className="mt-3 mb-3 justify-content-md-center">
              <Col xs={12} md={4}>
                <p>Time Slots</p>
              </Col>
              <Col xs={3} md={6}>
                <CheckboxGroup
                  name="setDaysSelected"
                  value={timeSlots}
                  onChange={setTimeSlots}
                >
                  {(Checkbox) => (
                    <>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className="mr-sm-3 mr-md-4">
                        <Checkbox value="One Hour"/>
                        One Hour
                      </label>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className="mr-sm-3 mr-md-4">
                        <Checkbox value="Thirty Minutes"/>
                        Thirty Minutes
                      </label>
                    </>
                  )}
                </CheckboxGroup>
              </Col>
            </Row>
            {error && (
              <Row className=" justify-content-md-center">
                <Col xs={12} md={10}>
                  <p className={`text-danger ${styles.workingDaysHoursError}`}>
                    {error}
                  </p>
                </Col>
              </Row>
            )}
            <Row className="mb-2 justify-content-md-center">
              <Col xs={0} md={9}/>
              <Col xs={12} md={2}>
                <Button
                  style={{width: '160px', fontSize: '1.3em'}}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};

export default WorkingDaysHours;
