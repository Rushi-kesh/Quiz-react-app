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
            return response()->json(['response_code'=>200]);
        else
            return response()->json(['response_code'=>202]);
    }
    //This function is for deleting category bu id
    public function deleteCategory($id){
        
        $_quizCategory=new QuizCategoryModel;
        $_result=$_quizCategory->deleteCategoryID($id);
        if($_result=='1')
            return response()->json(['response_code'=>200]);
        else
            return response()->json(['response_code'=>202]);
    }
    //This function is for searching category in database
    public function searchCategories(Request $request)
    {
        $text=$request->input('text');
        $_quizCategory=new QuizCategoryModel;
        $_result=$_quizCategory->searchCategory($text);
        return response()->json($_result);

    }
    //This function is for updating existing category
    public function updateCategory(Request $request)
    {

        $_quizCategory=new QuizCategoryModel;
        $_result=$_quizCategory->updateCategoryID($request['id'],$request['Category_name']);
        if($_result=='1')
            return response()->json(['response_code'=>200]);
        else
            return response()->json(['response_code'=>202]);
    }
    //This function is for getting all category paginated
    public function getAllCategories()
    {
        $_res=QuizCategoryModel::paginate(5);
        return response()->json($_res);
        
    }
    //This functions is to delete multiple categories
    public function deleteMultipleCategories()
    {
        
    }
}