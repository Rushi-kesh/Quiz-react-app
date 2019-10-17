<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;
class QuizCategoryModel extends Model {
    
    protected $table = 'categories';
    
    public function getAll(){
        return QuizCategoryModel::get();
    }
    public function insertCategory($name){
        return QuizCategoryModel::insert(["category"=>$name]);
    }
}
?>