import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AddCell from './QuizAddQuestions.js';
import EditData from './QuizEditQuestions';
import { MdCreate } from 'react-icons/md';
import Pagination from "react-js-pagination";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./main.css";
import JqxTree from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtree';
import JqxNotification from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification';
import { MdDelete } from 'react-icons/md';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
/* JQUERY IMPORT FOR AJAX */
import $ from 'jquery';
export default class QuizQuestions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columnData: [{
                headerName: "Question", field: "question",sortable:true,checkboxSelection:true
              },{
                headerName: "Correct Answer", field: "correct_answer",sortable:true
              },{
                headerName: "Answer1", field: "answer1",sortable:true
              },{
                headerName: "Answer2", field: "answer2",sortable:true
              },{
                headerName: "Answer3", field: "answer3",sortable:true
              },{
                headerName: "Edit", field: "edit",editable:false,filter:false,width:70,cellRendererFramework: (params)=>{
                  this.setState({editcelldata:params.data})
                  
                  return(<center><a className="bttest" id={this.state.rowData.indexOf(params.data)} onClick={this.edit}><MdCreate/></a></center>)
                }
              },{
                headerName: "Delete",editable:false, field: "delete",filter:false,width:70,cellRendererFramework: (params)=>{
                  
                  return(<center><a className="bttest" id={this.state.rowData.indexOf(params.data)} onClick={this.delete}><MdDelete/></a></center>)
                }
              }],
             rowData:[],
            toggleadd:false,
            toggleedit:false,
            editcelldata:null,
            defaultColDef: {
              sortable: true,
              resizable: true,
              filter:true,
              editable:true
            },
            searchtext:"",
            activepage:1,
            totalcount:null,
            data:[
            ]
        }
    }
    
    componentDidMount(){

       
        
      }
      onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    
       
        window.addEventListener("resize", function() {
          setTimeout(function() {
            params.api.sizeColumnsToFit();
          });
        });
    
        params.api.sizeColumnsToFit();
      };
    
      toggleaddrec=()=>{
        this.setState({toggleadd:!this.state.toggleadd});
        
      }
      toggleaddrecs=()=>{
        this.refs.addednoti.open();
        this.setState({toggleadd:!this.state.toggleadd});
        
      }
      searchdata =()=> {
        var obj={};
        obj.text=this.state.searchtext;
        obj.category_id=this.state.cat_id;
        obj.sub_category_id=this.state.subCat_id;
        $.ajax({
         url: "http://localhost:8000/quiz-app/V1/admin/quiz/questions/search",
         type: "GET",
         data:obj,
         dataType:"json",
         success: function (response) {
             if(response.code == "204") {
               this.setState({rowData:[]});
             }
             else {
                 this.setState({rowData:response});
                 //this.gridApi.setRowData(response);
                 //this.gridApi.redrawRows();
                
             }
             
         }.bind(this),
         error: function(response) {
             console.log(response);
         }
         
     });
  
        
      }
      handletext=(e)=>{
        this.setState({searchtext:e.target.value})
        if(e.target.value==""){
          this.getData();
        }
      }
      handlePageChange=(pageNumber)=> {
        $.ajax({
          url: "http://localhost:8000/quiz-app/V1/admin/quiz/allQuestions?Category_id="+this.state.cat_id+"&SubCategory_id="+this.state.subCat_id+"&page="+pageNumber,
          type: "GET",
          dataType:"json",
          success: function (response) {
              if(response.code == "204") {
                this.setState({rowData:[]});
              
              }
              else {
                
                  this.setState({rowData:response.data,
                    totalcount:response.total,
                  activePage:response.current_page});
                 
                  //this.gridApi.setRowData(response);
                  //this.gridApi.redrawRows();
                 
              }
              
          }.bind(this),
          error: function(response) {
              console.log(response);
          
      }
    })
  }
      edit=(e)=>{
        this.setState({editcelldata:this.state.rowData[e.currentTarget.id]});
            this.setState({toggleedit:!this.state.toggleedit})
        }
        edits=(e)=>{
              this.refs.updatenoti.open();
              this.setState({toggleedit:!this.state.toggleedit})
          }
        edittogg=()=>{
          this.setState({toggleedit:!this.state.toggleedit})
        }
        getData = ()=>{
          $.ajax({
              url: "http://localhost:8000/quiz-app/V1/admin/quiz/allQuestions?Category_id="+this.state.cat_id+"&SubCategory_id="+this.state.subCat_id,
              type: "GET",
              dataType:"json",
              success: function (response) {
                
                  if(response.code == "204") {
                    this.setState({rowData:[]});
                  }
                  else {
                    
                      this.setState({rowData:response.data,
                        totalcount:response.total});
                      //this.gridApi.setRowData(response);
                      //this.gridApi.redrawRows();
                     
                  }
                  
              }.bind(this),
              error: function(response) {
                  console.log(response);
              }
              
          });
      }
      onCellValueChanged(params) {
        var id = params.data.id ;
        var field_name= params.colDef.field;
        var new_value = params.newValue;
        var obj = {
            id,
            data:{
              [field_name]:new_value
            }           
        }
            
        $.ajax({
          url: "http://localhost:8000/quiz-app/V1/admin/quiz/questions/update",
          type: "PUT",
          dataType:"json",
          data:obj,
          success: function (response) {
            
              if(response.response_code == "200") {
                this.getData();
                this.refs.updatenoti.open();
  
              }
              else {
                 
              }
              
          }.bind(this),
          error: function(response) {
              console.log(response);
          }
          
      });
                    
      }
      delete=(e)=>{
        var selected=this.state.rowData[e.currentTarget.id];
        $.ajax({
          url: "http://localhost:8000/quiz-app/V1/admin/quiz/questions/delete/"+selected.id,
          type: 'DELETE',
          success: function (response) {
            if(response.response_code="200")
            {
              this.refs.deletenoti.open();
              this.getData();
            }
          }.bind(this),
          error: function(response) {
              console.log(response);
          }
        
        })
        
    }
    onItemClick=(e)=>{
        if(e.args.element.id.length!=1){
            var ids=e.args.element.id.split('-');
            this.setState({cat_id:ids[0],subCat_id:ids[1]});
            this.getData()
        }
    }
    addData=(data)=>{
      var category_id=this.state.cat_id;
      var sub_category_id=this.state.subCat_id;
      var {question,answer1,answer2,answer3,correct_answer}=data;
      var obj={
        category_id,
        sub_category_id,
        question,
        answer1,
        answer2,
        answer3,
        correct_answer
      }
      $.ajax({
        url: "http://localhost:8000/quiz-app/V1/admin/quiz/questions/add",
        type: "POST",
        dataType:"json",
        data:obj,
        success: function (response) {
          
            if(response.response_code == "200") {
              this.getData();
              this.refs.addednoti.open();

            }
            else {
               
            }
            
        }.bind(this),
        error: function(response) {
            console.log(response);
        }
        
    });
    }
    updateData=(data)=>{
      var id=this.state.editcelldata.id;
      var obj={
        id,
        data
      }
      $.ajax({
        url: "http://localhost:8000/quiz-app/V1/admin/quiz/questions/update",
        type: "PUT",
        dataType:"json",
        data:obj,
        success: function (response) {
          
            if(response.response_code == "200") {
              this.getData();
              this.refs.updatenoti.open();

            }
            else {
               
            }
            
        }.bind(this),
        error: function(response) {
            console.log(response);
        }
        
    });
    }
      render() {
          
          return (
              
              <div className="maindiv">
  
                  <JqxNotification ref="addednoti"
                      width={300} position={'bottom-right'} opacity={1} autoOpen={false}
                      autoClose={true} animationOpenDelay={800} autoCloseDelay={3000} template={'success'}>
                      <div>
                          Successfully added Category!
                      </div>
                  </JqxNotification>
                  <JqxNotification ref="deletenoti"
                      width={300} position={'bottom-right'} opacity={1} autoOpen={false}
                      autoClose={true} animationOpenDelay={800} autoCloseDelay={3000} template={'error'}>
                      <div>
                        Successfully deleted Category!
                      </div>
                  </JqxNotification>
                  <JqxNotification ref="updatenoti"
                      width={300} position={'bottom-right'} opacity={1} autoOpen={false}
                      autoClose={true} animationOpenDelay={800} autoCloseDelay={3000} template={'success'}>
                      <div>
                        Successfully updated Category!
                      </div>
                  </JqxNotification>
                <div className="top">
                  <h1>Questions</h1>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                <JqxTree width={400} onItemClick={this.onItemClick} source={this.props.treeData} ></JqxTree></div>
                <div className="col">
                {this.state.toggleedit?<EditData data={this.state.editcelldata} modal={this.state.toggleedit} edit={this.edittogg} updateData={this.updateData} getData={this.getData}/>:null}
                 <AddCell toggle={this.state.toggleadd} addData={this.addData} modal={this.toggleaddrec} closenotes={this.toggleaddrecs} getData={this.getData} /> 
                  <div style={{width:"100%"}}  className="ag-theme-balham">
                      <Navbar className="bg-dark justify-content-between">
                          <Nav className="mr-auto">
                          {this.state.subCat_id?<Button className="btn btn-info btn-sm"  onClick={this.toggleaddrec}>Add Question</Button>:null}
                            </Nav>
                          <Form inline>
                            <FormControl type="text" placeholder="Search" className=" mr-sm-2" size='sm'  value={this.state.searchtext} onChange={this.handletext} />
                            <Button className="btn btn-info btn-sm" onClick={this.searchdata}>Search</Button>
                          </Form>
                          </Navbar>
                        <div style={{height:"200px"}}>
                      <AgGridReact
                          rowSelection="multiple"
                          enableSorting={false}
                          rowDragManaged={true}
                          onGridReady={this.onGridReady}
                          columnDefs={this.state.columnData}
                          rowData={this.state.rowData}
                          defaultColDef={this.state.defaultColDef}
                          animateRows={true}
                          onCellValueChanged={this.onCellValueChanged.bind(this)}
                          >
                      </AgGridReact>
                      <div className="pagination">
                        <Pagination
                          activePage={this.state.activePage}
                          itemsCountPerPage={5}
                          totalItemsCount={this.state.totalcount}
                          pageRangeDisplayed={5}
                          onChange={this.handlePageChange}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      </div>
                      </div>
                      </div>
                    </div>
                  </div>
              </div>
          )
      }
  }