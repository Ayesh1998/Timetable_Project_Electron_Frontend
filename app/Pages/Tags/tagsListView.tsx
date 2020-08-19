/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import NavBar from '../../components/NavBar/NavBar';
import styles from './tags.css';
import routes from '../../constants/routes.json';
import {setTags} from './tagsSlice';
import { Link } from 'react-router-dom';



const Tag = (props) => (
  <tr>
    <td>{props.tag.name}</td>
    <td>{props.tag.tagToken}</td>
    <td>
      <Link to={"/editTag/"+props.tag._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.tag._id) }}>delete</a>
    </td>
  </tr>
)

// noinspection DuplicatedCode
const TagsListView: React.FC = () => {
  const dispatch = useDispatch();
  const [tagsObject, setTagsObject] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/tags/getTags`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const responseData = await response.json();

        setTagsObject(responseData.tags);
        dispatch(setTags(responseData.tags));
        console.log(responseData.tags);

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

  const handleDelete = async (id) => {

    try {
      const response = await fetch(
        `http://localhost:5000/tags/deleteTags`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(id)
        }
      );

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

  const tagList = ()  => {
    return tagsObject.map(tag => {
      return <Tag tag={tag} handleDelete={handleDelete} key={tag._id}/>;
    })
  }

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
          <h3>Tag Details</h3>
        </Col>
      </Row>
      {tagsObject && (
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
                <thead className="thead-light">
            <tr>
              <th>Real Name</th>
              <th>Tag Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { tagList() }
          </tbody>

              </Table>



            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default TagsListView;
