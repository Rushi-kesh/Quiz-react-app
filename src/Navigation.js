import React, { Component } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Login from './Login';
import Quizes from './Quizes';
import NavBar from './NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
export default class Navigation extends Component {
    render() {
        return (
            <div>
                <Tabs className="Tabview" defaultActiveKey="login" id="uncontrolled-tab-example">
                    <Tab eventKey="login" title="Login">
                       <Login />
                    </Tab>
                    <Tab eventKey="quiz" title="Quizes">
                       <Quizes />
                    </Tab>
                    <Tab eventKey="leaderboard" title="Leaderboard">
                      <h1>Hii all</h1>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}
