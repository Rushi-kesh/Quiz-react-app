import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch , browserHistory } from 'react-router-dom';
import Dashboard from './Dashboard';
import Navigation from './Navigation';
export default class App extends Component {
    render() {
        return (
            <div>
                <Router history={browserHistory}>  
                    <Switch>
                        <Route exact path="/" component={Navigation} />
                        <Route exact path="/dashboard" component={Dashboard} />   
                        <Route exact path="/quiz" component={Dashboard} />    
                    </Switch>
                </Router>
            </div>
        )
    }
}
