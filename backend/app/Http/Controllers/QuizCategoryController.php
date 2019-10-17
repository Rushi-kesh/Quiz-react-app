<?php

namespace App\Http\Controllers;
use App\QuizCategoryModel;
use Illuminate\http\Request;

class QuizCategoryController  
{  
    //This function is for getting all categories.
    public function getCategories()
    {
        $_quizCategory=new QuizCategoryModel;
        $_result=$_quizCategory->getAll();
        return response()->json($_result);
    }

    //This function is for adding new category
    public function addCategory(Request $request){
        $name=$request->input('Category_name');
        $_quizCategory=new QuizCategoryModel;
        $_result=$_quizCategory->insertCategory($name);
        if($_result=='1')
            return response()->json(['responce_code'=>200]);
        else
            return response()->json(['responce_code'=>202]);
    }
    
}