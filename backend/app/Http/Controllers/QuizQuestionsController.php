<?php

namespace App\Http\Controllers;
use App\QuizQuestionModel;
use Illuminate\http\Request;

class QuizQuestionsController  
{  
    //This function is for getting Question.
    public function getQuestions(Request $request)
    {
        $Category_id=$request->input('Category_id');
        $SubCategory_id=$request->input('SubCategory_id');
        $_quizQuestion=new QuizQuestionModel;
        $_res=$_quizQuestion->getQuestions($Category_id,$SubCategory_id);
        $_result=[];
        foreach($_res as $item){
            $obj['question']=$item['question'];
            $answers=[$item['correct_answer'],$item['answer1'],$item['answer2'],$item['answer3']];
            shuffle($answers);
            $obj['answers']=$answers;
            $obj['correct']=array_search($item['correct_answer'],$answers)+1;
            array_push($_result,$obj);
        }
        
        return response()->json($_result);
    }

    //This function is for adding new Question to Sub category
    public function addQuestion(Request $request){
        $_quizQuestion=new QuizQuestionModel;
        $_result=$_quizQuestion->insertQuestion($request->all());
        if($_result=='1')
            return response()->json(['response_code'=>200]);
        else
            return response()->json(['response_code'=>202]);
    }
    public function updateQuestion(Request $request){
        $_quizQuestion=new QuizQuestionModel;
        $_result=$_quizQuestion->updateQuestion($request->all());
        if($_result=='1')
            return response()->json(['response_code'=>200]);
        else
            return response()->json(['response_code'=>202]);
    }
    public function getAllQuestions(Request $request)
    {
        $Category_id=$request->input('Category_id');
        $SubCategory_id=$request->input('SubCategory_id');
        
        $_res=QuizQuestionModel::where('category_id',$Category_id)->where('sub_category_id',$SubCategory_id)->paginate(5);
        
        return response()->json($_res);
    }
    public function deleteQuestion($id)
    {
        $_quizQuestion=new QuizQuestionModel;
        $_result=$_quizQuestion->deleteQuestion($id);
        if($_result=='1')
            return response()->json(['response_code'=>200]);
        else
            return response()->json(['response_code'=>202]);
    }
    public function searchQuestions(Request $request)
    {
        $text=$request->input('text');
        $id1=$request->input('category_id');
        $id2=$request->input('sub_category_id');
        $_quizCategory=new QuizQuestionModel;
        $_result=$_quizCategory->searchQuestions($id1,$id2,$text);
        return response()->json($_result);
    }
}