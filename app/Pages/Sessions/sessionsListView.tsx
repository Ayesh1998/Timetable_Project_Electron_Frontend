import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { session } from 'electron';
import NavBar from '../../components/NavBar/NavBar';
import styles from './sessions.css';
import { setSessions } from './sessionsSlice';
import {
  setRoomUnavailability,
  setUnavailableRoom,
} from '../RoomsUnavailability/rooms-unavailability-slice';
import {
  setEditingRoom,
  setEditingRoomId,
  setEditRoom,
  setExistingRoom,
} from '../Rooms/rooms-slice';
import {
  setEditBuilding,
  setEditingBuilding,
  setEditingBuildingId,
  setExistingBuilding,
  setExistingRoomsForBuilding,
} from '../Buildings/buildings-slice';
import { proxy } from '../../conf';

const Session = (props: any) => (
  <tr>
    <td>{props.session.sessionId}</td>
    <td>{props.session.lecturers[0].lecturerRef}</td>
    <td>{props.session.subjectCodeRef}</td>
    <td>{props.session.subjectRef}</td>
    <td>{props.session.tagRef}</td>
    <td>{props.session.groupRef}</td>
    <td>{props.session.subGroupRef}</td>
    <td>{props.session.studentCount}</td>
    <td>{props.session.duration}</td>
    <td>{props.session.parallelId}</td>
    <td>{props.session.consecutiveId}</td>
    {/*    <td> */}
    {/*      <Link to={`/editLecturer/${props.lecturer._id}`}>edit</Link> | */}
    {/* {' '} */}
    {/*      <p */}
    {/*        style={{ cursor: 'pointer', textDecoration: 'underline' }} */}
    {/*        onClick={() => { */}
    {/*          props.handleDelete(props.session._id); */}
    {/*        }} */}
    {/*      > */}
    {/*        delete */}
    {/*      </p> */}
    {/*    </td> */}
  </tr>
);

const SessionsListView: React.FC = () => {
  const dispatch = useDispatch();

  dispatch(setEditRoom(false));
  dispatch(setEditingRoomId(''));
  dispatch(setEditingRoom(null));
  dispatch(setExistingRoom(false));

  dispatch(setEditBuilding(false));
  dispatch(setEditingBuildingId(''));
  dispatch(setEditingBuilding(null));
  dispatch(setExistingBuilding(false));
  dispatch(setExistingRoomsForBuilding(false));

  dispatch(setRoomUnavailability(false));
  dispatch(setUnavailableRoom(null));

  const [sessionsObject, setSessionsObject] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sessionS, setsessionS] = useState<{
    lecturers: string;
    subjectRef: string;
    groupRef: string;
    subGroupRef: string;
  }>({
    lecturers: '',
    subjectRef: '',
    groupRef: '',
    subGroupRef: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${proxy}/sessions/getSessionList`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const responseData = await response.json();
        console.log(111111111);
        console.log(responseData);

        setSessionsObject(responseData);
        dispatch(setSessions(responseData));
        console.log(2222);
        console.log(responseData);

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

  const handleDelete = async (id: any) => {
    try {
      const response = await fetch(
        `${proxy}/lecturers/lecturers/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        }
      );

      const temp = sessionsObject.slice();
      const tempDeletedArray = temp.filter((item: any) => item._id !== id);
      setSessionsObject(tempDeletedArray);

      const responseData = await response.json();
      // console.log(responseData.userDetails);

      if (!responseData) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChangeSubjectSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true);
    setsessionS({ ...sessionS, subjectRef: e.target.value });
    setLoading(false);
  };

  const handleChangeGroupSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setsessionS({ ...sessionS, groupRef: e.target.value });
    setLoading(false);
  };

  const handleChangeSubGroupSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true);
    setsessionS({ ...sessionS, subGroupRef: e.target.value });
    setLoading(false);
  };

  const sessionList = () => {
    return sessionsObject.map((session) => {
      console.log(session);
      return (
        <Session
          session={session}
          handleDelete={handleDelete}
          key={session._id}
        />
      );
    });
  };

  return (
    <div style={{ backgroundColor: '#37474F' }}>
      <NavBar />

      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{ backgroundColor: '#343a40', color: '#fff' }}
        >
          <h3>Session Details</h3>
        </Col>
        <Col>
          <Button
            style={{
              width: '160px',
              fontSize: '1.3em',
              color: 'white',
              marginLeft: '63.5%',
              marginTop: '20px',
            }}
          >
            <Link
              to="/addSessions/"
              style={{
                width: '160px',
                fontSize: '1.0em',
                color: 'white',
              }}
            >
              Add Session
            </Link>
          </Button>
        </Col>
      </Row>
      <div>
        <Form>
          <Form.Row
            style={{
              marginTop: '-2%',
            }}
          >
            <Form.Group
              controlId="formLocatedBuilding"
              style={{
                marginLeft: '45%',
              }}
            >
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                as="select"
                value={sessionS.subjectRef}
                onChange={handleChangeSubjectSearch}
                title="Search by located building."
              >
                <option value="">Search by Subject</option>
                {session &&
                  session.map((session: any) => {
                    return (
                      <option key={session._id} value={session.subjectRef}>
                        {session.subjectRef}
                      </option>
                    );
                  })}
              </Form.Control>
            </Form.Group>
            <Form.Group
              controlId="formLocatedBuilding"
              style={{
                marginLeft: '3%',
              }}
            >
              <Form.Label>Group ID</Form.Label>
              <Form.Control
                as="select"
                value={sessionS.groupRef}
                onChange={handleChangeGroupSearch}
                title="Search by located building."
              >
                <option value="">Search by Group ID</option>
                {session &&
                  session.map((session: any) => {
                    return (
                      <option key={session._id} value={session.groupRef}>
                        {session.groupRef}
                      </option>
                    );
                  })}
              </Form.Control>
            </Form.Group>
            <Form.Group
              controlId="formLocatedBuilding"
              style={{
                marginLeft: '3%',
              }}
            >
              <Form.Label> Sub Group ID</Form.Label>
              <Form.Control
                as="select"
                value={sessionS.subGroupRef}
                onChange={handleChangeSubGroupSearch}
                title="Search by located building."
              >
                <option value="">Search by Group ID</option>
                {session &&
                  session.map((session: any) => {
                    return (
                      <option key={session._id} value={session.subGroupRef}>
                        {session.subGroupRef}
                      </option>
                    );
                  })}
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>

      {sessionsObject && (
        <Container
          className={`mt-2 p-4 ${styles.workingDaysHoursTopWrapper}`}
          style={{
            border: '3px solid white',
            borderRadius: '8px',
            color: 'white',
          }}
        >
          <Row className="mt-3 mb-4 justify-content-md-center">
            <Col xs={12} md={12} className="mt-auto">
              <Table
                striped
                bordered
                hover
                variant="dark"
                className={`${styles.workingDaysHoursViewTable}`}
              >
                <thead className="thead-light">
                  <tr>
                    <th>Session ID</th>
                    <th>Lecturers Name</th>
                    <th>Subject Code</th>
                    <th>Subject Name</th>
                    <th>Tag</th>
                    <th>Group </th>
                    <th>Sub Group</th>
                    <th>Student Count</th>
                    <th>Duration</th>
                    <th>Parallel</th>
                    <th>Consecutive</th>
                  </tr>
                </thead>
                <tbody>{sessionList()}</tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default SessionsListView;
