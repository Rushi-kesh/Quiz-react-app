<?php

namespace App\Http\Controllers;
use App\QuizQuestionModel;
use Illuminate\http\Request;

class QuizQuestionController  
{  
    //This function is for getting Question.
    public function getQuestions(Request $request)
    {
        $Category_id=$request->input('Category_id');
        $SubCategory_id=$request->input('SubCategory_id');
        $_quizQuestion=new QuizQuestionModel;
        $_result=$_quizQuestion->getQuestions($Category_id,$SubCategory_id);
        return response()->json($_result);
    }

    //This function is for adding new Question to Sub category
    public function addQuestion(Request $request){
        $_quizQuestion=new QuizQuestionModel;
        $_result=$_quizQuestion->insertQuestion($request->all());
        if($_result=='1')
            return response()->json(['responce_code'=>200]);
        else
            return response()->json(['responce_code'=>202]);
    }
    
}