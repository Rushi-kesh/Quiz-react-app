<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;
class QuizQuestionModel extends Model {
    
    protected $table = 'quiz_mcqs';
    
    public function getQuestions($category_id,$subcategory_id){
        return QuizQuestionModel::where('category_id',$category_id)->where('sub_category_id',$subcategory_id)->get()->shuffle()->take(20);
    }
    public function insertQuestion($data){
        return QuizQuestionModel::insert($data);
    }
}
?>