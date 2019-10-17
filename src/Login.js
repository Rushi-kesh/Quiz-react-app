import React, { Component } from 'react'
import {Redirect,Link} from 'react-router-dom';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css';
import JqxForm from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxform';
export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            status:false,
            template:
            [{
                bind: 'textBoxValue',
                type: 'text',
                label: 'Username',
                labelPosition: 'left',
                labelWidth: '30%',
                align: 'left',
                width: '80%',
                required: true
            },
            {
                bind: 'passwordBoxValue',
                type: 'password',
                label: 'Password',
                labelPosition: 'left',
                labelWidth: '30%',
                align: 'left',
                width: '80%',
                required: true
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
        this.setState({status:true})
        console.log("sbjdsdbjs")
    }
    render() {
        
        return (
            <div>
            {this.state.status?<Redirect to='/dashboard' />:null}
            <div className="Login">
                <h3>Admin Login</h3>
                <div className="form-jqx">
                <JqxForm onButtonClick={this.onButtonClick} style={{ width: "100%" }}
                    template={this.state.template}  backgroundColor={'rgb(48, 51, 226)'}
                />
                </div>
            </div>
            </div>
        )
    }
}
