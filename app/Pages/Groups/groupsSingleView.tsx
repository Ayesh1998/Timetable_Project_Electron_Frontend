/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Table} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import NavBar from '../../components/NavBar/NavBar';
import styles from './groups.css';
import {setGroups} from './groupsSlice';

// noinspection DuplicatedCode
const GroupsSingleView: React.FC = () => {
  const dispatch = useDispatch();
  const [groupsObject, setGroupsObject] = useState<any>([]);

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
        setGroupsObject(responseData.groups[0]);
        dispatch(setGroups(responseData.groups[0]));
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


  return (
    <div style={{backgroundColor: '#37474F', height: '100vh'}}>
      <NavBar/>
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>{groupsObject.groupId} Group Details</h3>
        </Col>
      </Row>
      {groupsObject && (
        <Container
          className={`mt-2 p-4 ${styles.workingDaysHoursTopWrapper}`}
          style={{
            border: '3px solid white',
            borderRadius: '8px',
            color: 'white'
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
                <tbody>
                <tr>
                  <td>Academic Year and Semester</td>
                  <td>
                    {groupsObject.academicYearAndSemester}
                  </td>
                </tr>
                <tr>
                  <td>Programme</td>
                  <td>
                    {groupsObject.programme}
                  </td>
                </tr>
                <tr>
                  <td>Group Number</td>
                  <td>
                    {groupsObject.group}
                  </td>
                </tr>

                <tr>
                  <td>Sub Groups</td>
                  <td> 01 , 02
                  </td>
                </tr>
                </tbody>
              </Table>


            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default GroupsSingleView;
