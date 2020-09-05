/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
//import CheckboxGroup from 'react-checkbox-group';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './groups.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';


const yearSemList = ['Y1S1', 'Y1S2', 'Y2S1', 'Y2S2', 'Y3S1', 'Y3S2', 'Y4S1', 'Y4S2'];
const programList = ['SE', 'CS', 'DS', 'IT'];
const groupNumList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const subGroupNumList = [1, 2];

// noinspection DuplicatedCode
const GroupsEdit: React.FC = () => {
  const dispatch = useDispatch();
  // const value = useSelector();


  // let groupList = useSelector(
  //   (state: {
  //     groups: any
  //   }) => state.groups.groups
  // )

  // const editingGroupId = useSelector(
  //   (state: {
  //     groups: any
  //     editingGroupId: string
  //   }) => state.groups.editingGroupId
  // )

  // const editingGroup = useSelector(
  //   (state: {
  //     groups: any
  //     editingGroupId: any
  //   }) => state.groups.editingGroup
  // )

  // const [groupOne, setGroupOne] = useState<{
  //   academicYear: number,
  //   academicSemester: number,
  //   academicYearAndSemester: string,
  //   programme: string,
  //   group: number,
  //   groupId: string,
  //   subGroups: any
  //   availableSubGroup:boolean
  // }>({

  //   academicYear: editingGroup.academicYear,
  //   academicSemester: editingGroup.academicSemester,
  //   academicYearAndSemester: editingGroup.academicYearAndSemester,
  //   programme: editingGroup.programme,
  //   group: editingGroup.group,
  //   groupId: editingGroup.groupId,
  //   subGroups: editingGroup.subGroups,
  //   availableSubGroup:editingGroup.availableSubGroup
  // })


  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [renderRedirectTo1, setRenderRedirectTo1] = useState<boolean | null>(false);
  const [error, setError] = useState<string | null>(null);

  const [academicYear, setAcademicYear] = useState<number | null>(null);
  const [academicSemester, setAcademicSemester] = useState<number | null>(null);
  const [academicYearAndSemester, setAcademicYearAndSemester] = useState<string>('');
  const [programme, setProgramme] = useState<string>('');
  const [group, setGroup] = useState<number | null>(null);
  const [groupId, setGroupId] = useState<string>('');
  const [availableSubGroup, setAvailableSubGroup] = useState<boolean | null>(false);
  const [subGroups, setSubGroups] = useState<any>([]);

  const [subGrouup, setSubGrouup] = useState<{ subGroup: Number, subGroupId: string }>({});

  const [groupsObject, setGroupsObject] = useState<any>(null);
  const [id, setId] = useState<string>('');


  useEffect(() => {
    // setGroupOne(editingGroup);
    // setId(editingGroupId);
    // setAcademicYear(editingGroup.academicYear);
    // setAcademicSemester(editingGroup.academicSemester);
    // setAcademicYearAndSemester(editingGroup.academicYearAndSemester);
    // setProgramme(editingGroup.programme);
    // setGroup(editingGroup.group);
    // setGroupId(editingGroup.groupId);
    // setSubGrouup(editingGroup.subGroups);
    // setAvailableSubGroup(editingGroup.availableSubGroup);


    setId('5f3d5fb33d81ca3398789c36');
    setAcademicYear(4);
    setAcademicSemester(2);
    setAcademicYearAndSemester('Y4S2');
    setProgramme('IT');
    setGroup(4);
    setGroupId('Y4.S2.IT.4');
    setSubGrouup({
      subGroup: null,
      subGroupId: 'Y4.S2.IT.4.01'
    });

    setAvailableSubGroup(true);

  }, []);

  const renderRedirectToView = () => {
    if (groupsObject) {
      return <Redirect to={routes.GROUPS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const setOther = () => {
    const year = String(academicYear);
    const sem = String(academicSemester);
    const pro = String(programme);
    const groupforId = group.toString();

    const id = 'Y' + year + '.S' + sem + '.' + pro + '.' + groupforId;

    setGroupId(id);


  };

  const handleSubmit = async () => {

    if (subGrouup) {
      var statusSubGroup = true;
    }

    const finalObjectGroup = {
      academicYear,
      academicSemester,
      academicYearAndSemester,
      programme,
      group,
      groupId,
      subGroups: subGrouup,
      availableSubGroup: statusSubGroup
    };

    const finalObjectWithID = {
      groups: finalObjectGroup,
      // eslint-disable-next-line no-underscore-dangle
      id: id
    };
    console.log('22222222222222222222222222222222222');
    console.log(finalObjectGroup);

    try {
      const response = await fetch(
        `http://localhost:5000/groups/editGroups`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObjectWithID)
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


    const finalObjectSubGroup = {
      academicYear,
      academicSemester,
      academicYearAndSemester,
      programme,
      group,
      groupId,
      subGroup: subGrouup.subGroup,
      subGroupId: subGrouup.subGroupId
    };


    const finalObjectSubWithID = {
      subGroups: finalObjectSubGroup,
      // eslint-disable-next-line no-underscore-dangle
      id: id
    };
    try {
      const response = await fetch(
        `http://localhost:5000/subGroups/editSubGroups`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(finalObjectSubWithID)
        }
      );

      const responseData = await response.json();
      setRenderRedirectTo1(true);

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
    if (renderRedirectTo && renderRedirectTo1) {
      return <Redirect to={routes.GROUPS_LIST_VIEW_EDIT}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const handleChangeAcademicYearAndSemester = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAcademicYearAndSemester(e.target.value);

    if (val === 'Y1S1') {
      setAcademicYear(1);
      setAcademicSemester(1);
    } else if (val === 'Y1S2') {
      setAcademicYear(1);
      setAcademicSemester(2);
    } else if (val === 'Y2S1') {
      setAcademicYear(2);
      setAcademicSemester(1);
    } else if (val === 'Y2S2') {
      setAcademicYear(2);
      setAcademicSemester(2);
    } else if (val === 'Y3S1') {
      setAcademicYear(3);
      setAcademicSemester(1);
    } else if (val === 'Y3S2') {
      setAcademicYear(3);
      setAcademicSemester(2);
    } else if (val === 'Y4S1') {
      setAcademicYear(4);
      setAcademicSemester(1);
    } else {
      setAcademicYear(4);
      setAcademicSemester(2);
    }
  };

  const handleChangeProgramme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgramme(e.target.value);
  };

  const handleChangeGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroup(parseInt(e.target.value));
  };

  const handleChangeSubGroups = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    var year = String(academicYear);
    var sem = String(academicSemester);
    var pro = String(programme);
    var groupforId = group.toString();
    if (val === 1) {
      var id = 'Y' + year + '.S' + sem + '.' + pro + '.' + groupforId + '.01';
    } else {
      var id = 'Y' + year + '.S' + sem + '.' + pro + '.' + groupforId + '.02';
    }


    setSubGrouup({ subGroup: val, subGroupId: id });
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
          style={{ backgroundColor: '#343a40', color: '#fff' }}
        >
          <h3>Add New Sub Group</h3>
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
                    style={{ borderWidth: '2.5px' }}
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
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{ borderWidth: '2.5px' }}
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
            <Col xs={3} md={3}></Col>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Group Number</p>
            </Col>
            <Col xs={3} md={3}>


              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{ borderWidth: '2.5px' }}
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
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Sub Group Number</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    style={{ borderWidth: '2.5px' }}
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
            <Col xs={3} md={3}></Col>
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
          <Row className="mt-2 mb-2 justify-content-md-center">
            <Col xs={12} md={2}/>
            <Col xs={3} md={8}>
              <Button
                style={{ width: '220px', fontSize: '1.3em' }}
                onClick={handleSubmit}
              >
                Generate a SubGroup
              </Button>
            </Col>
            <Col xs={12} md={2}/>
          </Row>
        </div>

      </Container>
    </div>
  );
};

export default GroupsEdit;
