import React from 'react';
// import { Link } from 'react-router-dom';
// import routes from '../constants/routes.json';
import { Row, Col, Container } from 'react-bootstrap';

export default function Home(): JSX.Element {
  return (
    <Container className="mt-2">
      <Row>
        <Col xs={6} md={6}>
          <p>Time Table Project</p>
        </Col>
        <Col xs={6} md={6}>
          <p>Time Table Project</p>
        </Col>
      </Row>
    </Container>
  );
}
