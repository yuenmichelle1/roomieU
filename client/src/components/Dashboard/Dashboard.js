import React, { Component } from "react";
import { AuthConsumer } from "@hasura/react-check-auth";
import {Container} from "reactstrap";
import "./Dashboard.css";
import Home from "../Home";
import RoommateCardWrapper from "../RoommateCardWrapper";

class Dashboard extends Component {
    render() {
        return (
            <AuthConsumer>
                {(userInfo, isLoading, error) =>
                userInfo ? (
                    <Container>
                        <RoommateCardWrapper/>
                    </Container>
                ) : (
                    <Home />
                )
                }
            </AuthConsumer>
        );
    }
}

export default Dashboard;
