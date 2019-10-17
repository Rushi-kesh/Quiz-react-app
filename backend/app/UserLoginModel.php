<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;
class UserLoginModel extends Model {

    protected $table = 'Users';

    public function validateUser($username,$password){
        $user=UserLoginModel::where('username',$username)->where('password',$password)->get();
        return $user;
    }
}
?>