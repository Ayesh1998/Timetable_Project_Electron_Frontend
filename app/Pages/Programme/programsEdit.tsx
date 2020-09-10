import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import styles from './programs.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {setEditingProgram, setEditingProgramId, setEditProgram} from './programsSlice';

const ProgramsEdit: React.FC = () => {
  const dispatch = useDispatch();

  const editingProgramId = useSelector(
    (state: {
      programs: any
      editingProgramId: string
    }) => state.programs.editingProgramId
  );

  const editingProgram = useSelector(
    (state: {
      programs: any
      editingProgramId: any
    }) => state.programs.editingProgram
  );

  const [program, setProgram] = useState<{
    name: string,
    programToken: string
  }>({
    name: editingProgram.name,
    programToken: editingProgram.programToken
  });
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [id, setId] = useState<string>('');

  useEffect(() => {
    setId(editingProgramId);
  }, []);

  const handleSubmit = async () => {
    console.log(id);

    const finalObjectWithID = {
      programs: program,
      id: id
    };

    console.log(finalObjectWithID);

    try {
      const response = await fetch(
        `http://localhost:5000/programs/editPrograms`,
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
      dispatch(setEditProgram(false));
      dispatch(setEditingProgramId(''));
      dispatch(setEditingProgram(null));
      if (!responseData) {
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.PROGRAMS_LIST_VIEW}/>;
    }
    return null;
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgram({...program, name: e.target.value});
  };

  const handleChangeProgramToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgram({...program, programToken: e.target.value});
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
          <h3>Edit Programme</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5 ${styles.programsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >


        <div>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4} className="mt-auto">
              <p>Programme Name</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    type="text"
                    style={{borderWidth: '2.5px'}}
                    value={program.name}
                    onChange={handleChangeName}
                    placeholder="ex:-Software Engineering"
                  />


                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Short Name for Programme</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">


                  <Form.Control
                    type="text"
                    style={{borderWidth: '2.5px'}}
                    value={program.programToken}
                    onChange={handleChangeProgramToken}
                    placeholder="ex:-SE"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}></Col>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={3}/>
            <Col xs={3} md={7}>
              <Button
                style={{width: '160px', fontSize: '1.3em'}}
                onClick={handleSubmit}
              >
               Edit Programme
              </Button>
            </Col>
            <Col xs={12} md={2}/>
          </Row>
        </div>

      </Container>
    </div>
  );
};


export default ProgramsEdit;
