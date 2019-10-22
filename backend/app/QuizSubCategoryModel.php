<?php 

namespace App;
use App\QuizCategoryModel;
use DB;
use App\QuizQuestionModel;
use Illuminate\Database\Eloquent\Model;
class QuizSubCategoryModel extends Model {
    
    protected $table = 'sub_categories';
    public $timestamps = false;
    public function getAllSubCategoriesTree(){
        $result=[];
        $data=QuizCategoryModel::get();
        foreach($data as $item){
            $id=$item['id'];
            $item['label']=$item['category'];
            $arr=[];
            $subitems=QuizSubCategoryModel::where('category_id',$id)->get();
            foreach($subitems as $subitem){
                
                $i['id']=$id.'-'.$subitem['id'];
                $i['label']=$subitem['sub_category'];
                array_push($arr,$i);
            }
            $item['items']=$arr;
        }
        return $data;
        //return QuizSubCategoryModel::join('categories','categories.id','=','sub_categories.category_id')->get();
    }
    public function insertSubCategory($data){
        return QuizSubCategoryModel::insert($data);
    }
    public function deleteSubCategoryID($id){
        DB::beginTransaction();
        QuizQuestionModel::where('sub_category_id',$id)->delete();
        DB::commit();
        return QuizSubCategoryModel::where('id',$id)->delete();
    }
    public function searchSubCategory($id,$search)
    {
        return QuizSubCategoryModel::where('category_id',$id)->where('sub_category', 'LIKE', $search.'%')->get(); 
    }
    public function updateSubCategoryID($id,$sub_category){
        return QuizSubCategoryModel::where('id',$id)->update(['sub_category'=>$sub_category]);
    }
}
?>