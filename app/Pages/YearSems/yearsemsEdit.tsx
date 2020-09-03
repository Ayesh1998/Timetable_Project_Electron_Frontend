/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {RadioButton, RadioGroup} from 'react-radio-buttons';
//import CheckboxGroup from 'react-checkbox-group';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './yearsems.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {
  setYearSems,
  setEditYearSem,
  setEditingYearSem,
  setEditingYearSemId
} from './yearsemsSlice';


const yearList = [1, 2,3,4];
const semesterList = [1, 2];
// noinspection DuplicatedCode
const YearSemsEdit: React.FC = () => {
  const dispatch = useDispatch();
  // const value = useSelector();


  // let yearSemList = useSelector(
  //   (state: {
  //     yearSems: any
  //   }) => state.yearSems.yearSems
  // )

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

  // const [yearSem, setYearSem] = useState<{
  //   year: number,
  //   semester: number,
  //   yearSemToken:string
  // }>({
  //   year: editingYearSem.year,
  //   semester: editingYearSem.semester,
  //   yearSemToken:editingYearSem.yearSemToken


  // })


  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>( false );
  const [error, setError] = useState<string | null>(null);
//111
  const [year, setYear] = useState<number | null>(null);
  const [semester, setSemester] = useState<number | null>(null);
  const [yearSemToken, setYearSemToken] = useState<string>('');

  const [yearsemsObject, setYearSemsObject] = useState<any>(null);
  const [id, setId] = useState<string>('');

  useEffect(() => {
   //setYearSems(yearSemList);
  //  setYearSem(editingYearSem);
  //  setId(editingYearSemId);
  //  setYear(editingYearSem.year);
  //  setSemester(editingYearSem.semester);
  //  setYearSemToken(editingYearSem.yearSemToken);
   //setYearSem(editingYearSem);
   setId("5f3e26646038693c38fb89c9");
   setYear(3);
   setSemester(2);
   setYearSemToken("Y3.S2");

  }, []);


  // const renderRedirectToView = () => {

  //   if (yearsemsObject != null) {
  //     return <Redirect to={routes.YEARSEMS_LIST_VIEW}/>;
  //     //   props.history.push(loginState.redirectTo);s
  //   }
  //   return null;
  // };


  const handleSubmit = async () => {
    // console.log("1111111111111111111111111111");
    // console.log(name);
    // console.log(tagToken);
    const finalObject={
      year,
      semester,
      yearSemToken
    };

    // const finalObjectWithID = {
    //   yearsems: yearSem,
    //   // eslint-disable-next-line no-underscore-dangle
    //   id: id
    // };

    const finalObjectWithID = {
        yearsems: finalObject,
        // eslint-disable-next-line no-underscore-dangle
        id: id
      };



    console.log('22222222222222222222222222222222222');
    console.log(finalObjectWithID);

    try {
      const response = await fetch(
        `http://localhost:5000/yearSems/editYearSems`,
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
  };

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.YEARSEMS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const handleChangeYear = ( e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setYear(val);
  };

  const handleChangeSemester = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    const year1 = year.toString();
    setSemester(e.target.value);

   if(val === 1){
      var id = 'Y' + year1 +'.S1';
   }
   else{
     var id = 'Y' + year1 +'.S2';
   }

    setYearSemToken(id);
    setSemester(val);

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
          <h3>Edit Academic Year & Semester</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5 ${styles.yearsemsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >


          <div>

            <Row className="mt-3 mb-3 justify-content-md-center">
              <Col xs={12} md={4}>
                <p>Year</p>
              </Col>

                  <Col xs={3} md={3}>
                  <Form className="">
                  <Form.Group controlId="formBasicEmail">

                      <Form.Control
                        as="select"
                        defaultValue="Choose..."
                        style={{borderWidth: '2.5px'}}
                        value={year}
                        onChange={handleChangeYear}
                      >
                        <option>Select</option>
                        {yearList?.map((group, index) => (
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
                <p>Semester</p>
              </Col>
              <Col xs={3} md={3}>
              <Form className="">
                  <Form.Group controlId="formBasicEmail">

                      <Form.Control
                        as="select"
                        defaultValue="Choose..."
                        style={{borderWidth: '2.5px'}}
                        value={semester}
                        onChange={handleChangeSemester}
                      >
                        <option>Select</option>
                        {semesterList?.map((sem, index) => (
                          <option>{sem}</option>
                        ))}
                      </Form.Control>

                  </Form.Group>
                </Form>
              </Col>
              <Col xs={3} md={3}></Col>
            </Row>
            <Row className="mt-2 mb-2 justify-content-md-center">
              <Col xs={12} md={2}/>
              <Col xs={3} md={8}>
                <Button
                  style={{width: '200px', fontSize: '1.3em'}}
                  onClick={handleSubmit}
                >
                  Edit Year & Sem
                </Button>
              </Col>
            </Row>
            <Col xs={12} md={2}/>
          </div>

      </Container>
    </div>
  );
};

export default YearSemsEdit;