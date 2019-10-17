import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AddCell from './QuizAddSubCategory.js';
import EditData from './QuizEditSubCategory.js';
import { MdCreate } from 'react-icons/md';
import Pagination from "react-js-pagination";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./main.css";
import JqxTree, { ITreeProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtree';
import JqxNotification from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification';
import { MdDelete } from 'react-icons/md';
/* JQUERY IMPORT FOR AJAX */
import $ from 'jquery';
export default class QuizSubCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columnData: [{
                headerName: "SubCategoryName", field: "sub_category",sortable:true,checkboxSelection:true
              },,{
                headerName: "SubCategory Description", field: "sub_category_desciption",sortable:true
              },{
                headerName: "Edit", field: "edit",editable:false,width:70,cellRendererFramework: (params)=>{
                  this.setState({editcelldata:params.data})
                  
                  return(<center><a className="bttest" id={this.state.rowData.indexOf(params.data)} onClick={this.edit}><MdCreate/></a></center>)
                }
              },{
                headerName: "Delete",editable:false, field: "delete",width:70,cellRendererFramework: (params)=>{
                  
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
            data:[]
        }
    }
    
    componentDidMount(){
        
        
        
      }
      onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    
        params.api.sizeColumnsToFit();
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
       // var text=this.refs.searchval.value();
       var obj={};
       obj.text=this.state.searchtext;
  
       $.ajax({
        url: "http://localhost:8000/search",
        type: "POST",
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
          url: "http://localhost:8000/employees?page="+pageNumber,
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
        getData = (id)=>{
          $.ajax({
              url: "http://localhost:8000/quiz-app/V1/admin/quiz/subcategories?Category_id="+id,
              type: "GET",
              dataType:"json",
              success: function (response) {
                
                  if(response.code == "204") {
                    this.setState({rowData:[]});
                  }
                  else {
                    
                      this.setState({rowData:response,
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
          
        var emp_id = params.data._id ;
        var field_name= params.colDef.field;
        var new_value = params.newValue;
        var empdata = {
            _id:emp_id,
            field_name:field_name,
            new_value:new_value            
        }
  
         var myJSON= JSON.stringify(empdata);
            
         $.ajax({
          url: "http://localhost:8000/updateField",
          type: "PUT",
          data: myJSON,contentType:"application/json",dataType:"json",
          success: function (response) {
            this.refs.updatenoti.open();
             
          }.bind(this),
          error: function(response) {
              console.log(response);
          }
      });
                    
      }
      delete=(e)=>{
        var selected=this.state.rowData[e.currentTarget.id];
        $.ajax({
            url: "http://localhost:8000/delete/"+selected._id,
            type: 'DELETE',
            success: function (response) {
              this.refs.deletenoti.open();
               
            }.bind(this),
            error: function(response) {
                console.log(response);
            }
            
        })
        this.gridApi.updateRowData({ remove: [selected]});
        this.gridApi.redrawRows();
    }
    onItemClick=(e)=>{
      this.getData(e.args.element.id);
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
                  <h1>Categories</h1>
                </div>
                <div className="row">
                  <div className="col">
                <JqxTree width={400} onItemClick={this.onItemClick} source={this.props.treeData} ></JqxTree></div>
                <div className="col">
                  {this.state.toggleedit?<EditData data={this.state.editcelldata} edit={this.edittogg} edits={this.edits} getData={this.getData}/>: null}
                 {this.state.toggleadd?<AddCell addnote={this.addData} closenote={this.toggleaddrec} closenotes={this.toggleaddrecs} getData={this.getData} /> : null}
                  <div style={{width:"100%",float:'right'}}
                      className="ag-theme-balham">
                      
                        <div className="search">
                        <span className="form-inline">
                        <button className="btn btn-info btn-sm" onClick={this.toggleaddrec}>Add SubCategory</button>
                        
                        <input className="form-control form-control-sm ml-4 w-25" ref="searchval" value={this.state.searchtext} onChange={this.handletext} type="text" id="filter-text" placeholder="Search SubCategory" />
                          <button className="btn btn-info btn-sm" onClick={this.searchdata}>Search</button>
                          </span>
                        </div>
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