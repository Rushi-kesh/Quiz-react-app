import React, { Component } from 'react'
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css';
import JqxForm from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxform';
export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            template:
            [{
                bind: 'textBoxValue',
                type: 'text',
                label: 'User Name',
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
    
    render() {
        return (
            <div className="Login">
                <h3>Admin Login</h3>
                <div className="form-jqx">
                <JqxForm  style={{ width: "100%" }}
                    template={this.state.template}  backgroundColor={'rgb(48, 51, 226)'}
                />
                </div>
            </div>
        )
    }
}
