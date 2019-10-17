import React, { Component } from 'react';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.energyblue.css';
import $ from 'jquery';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
import QuizQuestions from './QuizQuestions';
import QuizCategory from './QuizCategory';
import QuizSubCategory from './QuizSubCategory';
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
                <JqxTabs  width={"100%"} scrollable={false}  onTabclick={this.onTabclick} >
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
