import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import JqxTextArea from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtextarea';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css';
import JqxInput from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxinput';
export default class QuizEditQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false,name: '',team :'' ,country: ''};

    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    //this.refs.question.val(this.props.data.question);
  }



  handleSubmit(event) {
    event.preventDefault();
    var question=this.props.data.question;
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
    this.props.updateData(obj);
    this.props.edit();
  }


  render() {
    return (
        
        <div>
        <Modal isOpen={this.props.modal}>
        <form onSubmit={this.handleSubmit}>
          <ModalHeader>Add Question</ModalHeader>
          <ModalBody>
          <div className="row">
            <div className="form-group col">
            <label>Question:</label>
            <JqxTextArea ref="question" width={"100%"}  height={70} className="form-control" />
              </div>
              </div>
            <div className="row">
            <div className="form-group col-md-1"></div>
             <div className="form-group col-md-4">
                <label>Correct Answer:</label>
                <br/>
                <JqxInput ref="correct_answer" value={this.props.data.correct_answer} className="form-control" />
               </div>
               <div className="form-group col-md-1"></div>
               <div className="form-group col-md-4">
                <label>Option 1:</label>
                <JqxInput ref="answer1" value={this.props.data.answer1} className="form-control" />
               </div>
              </div>
            <div className="row">
            <div className="form-group col-md-1"></div>
                <div className="form-group col-md-4">
                <label>Option 2:</label>
                <JqxInput ref="answer2" value={this.props.data.answer2} className="form-control" />
               </div>
               <div className="form-group col-md-1"></div>
               <div className="form-group col-md-4">
                <label>Option 3:</label>
                <JqxInput ref="answer3" value={this.props.data.answer3} className="form-control" />
               </div>
              </div>
          </ModalBody>
          <ModalFooter>
            <input type="submit" value="Submit" color="primary" className="btn btn-primary" />
            <Button color="danger" onClick={this.props.edit}>Cancel</Button>
          </ModalFooter>
          </form>
        </Modal>
        </div>
      
    );
  }
}

