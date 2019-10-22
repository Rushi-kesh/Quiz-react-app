/*all the required module for the app */
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import JqxTextArea from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtextarea';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css';
import JqxInput from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxinput';
import Alert from 'react-bootstrap/Alert';
export default class QuizAddQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false,name: '',team :'' ,country: '',msg:''};

    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /****************Validation of data *************/
  validate=(obj)=>{
    if(obj.question==""){
      this.setState({msg:"Please enter question!"})
    }
    else if(obj.correct_answer==""){
      this.setState({msg:"Please enter correct answer"})
    }
    else if(obj.answer1==""){
      this.setState({msg:"Please enter answer1"})
    }
    else if(obj.answer2==""){
      this.setState({msg:"Please enter answer2"})
    }
    else if(obj.answer3==""){
      this.setState({msg:"Please enter answer3"})
    }
    else{
      return true;
    }
    return false;
  }


//******************on submit action in popup****************
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
    if(this.validate(obj)){
      this.props.addData(obj);
      this.props.modal();
    }
  }


  render() {
    return (
        <div>
          <Modal isOpen={this.props.toggle}>
          <form onSubmit={this.handleSubmit}>
          <div id="container">
            <ModalHeader>Add Question</ModalHeader>
            <ModalBody>
            {this.state.msg!=""?
              <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>
                {this.state.msg}
                </Alert.Heading>
              </Alert>
              :<Alert variant="info" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>
              All fields are madatory
              </Alert.Heading>
            </Alert>
            }
            <div  id="container" className="row">
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
            </div>
            </form>
            
          </Modal>
        </div>
      
    );
  }
}

