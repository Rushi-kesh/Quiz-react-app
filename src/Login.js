import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css';
import JqxForm from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxform';
import $ from 'jquery';
import JqxNotification from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification';
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
    onButtonClick=(e)=>{
        //this.setState({status:true})
        let Username=this.refs.myform.getComponentByName('Username').val();
        let Password=this.refs.myform.getComponentByName('Password').val();
        if(Username==""){
            this.refs.notifyUsername.open();
        }
        else if(Password==""){
            this.refs.notifyPassword.open();
        }
        else{
            $.ajax({
                url: "http://localhost:8000/quiz-app/V1/validate?username="+Username+"&password="+Password,
                type: "GET",
                dataType:"json",
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
    render() {
        
        return (
            <div>
            {this.state.status?<Redirect to='/dashboard' />:null}
            
            <div id="container" className="Login">
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
                <h3 style={{color:'white'}}>Admin Login</h3>
                <div className="form-jqx">
                <JqxForm ref="myform" onFormDataChange onButtonClick={this.onButtonClick} style={{ width: "100%" }}
                    template={this.state.template}  backgroundColor={'rgb(48, 51, 226)'}
                />
                </div>
            </div>
            </div>
        )
    }
}
