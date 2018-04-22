import React from "react";
import { Row, Col, Button } from 'reactstrap';
// import NavBar from "../NavBar";
import WordChanger from './WordChanger';
import './home.css'

WordChanger();
const Home = () => (
    <Row className="bg-row">
      {/* <NavBar /> */}
      <Col xs="12" sm="12" md="12" lg="12">
        <Row className="hero-text">
          <Col xs="12" sm="12" md="12" lg="12">
            <span className="header-text">Find your next </span><span className="randoms header-text"></span>
            <p className="body-text hero-subtext">Meet new and interesting people to live with nearby.</p>
            <p className="bod-text tos-text">By signing up, you agree with our Terms of Service & Privacy Policy</p>
            <a href="/signup"><Button color="success" className="btns hero-btn">Find My Roomie!</Button></a>
          </Col>
        </Row>
      </Col>
    </Row>
);

export default Home;