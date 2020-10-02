import React, { useState } from 'react';
import { Col, Row, Container, Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import Pdf from 'react-to-pdf';
import NavBar from '../../components/NavBar/NavBar';
import TimetableGenerator from './TimetableGenerator';

const ref = React.createRef();

const TimetableScreen: React.FC = () => {

  const options = [
    { value: 'Student', label: 'Student' },
    { value: 'Room', label: 'Room' },
    { value: 'Lecturer', label: 'Lecturer' }
  ];

  const lecturerOptions = [
    { value: 'Kodagoda', label: 'Kodagoda' },
    { value: 'Room', label: 'Room' },
    { value: 'Lecturer', label: 'Lecturer' }
  ];

  const buildingOptions = [
    { value: 'Student', label: 'Student' },
    { value: 'Room', label: 'Room' },
    { value: 'Lecturer', label: 'Lecturer' }
  ];

  const yearOptions = [
    { value: 'Y1', label: 'Year1' },
    { value: 'Y2', label: 'Year2' },
    { value: 'Y3', label: 'Year3' },
    { value: 'Y4', label: 'Year4' }
  ];

  const groupOptions = [
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' }
  ];

  const degreeOptions = [
    { value: 'IT', label: 'IT' },
    { value: 'SE', label: 'SE' },
    { value: 'CS', label: 'CS' }
  ];

  const semesterOptions = [
    { value: 'S1', label: 'Semester 01' },
    { value: 'S2', label: 'Semester 02' }
  ];

  const roomOptions = [
    { value: 'B405-Pclab', label: 'B405-Pclab' },
    { value: 'Room', label: 'Room' },
    { value: 'Lecturer', label: 'Lecturer' }
  ];

  const [isFilters, setIsFilters] = useState(false);
  const [seletedRoleOption, setSeletedRoleOption] = useState<{ value: string, label: string } | null>(null);
  const [seletedLecturerOption, setSeletedLecturerOption] = useState<{ value: string, label: string } | null>(null);
  const [seletedBuildingOption, setSeletedBuildingOption] = useState<{ value: string, label: string } | null>(null);
  const [seletedRoomOption, setSeletedRoomOption] = useState<{ value: string, label: string } | null>(null);
  const [seletedDegreeOption, setSeletedDegreeOption] = useState<{ value: string, label: string } | null>(null);
  const [seletedYearOption, setSeletedYearOption] = useState<{ value: string, label: string } | null>(null);
  const [seletedSemesterOption, setSeletedSemesterOption] = useState<{ value: string, label: string } | null>(null);
  const [seletedGroupOption, setSeletedGroupOption] = useState<{ value: string, label: string } | null>(null);
  const [role, setRole] = useState('');
  const [lecturer, setLecturer] = useState('');
  const [building, setBuilding] = useState('');
  const [room, setRoom] = useState('');
  const [degree, setDegree] = useState<string | null>('');
  const [year, setYear] = useState<string | null>('');
  const [semester, setSemester] = useState<string | null>('');
  const [group, setGroup] = useState<string | null>('');
  const [isGenerate, setIsGenerate] = useState(false);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState('');

  const handleClose = () => setShow(false);

  const handleChangeRole = selectedOption => {
    setSeletedRoleOption(selectedOption);
    setRole(selectedOption.value);
  };
  const handleChangeLecturer = selectedOption => {
    setSeletedLecturerOption(selectedOption);
    setLecturer(selectedOption.value);
  };
  const handleChangeBuilding = selectedOption => {
    setSeletedBuildingOption(selectedOption);
    setBuilding(selectedOption.value);
  };
  const handleChangeRoom = selectedOption => {
    setSeletedRoomOption(selectedOption);
    setRoom(selectedOption.value);
  };

  const handleChangeDegree = selectedOption => {
    setSeletedDegreeOption(selectedOption);
    setDegree(selectedOption.value);
  };

  const handleChangeYear = selectedOption => {
    setSeletedYearOption(selectedOption);
    setYear(selectedOption.value);
  };

  const handleChangeSemester = selectedOption => {
    setSeletedSemesterOption(selectedOption);
    setSemester(selectedOption.value);
  };

  const handleChangeGroup = selectedOption => {
    setSeletedGroupOption(selectedOption);
    setGroup(selectedOption.value);
  };


  const handleFilters = () => setIsFilters(!isFilters);

  const handleGenerate = () => {
    setIsGenerate(true);
    if (lecturer != '') {
      setErrors('There are conflicts in these session with following ids. 24342334343434, 256723765345454,2345435463d,23445fgd65454' +
        '34534rrt5646,34546786792,454256856t356,34567547337568,35437375648765');
      setShow(true);
    }
    if (room != '') {
      setErrors('There are conflicts in these session with following ids. 724342334343434, 156723765345454,2345435463d,23445fgd65454' +
        '34534rrt5646,34546786792,454256856t356,34567547337568,35437375648765, 34534rrt5646,34546786792,454256856t356,34567547337568,35437375648765 ');
      setShow(true);
    }
    if (semester != '') {
      setErrors('There are conflicts in these session with following ids. 824342334343434, 656723765345454,2345435463d,23445fgd65454' +
        '34534rrt5646,34546786792,454256856t356,34567547337568,35437375648765,824342334343434, 656723765345454,2345435463d');
      setShow(true);
    }

  };


  const secondOptionsGenerator = () => {
    if (!role) {
      return <div/>;
    }
    if (role === 'Lecturer') {
      return (<Row className="">
        <Col
          xs={12}
          md={2}
          className="p-3"
        >
          <span className="">Name</span>
        </Col>
        <Col
          xs={12}
          md={2}
          className="p-3"
        >
          <Select
            value={seletedLecturerOption}
            onChange={handleChangeLecturer}
            options={lecturerOptions}
          />
        </Col>
      </Row>);
    }

    if (role === 'Room') {
      return (<Row className="">
        <Col
          xs={12}
          md={2}
          className="p-3"
        >
          <span className="">Room</span>
        </Col>
        <Col
          xs={12}
          md={2}
          className="p-3"
        >
          <Select
            value={seletedRoomOption}
            onChange={handleChangeRoom}
            options={roomOptions}
          />
        </Col>
      </Row>);
    }

    if (role === 'Student') {
      return (<Row className="">
        <Col
          xs={12}
          md={1}
          className="p-3"
        >
          <span className="">Degree</span>
        </Col>
        <Col
          xs={12}
          md={2}
          className="p-3"
        >
          <Select
            value={seletedDegreeOption}
            onChange={handleChangeDegree}
            options={degreeOptions}
          />
        </Col>
        <Col
          xs={12}
          md={1}
          className="p-3"
        >
          <span className="">Year</span>
        </Col>
        <Col
          xs={12}
          md={2}
          className="p-3"
        >
          <Select
            value={seletedYearOption}
            onChange={handleChangeYear}
            options={yearOptions}
          />
        </Col>
        <Col
          xs={12}
          md={1}
          className="p-3"
        >
          <span className="">Semester</span>
        </Col>
        <Col
          xs={12}
          md={2}
          className="p-3"
        >
          <Select
            value={seletedSemesterOption}
            onChange={handleChangeSemester}
            options={semesterOptions}
          />
        </Col>
        <Col
          xs={12}
          md={1}
          className="p-3"
        >
          <span className="">Group</span>
        </Col>
        <Col
          xs={12}
          md={2}
          className="p-3"
        >
          <Select
            value={seletedGroupOption}
            onChange={handleChangeGroup}
            options={groupOptions}
          />
        </Col>
      </Row>);
    }

  };

  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <NavBar/>
      <Row className="text-center mb-2">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{ backgroundColor: '#343a40', color: '#fff' }}
        >
          <h3>Generate Timetable</h3>
        </Col>
      </Row>
      <Container>
        <Row className="">
          <Col
            xs={12}
            md={8}
            className="p-1">
            <p className="" style={{ textDecoration: 'underline', width: '100px' }} onClick={() => handleFilters()}>Add
              Filters</p>
          </Col>
          <Col
            xs={12}
            md={2}
            className="p-0 mr-4">
            <Button
              style={{ width: '200px', fontSize: '1.1em' }}
              onClick={handleGenerate}
            >
              Generate Timetable
            </Button>
          </Col>
          <Col
            xs={12}
            md={1}
            className="p-0">
            <Pdf targetRef={ref} filename="Timetable.pdf" scale={0.7}>
              {({ toPdf }) => <Button variant="outline-primary"
                                      style={{ width: '200px', fontSize: '1.1em' }}
                                      onClick={toPdf}
              >
                Pdf
              </Button>}
            </Pdf>
          </Col>

        </Row>
        {isFilters && <Row className="">
          <Col
            xs={12}
            md={4}
            className="p-3"
          >
            <span className="">Select the role</span>
          </Col>
          <Col
            xs={12}
            md={4}
            className="p-3"
          >
            <Select
              value={seletedRoleOption}
              onChange={handleChangeRole}
              options={options}
            />
          </Col>
        </Row>}
        {isFilters && secondOptionsGenerator()}

        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Conflicts Occurred</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ overflow: 'auto'}}>{errors}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Row className=" mb-5">
          <Col xs={12} md={12} className="p-3" ref={ref}>
            <TimetableGenerator
              degree={degree}
              semester={semester}
              year={year}
              group={group}
              lecturer={lecturer}
              isGenerate={isGenerate}
              room={room}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
    ;
};

export default TimetableScreen;
