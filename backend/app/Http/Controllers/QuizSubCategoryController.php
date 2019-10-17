<?php

namespace App\Http\Controllers;
use App\QuizSubCategoryModel;
use Illuminate\http\Request;

class QuizSubCategoryController  
{  
    //This function is for getting all Sub categories.
    public function getSubCategories(Request $request)
    {
        $Category_id=$request->input('Category_id');
        $_quizSubCategory=new QuizSubCategoryModel;
        $_result=$_quizSubCategory->getAllSubCategories($Category_id);
        return response()->json($_result);
    }

    //This function is for adding new Sub category
    public function addSubCategory(Request $request){
        $_quizSubCategory=new QuizSubCategoryModel;
        $_result=$_quizSubCategory->insertSubCategory($request->all());
        if($_result=='1')
            return response()->json(['responce_code'=>200]);
        else
            return response()->json(['responce_code'=>202]);
    }
    
}