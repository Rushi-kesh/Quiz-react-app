<?php

//---------Login APIS-----------
$router->get('/quiz-app/V1/validate', 'UserLoginController@validate');

//--------Quiz Category APIS----------

$router->get('/quiz-app/V1/admin/quiz/categories','QuizCategoryController@getCategories');
$router->get('/quiz-app/V1/admin/quiz/allcategories','QuizCategoryController@getAllCategories');
$router->get('/quiz-app/V1/admin/quiz/categories/search','QuizCategoryController@searchCategories');
$router->post('/quiz-app/V1/admin/quiz/categories/add','QuizCategoryController@addCategory');
$router->put('/quiz-app/V1/admin/quiz/categories/update','QuizCategoryController@updateCategory');
$router->delete('/quiz-app/V1/admin/quiz/categories/delete/{id}','QuizCategoryController@deleteCategory');



//--------Quiz Sub Category APIS----------
$router->get('/quiz-app/V1/admin/quiz/allsubcategories','QuizSubCategoryController@getAllSubCategoriesTree');
//$router->get('/quiz-app/V1/admin/quiz/subcategories','QuizSubCategoryController@getSubCategories');
$router->get('/quiz-app/V1/admin/quiz/sub_categories/{id}','QuizSubCategoryController@getAllSubCategories');
$router->get('/quiz-app/V1/admin/quiz/subcategories/search','QuizSubCategoryController@searchSubCategories');
$router->post('/quiz-app/V1/admin/quiz/subcategories/add','QuizSubCategoryController@addSubCategory');
$router->put('/quiz-app/V1/admin/quiz/subcategories/update','QuizSubCategoryController@updateSubCategory');
$router->delete('/quiz-app/V1/admin/quiz/subcategories/delete/{id}','QuizSubCategoryController@deleteSubCategory');

//--------Quiz Questions APIS----------
$router->get('/quiz-app/V1/admin/quiz/questions','QuizQuestionsController@getQuestions');
$router->get('/quiz-app/V1/admin/quiz/questions/search','QuizQuestionsController@searchQuestions');
$router->post('/quiz-app/V1/admin/quiz/questions/add','QuizQuestionsController@addQuestion');
$router->put('/quiz-app/V1/admin/quiz/questions/update','QuizQuestionsController@updateQuestion');
$router->get('/quiz-app/V1/admin/quiz/allQuestions','QuizQuestionsController@getAllQuestions');
$router->delete('/quiz-app/V1/admin/quiz/questions/delete/{id}','QuizQuestionsController@deleteQuestion');
?>