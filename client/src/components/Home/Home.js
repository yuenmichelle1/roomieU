import React from "react";
import { Row, Col, Button } from 'reactstrap';
import WordChanger from './WordChanger';
import './home.css'
import tired from './tired.jpg';
import survey from './survey.jpg';
import find from './find.jpg';
import apartment from './apartment.jpg';

WordChanger();
const Home = () => (

    <Row className="container-row">

      <Col xs="12" sm="12" md="12" lg="12">
        <Row className="bg-row" />
        {/* Hero */}
        <Row className="hero-text">
          <Col xs="12" sm="12" md="12" lg="12">
            <span className="header-text">Find your next </span><span className="randoms header-text"></span>
            <p className="body-text hero-subtext">Meet new and interesting people to live with near your university.</p>
            <a href="/signup"><Button color="success" className="btns hero-btn">Find My Roomie!</Button></a>
            <p className="bod-text tos-text">By signing up, you agree with our Terms of Service & Privacy Policy</p>
          </Col>
        </Row>
        {/* Content-1 */}
        <Row className="sub-hero nav-color">
          <Col xs="0" sm="0" md="1" lg="1" />
          <Col xs="12" sm="12" md="4" lg="4" className="sub-text">
            <div className="div-spacing" />
            <span className="header2-text">Tired of having crappy roommates?</span>
            <p className="body-text">Sign up and find your new roomie today!</p>
          </Col>
          <Col xs="0" sm="0" md="1" lg="1" />
          <Col xs="12" sm="12" md="6" lg="6">
            <img src={tired} alt="tired" className="img"/>
          </Col>
        </Row>
        {/* Content-2 */}
        <Row className="sub-hero nav-color">
          <Col xs="12" sm="12" md="6" lg="6" className="sm-2">
            <img src={survey} alt="survey" className="img"/>
          </Col>
          <Col xs="0" sm="0" md="1" lg="1" />
          <Col xs="12" sm="12" md="4" lg="4" className="sub-text sm-1">
            <div className="div-spacing" />
            <span className="header2-text">Fill out a short survey</span>
            <p className="body-text">We'll match you up with other students also looking for roomies, based on your answers!</p>
          </Col>
          <Col xs="0" sm="0" md="1" lg="1" />
        </Row>
        {/* Content-3 */}
        <Row className="sub-hero nav-color">
          <Col xs="0" sm="0" md="1" lg="1" />
          <Col xs="12" sm="12" md="4" lg="4" className="sub-text">
            <div className="div-spacing" />
            <span className="header2-text">Find your perfect roomie</span>
            <p className="body-text">Choose one roomie of many we've selected for you, and we'll notify them. Once they've accepted, <b>IT'S A MATCH!</b></p>
          </Col>
          <Col xs="0" sm="0" md="1" lg="1" />
          <Col xs="12" sm="12" md="6" lg="6">
            <img src={find} alt="tired" className="img tired-img"/>
          </Col>
        </Row>
        {/* Content-4 */}
        <Row className="sub-hero nav-color">
          <Col xs="12" sm="12" md="6" lg="6" className="sm-2">
            <img src={apartment} alt="tired" className="img"/>
          </Col>
          <Col xs="0" sm="0" md="1" lg="1" />
          <Col xs="12" sm="12" md="4" lg="4" className="sub-text sm-1">
            <div className="div-spacing" />
            <span className="header2-text">Find the perfect place</span>
            <p className="body-text">We'll show you all the apartments near your university within both your budgets!</p>
          </Col>
          <Col xs="0" sm="0" md="1" lg="1" />
        </Row>
        {/* Call to Action */}
        <Row className="cta align-middle">
          <Col xs="12" sm="12" md="12" lg="12">
            <div className="cta-div">
              <h1 className="header-text cta-text">Sign up and find the perfect match today!</h1>
              <a href="/signup"><Button color="warning" className="btns cta-btn">Find My Roomie!</Button></a>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
);

export default Home;