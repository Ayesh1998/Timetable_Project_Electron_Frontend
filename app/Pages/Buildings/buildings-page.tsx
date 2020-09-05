import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import BuildingsList from './buildings-list';
import BuildingsEdit from './buildings-edit';
import BuildingsAdd from './buildings-add';

const BuildingsPage: React.FC = () => {
  let route: any;

  const editBuilding = useSelector(
    (state: {
      buildings: any
      editBuilding: boolean
    }) => state.buildings.editBuilding
  );

  if (editBuilding)
    route = (<BuildingsEdit/>);
  else
    route = (<BuildingsAdd/>);

  return (
    <div style={{
      minWidth: 'max-content',
      overflowX: 'hidden',
      marginBottom: '3%'
    }}>
      <NavBar/>
      <Row className='text-center mb-5'>
        <Col className='p-3'
             style={{
               backgroundColor: '#343a40',
               color: '#fff'
             }}>
          <h1>Buildings</h1>
        </Col>
      </Row>
      <div className='container'>
        <Row>
          <Col sm='4'
               style={{
                 marginTop: '115px'
               }}>
            <div>
              {route}
            </div>
          </Col>
          <Col sm='8'>
            <div>
              <BuildingsList/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BuildingsPage;
