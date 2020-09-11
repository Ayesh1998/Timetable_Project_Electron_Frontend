/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from 'react-bootstrap';
import {setEditingProgram, setEditingProgramId, setEditProgram, setPrograms} from './programsSlice';
import {NavLink, Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import NavBar from '../../components/NavBar/NavBar';
import styles from './programs.css';
import routes from '../../constants/routes.json';


const Program = (props) => (
  <tr>
    <td>{props.program.name}</td>
    <td>{props.program.programToken}</td>
    <td>
      <Button onClick={() => {
        props.handleEdit(props.program._id);
      }} style={{width: '160px', fontSize: '1.3em'}}>

        edit


      </Button>
      <Button
        className="ml-4"
        onClick={() => {
          props.handleDelete(props.program._id);
        }}
        variant="outline-danger"
        style={{
          width: '160px',
          fontSize: '1.3em',
          borderWidth: '2px'
        }}
      >
        <NavLink
          to={routes.PROGRAMS_LIST_VIEW}
          style={{color: '#fff'}}
        >
          delete
        </NavLink>
      </Button>
    </td>
  </tr>
);


// noinspection DuplicatedCode
const ProgramsListView: React.FC = () => {
  const dispatch = useDispatch();

  // const editingYearSemId = useSelector(
  //   (state: {
  //     yearSems: any
  //     editingYearSemId: string
  //   }) => state.yearSems.editingYearSemId
  // )

  // const editingYearSem = useSelector(
  //   (state: {
  //     yearSems: any
  //     editingYearSemId: any
  //   }) => state.yearSems.editingYearSem
  // )

  const [programsObject, setProgramsObject] = useState<any>([]);

  const [renderEdit, setRenderEdit] = useState<boolean | null>(false);

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    fetchData();
    console.log('menne sub group eke ************************');

  });


  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/programs/getPrograms`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const responseData = await response.json();

      setProgramsObject(responseData.programs);
      dispatch(setPrograms(responseData.programs));
      console.log(responseData.programs);

      if (!responseData) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    console.log(`in handle delete + ${id}`);

    try {
      const response = await fetch(
        `http://localhost:5000/programs/deletePrograms`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id})
        }
      );

      const responseData = await response.json();


      fetchData();

      if (!responseData) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }

  };


  const handleEdit = async (id: string) => {
    console.log(`in handle edit + ${id}`);

    try {
      const response = await fetch(
        `http://localhost:5000/programs/getPrograms/` + id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },

        }
      );

      const responseData = await response.json()

      console.log("me edit eken passe data-------------------------");
      console.log(responseData);


      dispatch(setEditingProgramId(id))
      dispatch(setEditingProgram(responseData))
      dispatch(setEditProgram(true))

      setRenderEdit(true);

    } catch (errors) {
      const errors_ = errors

      console.log(errors)
    }

  };

  const renderEditTo = () => {
    if (renderEdit) {
      return <Redirect to={routes.PROGRAMS_EDIT}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const programList = () => {
    return programsObject.map(program => {
      return <Program program={program} handleDelete={handleDelete} handleEdit={handleEdit} key={program._id}/>;
    });
  };

  return (
    <div style={{backgroundColor: '#37474F', height: '100vh'}}>
      {renderEditTo()}

      <NavBar/>
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>Programme List</h3>
        </Col>
      </Row>
      {programsObject && (
        <Container
          className={`mt-2 p-4 ${styles.programsTopWrapper}`}
          style={{
            border: '3px solid white',
            borderRadius: '8px',
            color: 'white'
          }}
        >
          <Row className="mt-3 mb-4 justify-content-md-left">
            <Col xs={12} md={12} className="mt-auto">
              <Button style={{width: '240px', fontSize: '1.2em'}}>
                <NavLink
                  to={routes.PROGRAMS_ADD}
                  style={{color: '#fff'}}
                >
                  Add New Programme
                </NavLink>
              </Button>
            </Col>
          </Row>
          <Row className="mt-3 mb-4 justify-content-md-center">
            <Col xs={12} md={12} className="mt-auto">
              <Table
                striped
                bordered
                hover
                variant="dark"
                className={`${styles.programsViewTable}`}
              >
                <thead className="thead-light">
                <tr>
                  <th>Programme Name</th>
                  <th>Token</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {programList()}
                </tbody>

              </Table>


            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default ProgramsListView;
