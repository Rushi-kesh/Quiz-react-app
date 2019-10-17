import React, { Component } from 'react'
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import JqxInput from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxinput';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css';

/* JQUERY IMPORT FOR AJAX */
import $ from 'jquery';

export default class QuizEditCategory extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            statusm:["Married","Unmarried"],
            Languages:['English','Hindi','Marathi'],
            PLanguages:['Python','C','C++','PHP','React JS','Node JS','Java','JavaScript','R']
        }
    }
    componentDidMount(){
    } 
        
    saveData=()=>{
        var obj={};
        obj.id=this.props.data.id;
        obj.firstname=this.refs.Cat.val().trim();
        this.addData(obj);
        this.props.getData();
        this.props.edits();
        
    }
    addData = (rec)=>{
        $.ajax({
            url: "http://localhost:8000/update",
            type: "PUT",
            data:rec,
            dataType:"json",
            success: function (response) {
                
                
            }.bind(this)
        });
    }
    render() {
        
        return (
            <div className="add">
                
                <div className="carddiv">
                
                <div className="card-body">
                <a onClick={this.props.edit} className="closeb">
                                <span>&times;</span>
                        </a>
                    {this.state.togglemsg?<h2>Please enter Title!!</h2>:null}
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label  >Category Name</label> 
                                </td>
                                <td>
                                    <JqxInput ref="Cat" width={180}  height={25} value={this.props.data.category} placeHolder={'Enter First Name'} /> 
                                </td>
                            </tr>
                           
                        </tbody>
                    </table>      
                     <hr/>
                    <button className="button2" onClick={this.saveData}>Save</button> 
                    </div>
                </div> 
            </div>
        )
    }
}