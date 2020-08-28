/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {RadioButton, RadioGroup} from 'react-radio-buttons';
//import CheckboxGroup from 'react-checkbox-group';
import {Redirect} from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './tags.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {
  setTags,
  setEditTag,
  setEditingTag,
  setEditingTagId
} from './tagsSlice'

// noinspection DuplicatedCode
const TagsEdit: React.FC = () => {
  const dispatch = useDispatch();
  // const value = useSelector();

  let tagList = useSelector(
    (state: {
      tags: any
    }) => state.tags.tags
  )

  const editingTagId = useSelector(
    (state: {
      tags: any
      editingTagId: string
    }) => state.tags.editingTagId
  )

  const editingTag = useSelector(
    (state: {
      tags: any
      editingTagId: any
    }) => state.tags.editingTag
  )

  const [tag, setTag] = useState<{
    name: string,
    tagToken: string
  }>({
    name:editingTag.name,
    tagToken: editingTag.tagToken
  })
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>( false );
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState<string>('');
  const [tagToken, setTagToken] = useState<string>('');
  const [id, setId] = useState<string>('');

  useEffect(() => {
    //setTags(tagList);
    setTag(editingTag);
    setId(editingTagId);
    setName(editingTag.name);
    setTagToken(editingTag.tagToken);

  }, []);


  console.log("############################");
  console.log(id);
  console.log(name);
  console.log(tagToken);
  console.log(tag);

  const handleSubmit = async () => {
     console.log("1111111111111111111111111111");
    // console.log(name);
     console.log(id);


    // const finalObject = {
    //   name,
    //   tagToken
    // };

    const finalObjectWithID = {
      tags: tag,
      // eslint-disable-next-line no-underscore-dangle
      id: id
    };
    console.log('22222222222222222222222222222222222');
    console.log(finalObjectWithID);

    try {
      const response = await fetch(
        `http://localhost:5000/tags/editTags`,
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
  //      dispatch(setEditTag(false))
  //      dispatch(setEditingTagId(''))
  //      dispatch(setEditingTag(null))


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
      return <Redirect to={routes.TAGS_LIST_VIEW}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const handleChangeName = ( e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setTag({...tag, name: e.target.value})
  };

  const handleChangeTagToken = (e: React.ChangeEvent<HTMLInputElement>) => {

    setTagToken(e.target.value);
    setTag({...tag, tagToken: e.target.value})
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
          <h3>Edit Tag</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5 ${styles.tagsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >


          <div>
            <Row className="mt-3 mb-3 justify-content-md-center">
              <Col xs={12} md={4} className="mt-auto">
                <p>Real Name</p>
              </Col>
              <Col xs={3} md={3}>
                <Form className="">
                  <Form.Group controlId="formBasicEmail">

                      <Form.Control
                        type="text"
                        style={{borderWidth: '2.5px'}}
                        value={name}
                        onChange={handleChangeName}
                        placeholder="ex:- Lecture"
                      />


                  </Form.Group>
                </Form>
              </Col>
              <Col xs={3} md={3}/>
            </Row>
            <Row className="mt-3 mb-3 justify-content-md-center">
              <Col xs={12} md={4}>
                <p>Tag Name</p>
              </Col>
              <Col xs={2} md={6}>
              <Form className="">
                  <Form.Group controlId="formBasicEmail">


                   <Form.Control
                        type="text"
                        style={{borderWidth: '2.5px'}}
                        value={tagToken}
                        onChange={handleChangeTagToken}
                        placeholder="ex:- Lec"
                      />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row className="mb-2 justify-content-md-center">
              <Col xs={0} md={9}/>
              <Col xs={12} md={2}>
                <Button
                  style={{width: '160px', fontSize: '1.3em'}}
                  onClick={handleSubmit}
                >
                  Edit Tag
                </Button>
              </Col>
            </Row>
          </div>

      </Container>
    </div>
  );
};

export default TagsEdit;
