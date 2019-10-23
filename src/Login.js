/*all the required module for the app */
import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import JqxPasswordInput from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxpasswordinput';
import JqxInput, { IInputProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxinput';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css';
import JqxForm from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxform';
import JqxNotification from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification';
/* JQUERY IMPORT FOR AJAX */
import $ from 'jquery';

export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            status:false,
            template:
            [{
               
                type: 'text',
                label: 'Username',
                labelPosition: 'left',
                labelWidth: '30%',
                align: 'left',
                width: '80%',
                required: true,
                name:'Username'
            },
            {
                
                type: 'password',
                label: 'Password',
                labelPosition: 'left',
                labelWidth: '30%',
                align: 'left',
                width: '80%',
                required: true,
                name:'Password'
            },
            {
                name: 'submitButton',
                type: 'button',
                text: 'Login',
                align: 'center',
                
            }]
          
        
        }
    }
    //on login button clicked
    onButtonClick=(e)=>{
        e.preventDefault();
        let Username=this.refs.username.val();
        let Password=this.refs.password.val();
        if(Username==""){
            this.refs.notifyUsername.open();
        }
        else if(Password==""){
            this.refs.notifyPassword.open();
        }
        else{
            $.ajax({
                url: "http://localhost:8000/quiz-app/V1/validate",
                type: "POST",
                dataType:"json",
                data:{
                    username:Username,
                    password:Password
                },
                success: function (response) {
                  
                    if(response.status == "failed") {
                      this.refs.notify.open();
                    }
                    else {
                        this.refs.notifySuccess.open();
                        this.setState({status:true});
                    }
                    
                }.bind(this),
                error: function(response) {
                    this.refs.notify.open();
                }.bind(this)
                
            });
        }
        
    }
    componentDidMount(){
        this.refs.username.focus();
    }
    render() {
        
        return (
            <div>
            {this.state.status?<Redirect to='/dashboard' />:null}
            <JqxNotification ref="notifyUsername"
                    width={300} position={'top-right'} opacity={0.9} autoOpen={false}
                    autoClose={true} animationOpenDelay={800} autoCloseDelay={3000} template={'info'}>
                    <div>
                        Please enter username!
                    </div>
                </JqxNotification>
                <JqxNotification ref="notifyPassword"
                    width={300} position={'top-right'} opacity={0.9} autoOpen={false}
                    autoClose={true} animationOpenDelay={800} autoCloseDelay={3000} template={'info'}>
                    <div>
                        Please enter password!
                    </div>
                </JqxNotification >
                <JqxNotification ref="notify"
                    width={300} position={'top-right'} opacity={0.9} autoOpen={false}
                    autoClose={true} animationOpenDelay={800} autoCloseDelay={3000} template={'error'}>
                    <div>
                        Invalid Credentials!
                    </div>
                </JqxNotification >
                <JqxNotification ref="notifySuccess"
                    width={300} position={'top-right'} opacity={0.9} autoOpen={false}
                    autoClose={true} animationOpenDelay={800} autoCloseDelay={3000} template={'success'}>
                    <div>
                        Success
                    </div>
                </JqxNotification >
                <main className="login-form">
                    <div className="cotainer">
                        <div className="row justify-content-center">
                            <div className="main-card col-md-6">
                                <div bg="primary" className="card">
                                    <div  className="card-header">Admin Login</div>
                                    <div className="card-body">
                                        <Form className="myform" onSubmit={this.onButtonClick}>
                                            <div className="form-group row"></div>
                                            <div className="form-group row">
                                                <label htmlFor="username" className="col-md-5 col-form-label text-md-right">Username</label>
                                                <div className="col-md-6">
                                                    <JqxInput ref="username" id="username" width={"80%"} height={35} minLength={1} placeHolder={'Enter Username'} autoFocus/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="password" className="col-md-5 col-form-label text-md-right">Password</label>
                                                <div className="col-md-6">
                                                    <JqxPasswordInput ref="password" id="password" width={"80%"} height={35} placeHolder={'Enter Password'} />
                                                </div>
                                            </div>
                                            <div className="form-group row col-md-8 offset-md-8">
                                                <Button type="submit" className="btn btn-sm btn-primary">
                                                    Login
                                                </Button>
                                            </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </main>
                </div>
            
        )
    }
}
