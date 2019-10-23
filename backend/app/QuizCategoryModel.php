<?php 

namespace App;
use DB;
use App\QuizSubCategoryModel;
use App\QuizQuestionModel;
use Illuminate\Database\Eloquent\Model;
class QuizCategoryModel extends Model {
    
    protected $table = 'categories';
    public $timestamps = false;
    public function getAll(){
        return QuizCategoryModel::get();
    }
    public function insertCategory($name){
        return QuizCategoryModel::insert(["category"=>$name]);
    }
    public function deleteCategoryID($id){
        DB::beginTransaction();
        QuizQuestionModel::where('category_id',$id)->delete();
        QuizSubCategoryModel::where('category_id',$id)->delete();
        DB::commit();
        return QuizCategoryModel::where('id',$id)->delete();
    }
    public function searchCategory($search)
    {
        return QuizCategoryModel::where('category', 'LIKE', $search.'%')->get(); 
    }
    public function updateCategoryID($id,$category_name){
        return QuizCategoryModel::where('id',$id)->update(['category'=>$category_name]);
    }
    
}
?>