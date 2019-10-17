<?php 

namespace App;
use App\QuizCategoryModel;
use Illuminate\Database\Eloquent\Model;
class QuizSubCategoryModel extends Model {
    
    protected $table = 'sub_categories';
    
    public function getAllSubCategories(){
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
    public function getSubCategories($id){
        return QuizSubCategoryModel::where('category_id',$id)->get();
    }
    public function insertSubCategory($data){
        return QuizSubCategoryModel::insert($data);
    }
}
?>