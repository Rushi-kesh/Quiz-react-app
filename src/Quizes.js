import React, { Component } from 'react'
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import JqxTree, { ITreeProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtree';
export default class Quizes extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:[{
                 id:1,
                 label:"Technical",
                 items:[{id:1,label:"PHP"},{id:2,label:"Python"}]
             },
             {
                id:2,
                label:"TechnicalTD",
                items:[{id:1,label:"PHPP"},{id:2,label:"PythonP"}]
            }
            ],
            start:false
        }
    }
    componentDidMount(){
        
    }
    onItemClick=(e)=> {
        console.log(e.args.element.id);
        this.setState({start:true})
      }
    render() {

        return (
            <div className="col">
                <div className="row">
                    <JqxTree width={400} onItemClick={this.onItemClick} source={this.state.data} ></JqxTree>
                </div>
                <div className="row">
                {this.state.start?<button>START QUIZ</button>:<h3>Please select category of Quizes</h3>}
                </div>
            </div>
        )
    }
}
