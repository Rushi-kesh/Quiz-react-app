<?php

namespace App\Http\Controllers;
use App\UserLoginModel;
use Illuminate\http\Request;

class UserLoginController  
{  
    //This function is for Validating user.
    public function validate(Request $request)
    {
        if (!empty($request->input('username')) && !empty($request->input('password'))) 
        {
            $username = $request->input('username');
            $password = $request->input('password');
            $_login=new UserLoginModel;
            $result=$_login->validateUser($username, $password);
            
            if($result!='[]')
                return response()->json(['status'=>'succcess']);
            else
                return response()->json(['status'=>'failed']);
        } 
        else 
        {
            return response()->json(['status'=>'failed']);
        }
    }  
}