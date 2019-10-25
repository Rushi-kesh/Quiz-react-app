/*all the required module for the component */
import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { MdCreate } from 'react-icons/md';
import Pagination from "react-js-pagination";
import JqxNotification from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification';
import { MdDelete } from 'react-icons/md';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Dialog from 'react-bootstrap-dialog';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material.css';
import JqxLoader from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxloader';
/*all css files requied by the component */
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "./main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
/* JQUERY IMPORT FOR AJAX */
import $ from 'jquery';

export default class QuizCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columnData: [{
                headerName: "Category Name", width:367,field: "category",sortable:true,checkboxSelection:true
              },{
                headerName: "Edit", field: "edit",editable:false,width:50,cellRendererFramework: (params)=>{
                  this.setState({editcelldata:params.data})
                  
                  return(<center><a className="bttest" id={this.state.rowData.indexOf(params.data)} onClick={this.edit}><MdCreate/></a></center>)
                }
              },{
                headerName: "Delete",editable:false, field: "delete",width:64,cellRendererFramework: (params)=>{
                  
                  return(<center><a className="bttest" id={this.state.rowData.indexOf(params.data)} onClick={this.delete}><MdDelete/></a></center>)
                }
              }],
            rowData:[],
            editcelldata:null,
            defaultColDef: {
              sortable: true,
              resizable: true,
              filter:true,
              editable:true
            },
            searchtext:"",
            activepage:1,
            totalcount:null
        }
    }
      // component is mounted this function is invoked
      componentDidMount(){
          this.getData();
      }
      //these are properties of ag grid to scale accorfing to size of window
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
      //on click of add button this function invoke
      toggleaddrec=()=>{
        this.dialog.show({
          title: 'Add Category',
          body: 'Category Name',
          actions: [
            Dialog.CancelAction(),
            Dialog.OKAction((e) => {
              this.addCategory(e.promptInput.value)
            })
          ],
          bsSize: 'small',
          prompt:Dialog.TextPrompt({ placeholder: 'Category',required:true})
          
        })
      }
      //on click of search button
      searchdata =()=> {
        var obj={};
        obj.text=this.state.searchtext;
        $.ajax({
            url: "http://localhost:8000/quiz-app/V1/admin/quiz/categories/search",
            type: "GET",
            data:obj,
            dataType:"json",
            success: function (response) {
                if(response.code == "204") {
                  this.setState({rowData:[]});
                }
                else {
                    this.setState({rowData:response});
                }
            }.bind(this),
            error: function(response) {
                console.log(response);
            }.bind(this)
          }); 
      }
      handletext=(e)=>{
        this.setState({searchtext:e.target.value})
        if(e.target.value==""){
          this.getData();
        }
      }
      //on page changed this function gets called
      handlePageChange=(pageNumber)=> {
        this.setState({activepage:pageNumber});
        $.ajax({
          url: "http://localhost:8000/quiz-app/V1/admin/quiz/allcategories?page="+pageNumber,
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
          
        }.bind(this)
      })
    }
      //on click edit this function get called
      edit=(e)=>{
        let data=this.state.rowData[e.currentTarget.id];
        this.dialog.show({
          title: 'Update Category',
          body: 'Category Name',
          actions: [
            Dialog.CancelAction(),
            Dialog.OKAction((e) => {
              this.updateCategory(data.id,e.promptInput.value)
            })
          ],
          bsSize: 'small', 
          prompt:Dialog.TextPrompt({initialValue:data.category, placeholder: 'Category',required:true})
          
        })
           
        }
        //to get all categories data
        getData = ()=>{
          $.ajax({
              url: "http://localhost:8000/quiz-app/V1/admin/quiz/allcategories",
              type: "GET",
              dataType:"json",
              success: function (response) {
                  if(response.code == "204") {
                    this.setState({rowData:[]});
                  }
                  else {
                      this.setState({rowData:response.data,
                        totalcount:response.total,last_page:response.last_page});
                     
                  }
                  
              }.bind(this),
              error: function(response) {
                  console.log(response);
              }.bind(this)
              
          });
      }
      //on cell value is changed thorough grid
      onCellValueChanged(params) {
        var id = params.data.id ;
        var Category_name = params.newValue;
        this.updateCategory(id,Category_name);         
      }
      //function used to add data 
      addCategory=(Category_name)=>{
        $.ajax({
          url: "http://localhost:8000/quiz-app/V1/admin/quiz/categories/add",
          type: "POST",
          dataType:"json",
          data:{
            Category_name
          },
          success: function (response) {
            
              if(response.response_code == "200") {
                this.getData()
                if(this.state.totalcount%5==0)
                  this.handlePageChange(this.state.last_page+1);
                else{
                  this.handlePageChange(this.state.last_page)
                }
                this.refs.addednoti.open();

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
          }.bind(this)
          
      });
      }
      //function used to update changes in data
      updateCategory=(id,Category_name)=>{
        $.ajax({
          url: "http://localhost:8000/quiz-app/V1/admin/quiz/categories/update",
          type: "PUT",
          dataType:"json",
          data:{
            id,
            Category_name
          },
          success: function (response) {
            
              if(response.response_code == "200") {
                //this.getData()
                if(this.state.totalcount%5==0)
                  this.handlePageChange(this.state.last_page+1);
                else{
                  this.handlePageChange(this.state.last_page)
                }
                this.refs.updatenoti.open();
              }
              
          }.bind(this),
          error: function(response) {
              console.log(response);
          }.bind(this)
          
      });
      }
      delete=(e)=>{
        var selected=this.state.rowData[e.currentTarget.id];
        this.dialog.show({
          title: 'Confirm Delete',
          body: 'If you delete this category you will lose related subcategory and all questions',
          actions: [
            Dialog.CancelAction(),
            Dialog.OKAction((e) => {
              $.ajax({
                  url: "http://localhost:8000/quiz-app/V1/admin/quiz/categories/delete/"+selected.id,
                  type: 'DELETE',
                  success: function (response) {
                    this.refs.deletenoti.open();  
                  }.bind(this),
                  error: function(response) {
                      console.log(response);
                  }.bind(this)
                
                })
              this.gridApi.updateRowData({ remove: [selected]});
              this.gridApi.redrawRows();
              })
          ],
          bsSize: 'small'
        });
        
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.searchdata();
    }
    deleteData=()=>{
      const selectedNodes = this.gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map( node => node.data );
      $.ajax({
        url: "http://localhost:8000/quiz-app/V1/admin/quiz/categories/delete",
        type: 'DELETE',
        data:{
          data:selectedData
        },
        success: function (response) {
          this.refs.deletenoti.open(); 
          this.handlePageChange(this.state.activepage) 
        }.bind(this),
        error: function(response) {
            console.log(response);
        }.bind(this)
      
      })
    this.gridApi.updateRowData({ remove: selectedData});
    this.gridApi.redrawRows();
    
    }
      render() {
          
          return (
              
              <div className="maindiv">
                  <JqxNotification ref="addednoti"
                      width={300} position={'top-right'} opacity={1} autoOpen={false}
                      autoClose={true} animationOpenDelay={800} autoCloseDelay={3000} template={'success'}>
                      <div>
                          Successfully added Category!
                      </div>
                  </JqxNotification>
                  <JqxNotification ref="deletenoti"
                      width={300} position={'top-right'} opacity={1} autoOpen={false}
                      autoClose={true} theme="material" animationOpenDelay={800} autoCloseDelay={3000} template={'error'}>
                      <div>
                        Successfully deleted Category!
                      </div>
                  </JqxNotification>
                  <JqxNotification ref="updatenoti"
                      width={300} position={'top-right'} opacity={1} autoOpen={false}
                      autoClose={true} animationOpenDelay={800} autoCloseDelay={3000} template={'success'}>
                      <div>
                        Successfully updated Category!
                      </div>
                  </JqxNotification>
                  <JqxLoader ref="loader"
                    width={100} height={60} imagePosition={'top'} theme={'material'} isModal={true} />
                <div className="top">
                  <h1>Categories</h1>
                </div >
                <div className="row">
                    <div className="col-sm-2">
                    </div>
                    <div className="col-sm-1">
                    </div>
                    <div className="col">
                      <Dialog  ref={(component) => { this.dialog = component }} /> 
                      <div style={{width:"100%"}} className="ag-theme-balham">
                          <Navbar className="bg-dark justify-content-between">
                            <Nav className="mr-auto">
                                <Button className="btn btn-info btn-sm"  onClick={this.toggleaddrec}>Add Category</Button>
                              </Nav>
                            <Form onSubmit={this.handleSubmit} inline>
                            <Button className="btn btn-info btn-sm mr-sm-2" onClick={this.deleteData}><MdDelete/></Button>
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
                          </div>
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
                    <div className="col-sm-1"></div>
                    <div className="col-sm-2"></div>
                  </div>
                    
              </div>
             
          )
      }
  }