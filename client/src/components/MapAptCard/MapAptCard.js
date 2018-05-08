import {
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
  dots: true,
  infinite: true,
  nextArrow: <NextArrow />,
  prevArrow: <BackArrow />,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const MapAptCard = props => {
  return (
    <div>
      <Card>

      <Slider {...settings}>
          {props.aptData.imageURLs.map(img =>  <img src={img} width="640px" height="550px" />) }
      </Slider>
        
        <CardBody>
          <h1>
            {props.aptData.address}, {props.aptData.city}
          </h1>

          <h3>${props.aptData.prices}</h3>
          {props.aptData.features.map((features, i) => (
            <div key={i}>
              <h3>{features.key}</h3>
              <p>{features.value}</p>
            </div>
          ))}
          {(props.isSaved === false) ? (<Button onClick={() => props.saveAptToDB(props.aptData)}>Save</Button>) : (<Button onClick={() =>props.unsaveFromUser(props.aptData.address)}> Unsave</Button>)}
        </CardBody>
      </Card>
    </div>
  );
};

export default MapAptCard;
