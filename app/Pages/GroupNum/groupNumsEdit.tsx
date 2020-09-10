import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import styles from './groupNums.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {setEditingGroupNum, setEditingGroupNumId, setEditGroupNum} from './groupNumsSlice';

const GroupNumsEdit: React.FC = () => {
  const dispatch = useDispatch();

  const editingGroupNumId = useSelector(
    (state: {
      groupNums: any
      editingGroupNumId: string
    }) => state.groupNums.editingGroupNumId
  );

  const editingGroupNum = useSelector(
    (state: {
      groupNums: any
      editingGroupNumId: any
    }) => state.groupNums.editingGroupNum
  );

  const [groupNum, setGroupNum] = useState<{
    groupNum: number,

  }>({
    groupNum: editingGroupNum.groupNum

  });
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [id, setId] = useState<string>('');

  useEffect(() => {
    setId(editingGroupNumId);
  }, []);

  const handleSubmit = async () => {
    console.log(id);

    const finalObjectWithID = {
      groupNums: groupNum,
      id: id
    };

    console.log(finalObjectWithID);

    try {
      const response = await fetch(
        `http://localhost:5000/groupNums/editGroupNums`,
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
      dispatch(setEditGroupNum(false));
      dispatch(setEditingGroupNumId(''));
      dispatch(setEditingGroupNum(null));
      if (!responseData) {
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.GROUPNUMS_LIST_VIEW}/>;
    }
    return null;
  };

  const handleChangeGroupNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupNum({...groupNum, groupNum: e.target.value});
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
          <h3>Edit Group Number</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5 ${styles.groupNumsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >


        <div>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4} className="mt-auto">
              <p>Group Number</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">

                  <Form.Control
                    type="text"
                    style={{borderWidth: '2.5px'}}
                    value={groupNum.groupNum}
                    onChange={handleChangeGroupNum}
                    placeholder="ex:- 1"
                  />


                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>

          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={3}/>
            <Col xs={3} md={7}>
              <Button
                style={{width: '160px', fontSize: '1.3em'}}
                onClick={handleSubmit}
              >
               Edit Group Number
              </Button>
            </Col>
            <Col xs={12} md={2}/>
          </Row>
        </div>

      </Container>
    </div>
  );
};

export default GroupNumsEdit;