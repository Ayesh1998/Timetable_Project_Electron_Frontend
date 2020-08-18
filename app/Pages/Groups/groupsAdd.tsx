/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {RadioButton, RadioGroup} from 'react-radio-buttons';
//import CheckboxGroup from 'react-checkbox-group';
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './groups.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {setGroups} from './groupsSlice';

const yearSemList = ['Y1S1', 'Y1S2', 'Y2S1', 'Y2S2', 'Y3S1'];
const programList = ['SE', 'CS'];
const groupNumList = [1, 2];
const subGroupNumList = [1, 2];

// noinspection DuplicatedCode
const GroupsAdd: React.FC = () => {
  const dispatch = useDispatch();
  // const value = useSelector();


  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>( false );
  const [error, setError] = useState<string | null>(null);

  const [academicYear, setAcademicYear] = useState<number | null>(null);
  const [academicSemester, setAcademicSemester] = useState<number | null>(null);
  const [academicYearAndSemester, setAcademicYearAndSemester] = useState<string>('');
  const [programme, setProgramme] = useState<string>('');
  const [group, setGroup] = useState<number | null>(null);
  const [groupId, setGroupId] = useState<string>('');
  const [availableSubGroup, setAvailableSubGroup] = useState<boolean | null>( false );
  const [subGroups, setSubGroups] = useState<any>([]);

  const [subGrouup, setSubGrouup] = useState<{subGroup: Number , subGroupId : string}>({});

  const [groupsObject, setGroupsObject] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/groups/getGroups`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const responseData = await response.json();
        setGroupsObject(responseData.groups);
        dispatch(setGroups(responseData.groups));
        console.log(responseData.groups);

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
    if (groupsObject) {
      return <Redirect to={routes.WORKING_DAYS_AND_HOURS_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const setOther = () => {
    setAcademicYear(3);
    setAcademicSemester(2);
    setGroupId("Y3.S2.SE.1");


  }

  const handleSubmit = async () => {
    console.log("1111111111111111111111111111");
    console.log(academicYearAndSemester);
    console.log(programme);
    console.log(group);
    console.log(subGrouup);
    console.log(subGroups.subGroup);

    if(subGrouup){
      var statusSubGroup = true;
    }

    const finalObject = {
      academicYear,
      academicSemester,
      academicYearAndSemester,
      programme,
      group,
      groupId,
      subGroups : subGrouup,
      availableSubGroup : statusSubGroup
    };

    console.log('22222222222222222222222222222222222');
    console.log(finalObject);

    try {
      const response = await fetch(
        `http://localhost:5000/groups/create`,
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

  const handleChangeAcademicYearAndSemester = ( e: React.ChangeEvent<HTMLInputElement>) => {
    setAcademicYearAndSemester(e.target.value);
  };

  const handleChangeProgramme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgramme(e.target.value);
  };

  const handleChangeGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroup(parseInt(e.target.value));
  };

  const handleChangeSubGroups = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setSubGrouup({ subGroup:val ,subGroupId: 'Y3.S2.SE.1.1'});
    setOther();
  };

  return (
    <div
      style={{
        backgroundColor: '#37474F',
        height: '100vh',
        overflow: 'scroll'
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
          <h3>Add Student Group</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5 ${styles.groupsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >


          <div>
            <Row className="mt-3 mb-3 justify-content-md-center">
              <Col xs={12} md={4} className="mt-auto">
                <p>Academic Year and Semester</p>
              </Col>
              <Col xs={3} md={3}>
                <Form className="">
                  <Form.Group controlId="formBasicEmail">

                      <Form.Control
                        as="select"
                        defaultValue="Choose..."
                        style={{borderWidth: '2.5px'}}
                        value={academicYearAndSemester}
                        onChange={handleChangeAcademicYearAndSemester}
                      >
                        <option>Select</option>
                        {yearSemList?.map((yearSem, index) => (
                          <option>{yearSem}</option>
                        ))}
                      </Form.Control>

                  </Form.Group>
                </Form>
              </Col>
              <Col xs={3} md={3}/>
            </Row>
            <Row className="mt-3 mb-3 justify-content-md-center">
              <Col xs={12} md={4}>
                <p>Programme</p>
              </Col>
              <Col xs={2} md={6}>
              <Form className="">
                  <Form.Group controlId="formBasicEmail">

                      <Form.Control
                        as="select"
                        defaultValue="Choose..."
                        style={{borderWidth: '2.5px'}}
                        value={programme}
                        onChange={handleChangeProgramme}
                      >
                        <option>Select</option>
                        {programList?.map((program, index) => (
                          <option>{program}</option>
                        ))}
                      </Form.Control>

                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row className="mt-3 mb-3 justify-content-md-center">
              <Col xs={12} md={4}>
                <p>Group Number</p>
              </Col>
              <Col xs={12} md={5}>

                  </Col>
                  <Col xs={12} md={5}>
                  <Form className="">
                  <Form.Group controlId="formBasicEmail">

                      <Form.Control
                        as="select"
                        defaultValue="Choose..."
                        style={{borderWidth: '2.5px'}}
                        value={group}
                        onChange={handleChangeGroup}
                      >
                        <option>Select</option>
                        {groupNumList?.map((group, index) => (
                          <option>{group}</option>
                        ))}
                      </Form.Control>

                  </Form.Group>
                </Form>
              </Col>
              <Col xs={3} md={1}/>
            </Row>
            <Row className="mt-3 mb-3 justify-content-md-center">
              <Col xs={12} md={4}>
                <p>Sub Group Number</p>
              </Col>
              <Col xs={3} md={6}>
              <Form className="">
                  <Form.Group controlId="formBasicEmail">

                      <Form.Control
                        as="select"
                        defaultValue="Choose..."
                        style={{borderWidth: '2.5px'}}
                        value={subGrouup.subGroup}
                        onChange={handleChangeSubGroups}
                      >
                        <option>Select</option>
                        {subGroupNumList?.map((sub, index) => (
                          <option>{sub}</option>
                        ))}
                      </Form.Control>

                  </Form.Group>
                </Form>
              </Col>
            </Row>
            {/* {error && (
              <Row className=" justify-content-md-center">
                <Col xs={12} md={10}>
                  <p className={`text-danger ${styles.workingDaysHoursError}`}>
                    {error}
                  </p>
                </Col>
              </Row>
            )} */}
            <Row className="mb-2 justify-content-md-center">
              <Col xs={0} md={9}/>
              <Col xs={12} md={2}>
                <Button
                  style={{width: '160px', fontSize: '1.3em'}}
                  onClick={handleSubmit}
                >
                  Generate a Group
                </Button>
              </Col>
            </Row>
          </div>

      </Container>
    </div>
  );
};

export default GroupsAdd;
