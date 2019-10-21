import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
class Popup extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            time: 'start',
            title: 'Quiz',
            text: 'This is a QUIZ based on '+this.props.text+' <br /><br />',
            buttonText: 'Start the quiz',
            back:false
        };
        
        this.popupHandle = this.popupHandle.bind(this);
    }
    
    popupHandle() {
        let { time } = this.state;
        
        if(time === 'start'){
            this.setState({
                time: 'end',
                title: 'Congratulations!',
                buttonText: 'Restart'
            });

            //alert("START THE QUIZ");
            this.props.startQuiz();
        } else {        
            location.reload();// restart the Quiz
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            text: 'You got: <strong>' + this.props.score + 
            '</strong> out of <strong>' + 
            this.props.total +
            '</strong> questions right.<br />'
        })
    }
    goBack=()=>{
        this.setState({back:true})
    }
    
    render() {
       
        let { title, text, buttonText } = this.state;
        
        let { style } = this.props;
        
        return (
            
                <div className="popup-container" style={style}>
                    {this.state.back?<Redirect to='/' />:null}
                    <div className="container">
                        <div className="ml-5 col-md-10 col-10">
                            <div className="popup">
                                
                                <h1>{title}</h1>
                                <p dangerouslySetInnerHTML={{__html: (text)}}></p>
                                <span onClick={this.popupHandle}>
                                <Button className="btn-info">{buttonText}</Button>
                                
                                </span>
                                <Button onClick={this.goBack} className="btn-warning">Go back</Button>
                                <hr/>
                            </div>
                        </div>
                    </div>
                </div>
          
        );
    }
}

export default Popup; 

