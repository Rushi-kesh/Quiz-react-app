import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import $ from 'jquery';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import JqxTree from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtree';
export default class Quizes extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:[],
            start:false,
            category_id:null,
            subcategory_id:null,
            redirect:false
        }
    }
    componentDidMount(){
        this.getData();
    }
    getData=()=>{
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
                }
                
            }.bind(this),
            error: function(response) {
                console.log(response);
            }
            
        });
    }
    onItemClick=(e)=> {
        if(e.args.element.id.length==3){
            this.setState({id:e.args.element.id})
            this.setState({start:true})
            this.setState({text:e.args.element.innerText});
        }
        else{
            this.setState({start:false})
        }
        
      }
    startQuiz=()=>{
        var ids=this.state.id.split('-');
        this.setState({category_id:ids[0]})
        this.setState({subcategory_id:ids[1]})
        this.setState({redirect:true})
    }
    render() {

        return (
            <div>
                {this.state.redirect?
                    <Redirect to={{
                        pathname: '/quiz',
                        state: { category_id: this.state.category_id,subcategory_id:this.state.subcategory_id, text:this.state.text }
                    }}
                    />:null}
            <div className="row">
                <div className="col">
                    <JqxTree width={400} onItemClick={this.onItemClick} source={this.state.data} ></JqxTree>
                </div>
                <div className="col">
                {this.state.start?<button onClick={this.startQuiz}>START QUIZ</button>:<h3>Please select category of Quizes</h3>}
                </div>
            </div>
            </div>
        )
    }
}
