/*all required modules for the component */
import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { MdCreate } from 'react-icons/md';
import Pagination from "react-js-pagination";
import JqxTree from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtree';
import JqxNotification from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification';
import { MdDelete } from 'react-icons/md';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Dialog from 'react-bootstrap-dialog'
/*required css */
import 'bootstrap/dist/css/bootstrap.min.css'
import "./main.css";
/* JQUERY IMPORT FOR AJAX */
import $ from 'jquery';

export default class QuizSubCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columnData: [{
                headerName: "SubCategoryName", field: "sub_category",width:530,sortable:true,checkboxSelection:true
              },{
                headerName: "Edit", field: "edit",editable:false,filter:false,width:50,cellRendererFramework: (params)=>{
                  this.setState({editcelldata:params.data})
                  
                  return(<center><a className="bttest" id={this.state.rowData.indexOf(params.data)} onClick={this.edit}><MdCreate/></a></center>)
                }
              },{
                headerName: "Delete",editable:false,filter:false, field: "delete",width:67,cellRendererFramework: (params)=>{
                  
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
            totalcount:null,
            data:[]
        }
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
        this.dialog.show({
          title: 'Add Sub Category',
          body: 'Sub Category Name',
          actions: [
            Dialog.CancelAction(),
            Dialog.OKAction((e) => {
              this.addCategory(e.promptInput.value);
              this.getData(this.state.category_id);
                if(this.state.totalcount%5==0)
                  this.handlePageChange(this.state.last_page+1);
                else{
                  this.handlePageChange(this.state.last_page)
                }
            })
          ],
          bsSize: 'small',
          prompt:Dialog.TextPrompt({ placeholder: 'Sub Category',required:true})
          
        })
        
      }
     
      searchdata =()=> {
       var obj={};
       obj.text=this.state.searchtext;
       obj.category_id=this.state.category_id;
       $.ajax({
        url: "http://localhost:8000/quiz-app/V1/admin/quiz/subcategories/search",
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
        }
        
    });
  
        
      }
      addCategory=(sub_category)=>{
        var category_id=this.state.category_id;
        $.ajax({
          url: "http://localhost:8000/quiz-app/V1/admin/quiz/subcategories/add",
          type: "POST",
          dataType:"json",
          data:{
            category_id,
            sub_category
          },
          success: function (response) {
            
              if(response.response_code == "200") {
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
      updateSubCategory=(id,category_id,sub_category)=>{
        $.ajax({
          url: "http://localhost:8000/quiz-app/V1/admin/quiz/subcategories/update",
          type: "PUT",
          dataType:"json",
          data:{
            id,
            sub_category
          },
          success: function (response) {
            
              if(response.response_code == "200") {
                //this.getData(category_id);
                this.refs.updatenoti.open();
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
          this.getData(this.state.category_id);
        }
      }
      handlePageChange=(pageNumber)=> {
        $.ajax({
          url: "http://localhost:8000/quiz-app/V1/admin/quiz/sub_categories/"+this.state.category_id+"?page="+pageNumber,
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
                 
              }
              
          }.bind(this),
          error: function(response) {
              console.log(response);
          
      }
    })
  }
    edit=(e)=>{
      let data=this.state.rowData[e.currentTarget.id];
      this.dialog.show({
        title: 'Update Sub Category',
        body: 'Sub Category Name',
        actions: [
          Dialog.CancelAction(),
          Dialog.OKAction((e) => {
            this.updateSubCategory(data.id,data.category_id,e.promptInput.value);
            this.handlePageChange(this.state.last_page)
            
          })
        ],
        bsSize: 'small', 
        prompt:Dialog.TextPrompt({initialValue:data.sub_category, placeholder: 'SubCategory',required:true})
        
      })
      }
        getData = (id)=>{
          $.ajax({
              url: "http://localhost:8000/quiz-app/V1/admin/quiz/sub_categories/"+id,
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
              }
              
          });
      }
      onCellValueChanged(params) {
        var id = params.data.id ;
        var category_id=params.data.category_id;
        var SubCategory_name = params.newValue;
        this.updateSubCategory(id,category_id,SubCategory_name);         
      }
      delete=(e)=>{
        var selected=this.state.rowData[e.currentTarget.id];
        this.dialog.show({
          title: 'Confirm Delete',
          body: 'If you delete this Sub category you will lose related all questions',
          actions: [
            Dialog.CancelAction(),
            Dialog.OKAction((e) => {
              $.ajax({
                  url: "http://localhost:8000/quiz-app/V1/admin/quiz/subcategories/delete/"+selected.id,
                  type: 'DELETE',
                  success: function (response) {
                    this.refs.deletenoti.open(); 
                    this.getData(this.state.category_id)
                    if(this.state.totalcount%5==1)
                      this.handlePageChange(this.state.last_page-1);
                    else{
                        this.handlePageChange(this.state.last_page)
                    } 
                  }.bind(this),
                  error: function(response) {
                      console.log(response);
                  }
                
                })
              
              })
          ],
          bsSize: 'small'
        });
        
    }
    onItemClick=(e)=>{
      this.getData(e.args.element.id);
      this.setState({category_id:e.args.element.id})
    }
    handleSubmit=(e)=>{
      e.preventDefault();
      this.searchdata();
    }
      render() {
          
          return (
              
              <div className="maindiv">
                  
                  <JqxNotification ref="addednoti"
                      width={300} position={'top-right'} opacity={1} autoOpen={false}
                      autoClose={true} animationOpenDelay={800} autoCloseDelay={3000} template={'success'}>
                      <div>
                          Successfully added Sub Category!
                      </div>
                  </JqxNotification>
                  <JqxNotification ref="deletenoti"
                      width={300} position={'top-right'} opacity={1} autoOpen={false}
                      autoClose={true} animationOpenDelay={800} autoCloseDelay={3000} template={'error'}>
                      <div>
                        Successfully deleted Sub Category!
                      </div>
                  </JqxNotification>    
                  <JqxNotification ref="updatenoti"
                      width={300} position={'top-right'} opacity={1} autoOpen={false}
                      autoClose={true} animationOpenDelay={800} autoCloseDelay={3000} template={'success'}>
                      <div>
                        Successfully updated Sub Category!
                      </div>
                  </JqxNotification>
                <div className="top">
                  <h1>Sub Categories</h1>
                </div>
                <div className="row">
                <Dialog  ref={(component) => { this.dialog = component }} />
                  <div className="col-sm-4">
                <JqxTree width={400} onItemClick={this.onItemClick} source={this.props.treeData} ></JqxTree></div>
                <div className="col">
                  <div style={{width:"80%",float:'right'}} className="ag-theme-balham">
                        <Navbar className="bg-dark justify-content-between">
                          <Nav className="mr-auto">
                              {this.state.category_id?<Button className="btn btn-info btn-sm"  onClick={this.toggleaddrec}>Add Sub Category</Button>:null}
                            </Nav>
                          <Form onSubmit={this.handleSubmit} inline>
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