import React, { Component } from 'react'
import Answers from './Answers.jsx';
import Popup from './Popup.jsx';
import './styles.css'
/* JQUERY IMPORT FOR AJAX */
import $ from 'jquery';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material.css';
import JqxLoader from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxloader';
export default class QuizStart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            count: 0,
            total: 0,
            showButton: false,
            questionAnswered: false,
            score: 0,
            displayPopup: 'flex',
            data:[],
            flag:false
        }
    }
    componentDidMount(){
        
        var category_id=this.props.location.state.category_id;
        var subcategory_id=this.props.location.state.subcategory_id;
        this.refs.loader.open();
         this.getQuizData(category_id,subcategory_id);
         
        
    }
    getQuizData=(category_id,subcategory_id)=>{
        
        $.ajax({
            url: "http://localhost:8000/quiz-app/V1/admin/quiz/questions?Category_id="+category_id+"&SubCategory_id="+subcategory_id,
            type: "GET",
            dataType:"json",
            success: function (response) {
              
                if(response ==[]) {
                  this.setState({data:[]});
                  this.setState({flag:false})
                    this.refs.loader.close();
                }
                else {
                    this.setState({data:response,total:response.length});
                    this.insertData(this.state.count);
                    this.setState({flag:true})
                    this.refs.loader.close();
                }
            }.bind(this),
            error: function(response) {
                console.log(response);
            }
        });
    }
    insertData=(count)=> {
       
        this.setState({
            question: this.state.data[count].question,
            answers: [  this.state.data[count].answers[0], 
                        this.state.data[count].answers[1], 
                        this.state.data[count].answers[2], 
                        this.state.data[count].answers[3] 
                    ],
            correct: this.state.data[count].correct,
            count: this.state.count + 1
        });
    }
    handleShowButton=()=> {
        this.setState({
            showButton: true,
            questionAnswered: true
        })
    }
    nextQuestion=()=> {
        let {count, total} = this.state;

        if(count === total){
            this.setState({
                displayPopup: 'flex'
            });
        } else {
            this.insertData(count);
            this.setState({
                showButton: false,
                questionAnswered: false
            });
        }
    }
    handleStartQuiz=()=>{
        this.setState({
            displayPopup: 'none',
            count: 1
        });
    }
    handleIncreaseScore=()=> {
        this.setState({
            score: this.state.score + 1
        });
    }
    render() {
      
        let { count, total, question, answers, correct, showButton, questionAnswered, displayPopup, score} = this.state
        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Nav className="mr-auto">
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    </Nav>
                </Navbar>
                <JqxLoader ref="loader"
                    width={100} height={60} imagePosition={'top'} theme={'material'} isModal={true} />
                {
                this.state.flag?
                <div className="container">
                     <Popup style={{display: displayPopup}} 
                            score={score} 
                            total={total} 
                            startQuiz={this.handleStartQuiz}
                            text={this.props.location.state.text}
                        />
                        
                        <div className="row">
                            <div className="col-lg-12 col-md-10">
                                <div id="question">
                                    <h4 className="bg-light">Question {count}/{total}</h4>
                                    <p dangerouslySetInnerHTML={{__html: (question)}}></p>
                                </div>

                               <Answers 
                                    answers={answers} 
                                    correct={correct} 
                                    showButton={this.handleShowButton} 
                                    isAnswered={questionAnswered} 
                                    increaseScore={this.handleIncreaseScore}
                                    nextQuestion={this.nextQuestion}
                                /> 
                            </div>
                        </div> 
                    </div>:null
                    }
                </div>
        )
    }
}
