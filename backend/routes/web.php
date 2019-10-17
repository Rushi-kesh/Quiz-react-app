<?php

//---------Login APIS-----------
$router->get('/quiz-app/V1/validate', 'UserLoginController@validate');

//--------Quiz Category APIS----------

$router->get('/quiz-app/V1/admin/quiz/categories','QuizCategoryController@getCategories');
$router->post('/quiz-app/V1/admin/quiz/categories/add','QuizCategoryController@addCategory');



//--------Quiz Sub Category APIS----------
$router->get('/quiz-app/V1/admin/quiz/allsubcategories','QuizSubCategoryController@getAllSubCategories');
$router->get('/quiz-app/V1/admin/quiz/subcategories','QuizSubCategoryController@getSubCategories');
$router->post('/quiz-app/V1/admin/quiz/subcategories/add','QuizSubCategoryController@addSubCategory');
//--------Quiz Questions APIS----------
$router->get('/quiz-app/V1/admin/quiz/questions','QuizQuestionsController@getQuestions');
?>