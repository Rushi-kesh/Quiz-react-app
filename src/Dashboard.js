/*all required modules for the app*/
import React, { Component } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
import QuizQuestions from './QuizQuestions';
import QuizCategory from './QuizCategory';
import QuizSubCategory from './QuizSubCategory';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
/*all reuired css files for component*/
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material.css';
/*ajax jquery import */
import $ from 'jquery';
export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
             categoryData:[],
             data:[]
        }
    }
    
    onTabclick=(e)=>{
        if(e.args.item==1){
            this.getCategoryData();
        }
        else if(e.args.item==2){
            this.getAllData();
        }
    }
    getCategoryData=()=>{
        $.ajax({
            url: "http://localhost:8000/quiz-app/V1/admin/quiz/categories",
            type: "GET",
            dataType:"json",
            success: function (response) {
              
                if(response.code == "204") {
                  this.setState({rowData:[]});
                }
                else {
                    response.forEach(element => {
                        element.label=element.category;
                    });
                    this.setState({categoryData:response});
                    //var res=JSON.parse(response[0])
                    
                    //this.gridApi.setRowData(response);
                    //this.gridApi.redrawRows();
                   
                }
                
            }.bind(this),
            error: function(response) {
                console.log(response);
            }
            
        });
    }
    getAllData=()=>{
        $.ajax({
            url: "http://localhost:8000/quiz-app/V1/admin/quiz/allsubcategories",
            type: "GET",
            dataType:"json",
            success: function (response) {
              
                if(response.code == "204") {
                  this.setState({rowData:[]});
                }
                else {
                    
                    this.setState({data:response});
                    //var res=JSON.parse(response[0])
                    
                    //this.gridApi.setRowData(response);
                    //this.gridApi.redrawRows();
                   
                }
                
            }.bind(this),
            error: function(response) {
                console.log(response);
            }
            
        });
    }
    render() {
        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    
                        <Nav className="mr-auto">
                        <Navbar.Brand href="/">Home</Navbar.Brand>
                        </Nav>
                        <Form inline>
                            
                            <Nav.Link href="/">Logout</Nav.Link>
                        </Form>
                </Navbar>
                <JqxTabs  width={"100%"} scrollable={false} theme={'material'} onTabclick={this.onTabclick} >
                    <ul style={{ marginLeft: 10 }}>
                        <li>Categories</li>
                        <li>SubCategories</li>
                        <li>Questions</li>
                    </ul>
                    <div>
                        <QuizCategory />
                    </div>
                    <div>
                        <QuizSubCategory treeData={this.state.categoryData} />
                    </div>
                    <div>
                        <QuizQuestions treeData={this.state.data}/>
                    </div>
                </JqxTabs>
            </div>
        )
    }
}
