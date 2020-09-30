import React from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import styles from './notAvailables.css';

const SubGroupsAddNA: React.FC = () => {
  return (
    <div>
       <Container
           className={`mt-2 p-4 mb-5  ${styles.notAvailablesTopWrapper}`}
           style={{
             border: '3px solid white',
             borderRadius: '8px',
             color: 'white'
           }}
         >
      SubGroups add
      </Container>
    </div>
  )
}

export default SubGroupsAddNA
