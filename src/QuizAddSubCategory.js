import React, { Component } from 'react';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import JqxInput from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxinput';
import JqxDateTimeInput from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxdatetimeinput';
import JqxDropDownList from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxdropdownlist';
import JqxNumberInput from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxnumberinput';
import JqxTextArea from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtextarea';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css';
import JqxButtonGroup from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttongroup';
import "./main.css";
/* JQUERY IMPORT FOR AJAX */
import $ from 'jquery';
import JqxComboBox from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxcombobox';
export default class QuizAddSubCategory extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            togglemsg:false,
             msg:"",
             statusm:["Married","Unmarried"],
             Languages:['English','Hindi','Marathi'],
             PLanguages:['Python','C','C++','PHP','React JS','Node JS','Java','JavaScript','R']
        }
    }
    saveData=()=>{
        var obj={};
        obj.firstname=this.refs.Fname.val().trim();
        
        obj.lastname=this.refs.Lname.val().trim();
        var dt=this.refs.DOB.val().split('/');
        obj.DOB=dt[1]+'/'+dt[0]+'/'+dt[2];
        obj.email=this.refs.email.val().trim();
        obj.gender=this.refs.Gender.getSelection()==0?"Male":(this.refs.Gender.getSelection()==1?"Female":(this.refs.Gender.getSelection()==2?"Other":""));
        obj.address=this.refs.Address.val();
        var languagess=this.refs.languages.getSelectedItems();
        var languages=[]
        languagess.forEach(l => {
            languages=[...languages,l.label];
        });
        obj.languages=languages;
        var planguagess=this.refs.planguages.getCheckedItems();
        var planguages=[]
        planguagess.forEach(l => {
            planguages=[...planguages,l.label];
        });
        obj.planguages=planguages;
        obj.maritalstatus=this.refs.Mstatus.val();
        obj.experience=this.refs.Exp.val();
        obj.aadharcard=this.refs.Aadhar.val();
        obj.pancard=this.refs.Pcard.val();
        obj.currentloc=this.refs.Loc.val();
        obj.pincode=this.refs.Pincode.val();
        if(this.validateData(obj)){
            this.addData(obj);
            this.props.getData();
            this.props.closenotes();
        }
        this.refs.Gender.setSelection(obj.gender=="Male"?0:(obj.gender=="Female"?1:(obj.gender=="Other"?2:null)));
    }
    validateData(obj){
        if(obj.firstname == "") {
            this.setState({msg:"Please enter First name"})
            this.setState({togglemsg:true})
            return false;
        }
        else if(obj.lastname == "") {
            this.setState({msg:"Please enter Last name"})
            this.setState({togglemsg:true})
            return false;
        }
        else if(obj.email == "") {
            this.setState({msg:"Please enter Email"});
            this.setState({togglemsg:true})
            return false;
        } 
        else if (obj.email != "" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(obj.email))) {
                this.setState({msg:"Please enter a valid Email"});
                this.setState({togglemsg:true})
                return false; 
        }
        else if(obj.gender == "") {
            this.setState({msg:"Please select a gender"});
            this.setState({togglemsg:true})
            
            return false;
        }
        else if(obj.address == "") {
            this.setState({msg:"Please enter Address"});
            this.setState({togglemsg:true});
            return false;
        }
        else if(obj.DOB == "") {
            this.setState({msg:"Please enter a birth date"});
            this.setState({togglemsg:true})
            return false;
        } 
        
        else if(obj.aadharcard == "") {
            this.setState({msg:"Please enter a Adhar card number"});
            this.setState({togglemsg:true})
            return false;
        }
        else if(obj.pancard == "") {
            this.setState({msg:"Please enter a PAN card number"});
            this.setState({togglemsg:true})
            return false;
        }
        else if(obj.currentloc == "") {
            this.setState({msg:"Please enter a location"});
            this.setState({togglemsg:true})
            return false;
        }
        else if(obj.pincode == "") {
            this.setState({msg:"Please enter a Pincode"});
            this.setState({togglemsg:true})
            return false;
        } 
        else{
            this.setState({togglemsg:false})
            return true;
        }
    }
    addData = (rec)=>{
        $.ajax({
            url: "http://localhost:8000/insert",
            type: "POST",
            data:rec,
            dataType:"json",
            success: function (response) {
                
            }.bind(this)
        });
    }
    render() {
        return (
            <div className="add">
                <div className="carddiv ">
                <div className="card-body">
                <a onClick={this.props.closenote} className="closeb">
                                <span>&times;</span>
                        </a>
                    {this.state.togglemsg?<h3>{this.state.msg}</h3>:null}
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label  >Sub Category Name</label> 
                                </td>
                                <td>
                                    <JqxInput ref="Fname" width={180}  height={25} placeHolder={'Enter First Name'} /> 
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