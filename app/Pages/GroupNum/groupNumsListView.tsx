/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import NavBar from '../../components/NavBar/NavBar';
import styles from './groupNums.css';
import routes from '../../constants/routes.json';
// import {
//   setYearSems,
//   setEditYearSem,
//   setEditingYearSem,
//   setEditingYearSemId
// } from './yearsemsSlice';
import { Link , Redirect } from 'react-router-dom';



const GroupNum = (props) => (
  <tr>
    <td>{props.groupNum.groupNum}</td>

    <td>
    <Button onClick={() => { props.handleEdit(props.groupNum._id) }} style={{width: '160px', fontSize: '1.3em'}}>

                 edit


              </Button>
         <Button
                className="ml-4"
                onClick={() => { props.handleDelete(props.groupNum._id) }}
                variant="outline-danger"
                style={{
                  width: '160px',
                  fontSize: '1.3em',
                  borderWidth: '2px'
                }}
              >
                <NavLink
                  to={routes.YEARSEMS_LIST_VIEW}
                  style={{color: '#fff'}}
                >
                 delete
                </NavLink>
              </Button>
    </td>
  </tr>
)




// noinspection DuplicatedCode
const GroupNumsListView: React.FC = () => {
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

  const [yearSemsObject, setYearSemsObject] = useState<any>([]);

 const [renderEdit, setRenderEdit] = useState<boolean | null>( false );

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    fetchData();


  });


  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/groupNums/getGroupNums`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const responseData = await response.json();

      setYearSemsObject(responseData.groupNums);
     // dispatch(setYearSems(responseData.yearsems));
     // console.log(responseData.yearsems);

      if (!responseData) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

   const handleDelete = async (id) => {
  //   console.log(`in handle delete + ${id}`);

  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/yearSems/deleteYearSems`,
  //       {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({id})
  //       }
  //     );

  //     const responseData = await response.json();
  //     // console.log(responseData.userDetails);
  //     //setRenderRedirectTo(true);

  //     fetchData();

  //     if (!responseData) {
  //       // noinspection ExceptionCaughtLocallyJS
  //       throw new Error(responseData.message);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }


    // setTagsObject({
    //   tagsObject: tagsObject.filter(el => el._id !== id)
    // })


    // setTagsObjectDel({
    //   tagsObject: tagsObject.filter(el => el._id !== id)
    // })




  };


  const handleEdit = async (id: string) => {
    // console.log(`in handle edit + ${id}`);

    // try {
    //   const response = await fetch(
    //     `http://localhost:5000/yearSems/getYearSems/` + id,
    //     {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },

    //     }
    //   );

    //   const responseData = await response.json()
    //   setRenderEdit(true);
    //   console.log("me edit eken passe data-------------------------");
    //   console.log(responseData);


    //    dispatch(setEditingYearSemId(id))
    //    dispatch(setEditingYearSem(responseData))
    //    dispatch(setEditYearSem(true))

    // } catch (errors) {
    //   const errors_ = errors

    //   console.log(errors)
    // }

  };

  const renderEditTo = () => {
    if (renderEdit) {
      return <Redirect to={routes.YEARSEMS_EDIT}/>;
      //   props.history.push(loginState.redirectTo);s
    }
    return null;
  };

  const groupNumList = ()  => {
    return yearSemsObject.map(yearSem => {
      return <GroupNum groupNum={yearSem} handleDelete={handleDelete} handleEdit={handleEdit} key={yearSem._id}/>;
    })
  }

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
          <h3>Group Number List</h3>
        </Col>
      </Row>
      {yearSemsObject && (
        <Container
          className={`mt-2 p-4 ${styles.yearSemsTopWrapper}`}
          style={{
            border: '3px solid white',
            borderRadius: '8px',
            color: 'white'
          }}
        >
          <Row className="mt-3 mb-4 justify-content-md-left">
            <Col xs={12} md={12} className="mt-auto">
            <Button style={{width: '220px', fontSize: '1.2em'}}>
                <NavLink
                  to={routes.YEARSEMS_ADD}
                  style={{color: '#fff'}}
                >
                 Add New Group Num
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
                className={`${styles.groupNumsViewTable}`}
              >
                <thead className="thead-light">
            <tr>
              <th>Group Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { groupNumList() }
          </tbody>

              </Table>



            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default GroupNumsListView;
