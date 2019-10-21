import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import JqxTextArea from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtextarea';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css';
import JqxInput from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxinput';
export default class QuizAddQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false,name: '',team :'' ,country: ''};

    
    this.handleSubmit = this.handleSubmit.bind(this);
  }




  handleSubmit(event) {
    event.preventDefault();
    var question=this.refs.question.val();
    var correct_answer=this.refs.correct_answer.val();
    var answer1=this.refs.answer1.val();
    var answer2=this.refs.answer2.val();
    var answer3=this.refs.answer3.val();
    const obj={
      question,
      correct_answer,
      answer1,
      answer2,
      answer3
    }
    this.props.addData(obj);
    this.props.modal();
  }


  render() {
    return (

        <div>
        <Modal isOpen={this.props.toggle}>
        <form onSubmit={this.handleSubmit}>
          <ModalHeader>Add Question</ModalHeader>
          <ModalBody>
          <div className="row">
            <div className="form-group col">
            <label>Question:</label>
            <JqxTextArea ref="question" width={"100%"} height={70} className="form-control" />
              </div>
              </div>
            <div className="row">
            <div className="form-group col-md-1"></div>
             <div className="form-group col-md-4">
                <label>Correct Answer:</label>
                <br/>
                <JqxInput ref="correct_answer" className="form-control" />
               </div>
               <div className="form-group col-md-1"></div>
               <div className="form-group col-md-4">
                <label>Option 1:</label>
                <JqxInput ref="answer1" className="form-control" />
               </div>
              </div>
            <div className="row">
            <div className="form-group col-md-1"></div>
                <div className="form-group col-md-4">
                <label>Option 2:</label>
                <JqxInput ref="answer2" className="form-control" />
               </div>
               <div className="form-group col-md-1"></div>
               <div className="form-group col-md-4">
                <label>Option 3:</label>
                <JqxInput ref="answer3" className="form-control" />
               </div>
              </div>
          </ModalBody>
          <ModalFooter>
            <input type="submit" value="Submit" color="primary" className="btn btn-primary" />
            <Button color="danger" onClick={this.props.modal}>Cancel</Button>
          </ModalFooter>
          </form>
        </Modal>
        </div>
      
    );
  }
}

