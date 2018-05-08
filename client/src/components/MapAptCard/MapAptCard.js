import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  Button,
  UncontrolledCarousel
} from "reactstrap";
import React from "react";
import Slider from "react-slick";
import next from './next.png';
import back from './back.png';
import './MapAptCard.css';

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
    //   <div
    //     className={className}
    //     style={{ ...style, display: "block", background: "red" }}
    //     onClick={onClick}
    //   />
    <div className={className}>
        <img className="arrow" src={next} alt="" onClick={onClick}/>
    </div>
    );
}

function BackArrow(props) {
    const { className, style, onClick } = props;
    return (
    //   <div
    //     className={className}
    //     style={{ ...style, display: "block", background: "red" }}
    //     onClick={onClick}
    //   />
    <div className={className} id="trans-bg">
        <img className="arrow back-arrow" src={back} alt="" onClick={onClick}/>
    </div>
    );
}

var settings = {
  className: "apt-slider",
  dots: true,
  infinite: true,
  nextArrow: <NextArrow />,
  prevArrow: <BackArrow />,
  speed: 500,
  initialSlide: 0,
  slidesToShow: 1,
  slidesToScroll: 1
};

const MapAptCard = props => {
  return (
    <Row>
      <Col xs="12">
        <Row className="aptimg-div">
          <Col xs="12">      
            <Slider {...settings}>
                {props.aptData.imageURLs.map(img =>  <img src={img} className="apt-img" />) }
            </Slider>
            <span className="compat-percent aptpage-price">${props.aptData.prices}/mo</span>
          </Col>
        </Row>
        <Row className="aptinfo-div">
          <Col xs="12">
            <Card className="aptinfo-card">
              <CardBody>
                <span className="header-text address-text">{props.aptData.address}</span>
                <span className="like-div">{(props.isSaved === false) ? (<Button className="like-btn" outline color="danger" onClick={() => props.saveAptToDB(props.aptData)}>Like</Button>) : (<Button className="like-btn" color="danger" onClick={() =>props.unsaveFromUser(props.aptData.address)}>You Liked This</Button>)}</span>
                <h2 className="header2-text city-text">{props.aptData.city}</h2>
                {props.aptData.features.map((features, i) => (
                  <div key={i}>
                    <h3 className="header2-text feature-text">{features.key}</h3>
                    <ul className="body-text featureValue-text"><li>{features.value}</li></ul>
                  </div>
                ))}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MapAptCard;
