<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;
class QuizSubCategoryModel extends Model {
    
    protected $table = 'sub_categories';
    
    public function getAllSubCategories($id){
        return QuizSubCategoryModel::where('category_id',$id)->get();
    }
    public function insertSubCategory($data){
        return QuizSubCategoryModel::insert($data);
    }
}
?>