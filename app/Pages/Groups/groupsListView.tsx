import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from 'react-bootstrap';
import {NavLink, Redirect} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import NavBar from '../../components/NavBar/NavBar';
import styles from './groups.css';
import routes from '../../constants/routes.json';
import {setEditGroup, setEditingGroup, setEditingGroupId, setGroups} from './groupsSlice';

const Group = (props: any) => (
  <tr>
    <td><NavLink to={routes.GROUPS_SINGLE_VIEW}>{props.group.groupId} </NavLink>
      <Button
        className="ml-4"
        onClick={() => {
          props.handleDelete(props.group._id,props.group.groupId);
        }}
        variant="outline-danger"
        style={{
          width: '100px',
          fontSize: '0.7em',
          borderWidth: '2px'
        }}
      >
        <NavLink
          to={routes.GROUPS_LIST_VIEW}
          style={{color: '#fff'}}
        >
          delete
        </NavLink>
      </Button>
    </td>
    <td>
      {
        props.group.subGroups && props.group.subGroups.map((sub: any) => {
          return (
            <div>{`${sub.subGroupId}`}
              <Button
                className="ml-4"
                onClick={() => {
                  props.handleDeleteSub(sub._id,sub.subGroupId);
                }}
                variant="outline-danger"
                style={{
                  width: '100px',
                  fontSize: '0.7em',
                  borderWidth: '2px'
                }}
              >
                <NavLink
                  to={routes.GROUPS_LIST_VIEW}
                  style={{color: '#fff'}}
                >
                  delete
                </NavLink>
              </Button></div>
          );
        })
      }
      <br/><br/>
      <div>
        <Button onClick={() => {
          props.handleAddSub(props.group._id);
        }} style={{width: '95px', fontSize: '0.9em'}}>
          Add
        </Button></div>
    </td>
  </tr>
);

const GroupsListView: React.FC = () => {
  const dispatch = useDispatch();

  const editingGroupId = useSelector(
    (state: {
      groups: any
      editingGroupId: string
    }) => state.groups.editingGroupId
  );

  const editingGroup = useSelector(
    (state: {
      groups: any
      editingGroupId: any
    }) => state.groups.editingGroup
  );
  const [groupsObject, setGroupsObject] = useState<any>([]);
  const [renderEdit, setRenderEdit] = useState<boolean | null>(false);

  useEffect(() => {
    fetchData().then(() => {
    });
  });

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
      setGroupsObject(responseData.groups);
      await dispatch(setGroups(responseData.groups));
      if (!responseData) {
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id: any , gid:any) => {
    try {
      const response = await fetch(
        `http://localhost:5000/groups/deleteGroups`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id})
        }
      );
      const responseData = await response.json();
      await fetchData();
      if (!responseData) {
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }

    try {

      const response = await fetch(
        `http://localhost:5000/subGroups/ deleteAllSubGroupsWithGroId`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"groupid":gid})
        }
      );
      const responseData = await response.json();
      await fetchData();
      if (!responseData) {
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteSub = async (id: any , subid:any) => {


    try {
      const response = await fetch(
        `http://localhost:5000/groups/deleteSubGroupUpdate`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"subKey":id})
        }
      );
      const responseData = await response.json();
      console.log(`me group eken sub delete una eke respose +${responseData}`)
      await fetchData();
      if (!responseData) {
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }


    try {
      const response = await fetch(
        `http://localhost:5000/subGroups/deleteSubGroupsWithSubId`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"subid":subid})
        }
      );
      const responseData = await response.json();
      console.log(`me sub group eken sub delete una eke respose +${responseData}`)
      await fetchData();
      if (!responseData) {
        throw new Error(responseData.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAddSub = async (id: string) => {
    await dispatch(setEditGroup(true));
    try {
      const response = await fetch(
        `http://localhost:5000/groups/getGroups/` + id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const responseData = await response.json();
      await dispatch(setEditingGroupId(id));
      await dispatch(setEditingGroup(responseData));
      setRenderEdit(true);
    } catch (errors) {
      console.log(errors);
    }
  };

  const renderEditTo = () => {
    if (renderEdit) {
      return <Redirect to={routes.GROUPS_EDIT}/>;
    }
    return null;
  };

  const groupList = () => {
    return groupsObject.map((group: { _id: any; }) => {
      return <Group group={group} handleDelete={handleDelete} handleDeleteSub={handleDeleteSub}
                    handleAddSub={handleAddSub} key={group._id}/>;
    });
  };

  return (
    <div style={{backgroundColor: '#37474F'}}>
      {renderEditTo()}

      <NavBar/>
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>Student Group Details</h3>
        </Col>
      </Row>
      {groupsObject && (
        <Container
          className={`mt-2 p-4 ${styles.groupsTopWrapper}`}
          style={{
            border: '3px solid white',
            borderRadius: '8px',
            color: 'white'
          }}
        >
          <Row className="mt-3 mb-4 justify-content-md-left">
            <Col xs={12} md={12} className="mt-auto">
              <Button style={{width: '160px', fontSize: '1.2em'}}>
                <NavLink
                  to={routes.GROUPS_ADD}
                  style={{color: '#fff'}}
                >
                  Add New Group
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
                variant="white"
                className={`${styles.groupsViewTable}`}
              >
                <thead className="thead-light">
                <tr>
                  <th>Group ID</th>
                  <th>Sub Group ID</th>
                </tr>
                </thead>
                <tbody>
                {groupList()}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default GroupsListView;
