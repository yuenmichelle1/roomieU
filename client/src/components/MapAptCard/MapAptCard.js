import {
  Card,
  CardImg,
  CardBody,
  Button
} from "reactstrap";
import React from "react";

const MapAptCard = props => {
  console.log(props.isSaved + "HALLLELUJA IF IT IS FALSE")
  return (
    <div>
      <Card>
        <CardImg
          src={
            props.aptData.imageURLs
              ? props.aptData.imageURLs[0]
              : "https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180"
          }
          alt="Card image cap"
        />
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
