<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;
class QuizQuestionModel extends Model {
    
    protected $table = 'sub_categories';
    
    public function getQuestions($category_id,$subcategory_id){
        return QuizQuestionModel::where('category_id',$category_id)->where('sub_category_id',$subcategory_id)->get()->shuffle();
    }
    public function insertQuestion($data){
        return QuizQuestionModel::insert($data);
    }
}
?>