import React, { Component } from "react";
// import RoommateCard from "../RoommateCard";
import API from "../../utils/API";
import RoommateCard from "../RoommateCard/RoommateCard";
import { AuthConsumer } from "@hasura/react-check-auth";
import { CardColumns } from "reactstrap";
import "./Dashboard.css";
import Home from "../Home";
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
        {(userInfo, isLoading, error) =>
          userInfo ? (
            <div className="container">
              <div className="row">
                <h1> Potential Roommates That Best Suit You </h1>
                <CardColumns className="row">
                  {this.state.users.map(user => (
                    <RoommateCard
                      photo={user.photo}
                      name={user.name}
                      school={user.school}
                      bio={user.bio}
                    />
                  ))}
                </CardColumns>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="row">
                <h1> Roommates That You Like</h1>
                <br />
                <br />
                <br />
                <br />
                <CardColumns />
              </div>
              <div className="row">
                <h1> Roommates That Like YOU </h1>
                <CardColumns />
              </div>
            </div>
          ) : (
            <Home />
          )
        }
      </AuthConsumer>
    );
  }
}

export default Dashboard;
