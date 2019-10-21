<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;
class QuizQuestionModel extends Model {
    
    protected $table = 'quiz_mcqs';
    public $timestamps = false;
    public function getQuestions($category_id,$subcategory_id){
        return QuizQuestionModel::where('category_id',$category_id)->where('sub_category_id',$subcategory_id)->get()->shuffle()->take(10);
    }
    public function insertQuestion($data){
        return QuizQuestionModel::insert($data);
    }
    public function updateQuestion($obj)
    {
        return QuizQuestionModel::where('id',$obj['id'])->update($obj['data']);
    }
    public function deleteQuestion($id)
    {
        return QuizQuestionModel::where('id',$id)->delete();
    }
    public function searchQuestions($category_id,$sub_category_id,$text)
    {
        return QuizQuestionModel::where('category_id',$category_id)->where('sub_category_id',$sub_category_id)->where('question','LIKE','%'.$text.'%')->get();
    }
}
?>