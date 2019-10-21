<?php

namespace App\Http\Controllers;
use App\QuizSubCategoryModel;
use Illuminate\http\Request;

class QuizSubCategoryController  
{  
    //This function is for getting all Sub categories.
    public function getAllSubCategoriesTree()
    {
       
        $_quizSubCategory=new QuizSubCategoryModel;
        $_result=$_quizSubCategory->getAllSubCategoriesTree();
        return response()->json($_result);
    }
    //This function is for getting all Sub categories.
    public function getSubCategories(Request $request)
    {
        $Category_id=$request->input('Category_id');
        $_quizSubCategory=new QuizSubCategoryModel;
        $_result=$_quizSubCategory->getSubCategories($Category_id);
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
    public function deleteSubCategory($id){
        
        $_quizCategory=new QuizSubCategoryModel;
        $_result=$_quizCategory->deleteSubCategoryID($id);
        if($_result=='1')
            return response()->json(['response_code'=>200]);
        else
            return response()->json(['response_code'=>202]);
    }
    public function searchSubCategories(Request $request)
    {
        $text=$request->input('text');
        $id=$request->input('category_id');
        $_quizCategory=new QuizSubCategoryModel;
        $_result=$_quizCategory->searchSubCategory($id,$text);
        return response()->json($_result);

    }
    public function updateSubCategory(Request $request)
    {

        $_quizCategory=new QuizSubCategoryModel;
        $_result=$_quizCategory->updateSubCategoryID($request['id'],$request['sub_category']);
        if($_result=='1')
            return response()->json(['response_code'=>200]);
        else
            return response()->json(['response_code'=>202]);
    }
    public function getAllSubCategories($id)
    {
        $_res=QuizSubCategoryModel::where('category_id',$id)->paginate(5);
        return response()->json($_res);
        
    }
    
}