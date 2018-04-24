import React, { Component } from "react";
// import RoommateCard from "../RoommateCard";
import API from "../../utils/API";
import RoommateCard from "../RoommateCard/RoommateCard";
import { AuthConsumer } from "@hasura/react-check-auth";
import { CardGroup } from "reactstrap";
//neeeds to be a class because need to grab matches and display image cards;
class Dashboard extends Component {
  state = {
    users: []
  };
  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers() {
    API.getAllUsers()
      .then(res => {
        this.setState({ users: [...res.data] });
        console.log([...res.data].map(el => el.name));
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <AuthConsumer>
        <div>
          <h1> Potential Roommates That Best Suit You </h1>
          <CardGroup>
            {this.state.users.map(user => (
              <RoommateCard
                name={user.name}
                school={user.school}
                bio={user.bio}
              />
            ))}
          </CardGroup>
          <br />
          <br />
          <br />
          <br />
          <br />

          <h1> Roommates That You Like</h1>
          <br />
          <br />
          <br />
          <br />
          <CardGroup />

          <h1> Roommates That Like YOU </h1>
          <CardGroup />
        </div>
      </AuthConsumer>
    );
  }
}

export default Dashboard;
