import React, { Component } from 'react';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.energyblue.css';

import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
import QuizQuestions from './QuizQuestions';
import QuizCategory from './QuizCategory';
import QuizSubCategory from './QuizSubCategory';
export default class Dashboard extends Component {
    onTabclick=(e)=>{
        console.log(e.args.item);
    }
    
    render() {
        return (
            <div>
                <JqxTabs  width={"100%"} onTabclick={this.onTabclick} >
                    <ul style={{ marginLeft: 10 }}>
                        <li>Categories</li>
                        <li>SubCategories</li>
                        <li>Questions</li>
                    </ul>
                    <div>
                        <QuizCategory />
                    </div>
                    <div>
                        <QuizSubCategory />
                    </div>
                    <div>
                        <QuizQuestions />
                    </div>
                </JqxTabs>
            </div>
        )
    }
}
