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
                                    <label  >First Name</label> 
                                </td>
                                <td>
                                    <JqxInput ref="Fname" width={180}  height={25} placeHolder={'Enter First Name'} /> 
                                </td>
                                <td>
                                    <label  >Last Name</label> 
                                </td>
                                <td>
                                    <JqxInput ref="Lname" width={180}  height={25} placeHolder={'Enter Last Name'} /> 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label  >Date of Birth</label> 
                                </td>
                                <td>
                                    <JqxDateTimeInput ref="DOB" width={180} height={25} max={new Date()}/>
                                </td>
                                <td>
                                    <label  >Email</label> 
                                </td>
                                <td>
                                <JqxInput ref="email" width={180}  height={25} placeHolder={'Enter Email ID'} /> 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label  >Gender</label> 
                                </td>
                                <td>
                                    <JqxButtonGroup ref="Gender" mode={'radio'}>
                                        <button  id='Male' value='Male'></button>
                                        <button  id='Female' value='Female'></button>
                                        <button  id='Other' value='Other'></button>
                                    </JqxButtonGroup> 
                                </td>
                                <td>
                                    <label  >Address</label> 
                                </td>
                                <td>
                                    <JqxTextArea ref="Address" width={180} height={50} placeHolder={'Enter Address'} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Language's
                                </td>
                                <td>
                                    <JqxComboBox ref='languages' style={{ marginTop: 5 }} width={180} height={25} source={this.state.Languages} multiSelect={true} dropDownHeight={130} selectedIndex={0}/>
                                </td>
                                <td>
                                    Programming Language's
                                </td>
                                <td>
                                    <JqxComboBox ref='planguages' style={{ marginTop: 5 }} width={180} height={25} checkboxes={true} source={this.state.PLanguages} multiSelect={true} dropDownHeight={130} selectedIndex={0}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label  >Marital Status</label> 
                                </td>
                                <td>
                                    <JqxDropDownList ref="Mstatus" width={180}  source={this.state.statusm} selectedIndex={1} />
                                </td>
                                <td>
                                    <label  >Experience(in Months)</label> 
                                </td>
                                <td>
                                    <JqxNumberInput ref="Exp" width={180} height={25} textAlign={'left'} inputMode={'simple'} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label  >Aadhar Card</label> 
                                </td>
                                <td>
                                    <JqxInput ref="Aadhar" width={180}  height={25} placeHolder={'Enter Aadhar Card number'} /> 
                                </td>
                                <td>
                                    <label  >PAN Card</label> 
                                </td>
                                <td>
                                <JqxInput ref="Pcard" width={180}  height={25} placeHolder={'Enter PAN Card number'} />   
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label  >Current Location</label> 
                                </td>
                                <td>
                                    <JqxInput ref="Loc" width={180}  height={25} placeHolder={'Enter Current Location'} /> 
                                </td>
                                <td>
                                    <label  >Pin Code</label> 
                                </td>
                                <td>
                                    <JqxInput ref="Pincode" width={180}  height={25} placeHolder={'Enter Pincode'} />   
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