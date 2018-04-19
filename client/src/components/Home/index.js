import React from "react";
import { Row, Col } from 'reactstrap';
import WordChanger from './WordChanger';
import './home.css'

WordChanger();
const Home = () => (
    <Row className="bg-row">
      <Col xs="12" sm="12" md="12" lg="12">
        <Row className="hero-text">
          <Col xs="12" sm="12" md="12" lg="12">
            <span className="header-text">Find your next </span><span className="randoms header-text"></span>
            <p className="body-text hero-subtext">Meet new and interesting people to live with nearby.</p>
          </Col>
        </Row>
      </Col>
    </Row>
);

export default Home;