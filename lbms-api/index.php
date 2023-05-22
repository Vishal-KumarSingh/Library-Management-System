<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"),true);
if ($method == 'GET') {
	echo '{"status":1,"message":"Get Request is not allowed in this server"}';
}
if ($method == 'POST') {
    $action = $data["action"];
    $info = $data["data"];
    if(isset($data["token"])){
        $token = $data["token"];
    }else{
        $token="";
    }
    include "./Actions.php";
    switch($action){
        case "Login":
             UserLogin($info);
             break;
        case "AdminLogin":
            AdminLogin($info);
            break;
        case "Registration":
            Registration($info);
            break;
        case "BookSearch":
            SearchBook($info);
            break;
        case "AddBook":
            AddBook($info);
            break;
        case "InitiateBookRequest":
            InitiateBookRequest($info , $token);
            break;
        case "BookHistory":
            BookHistory($info,$token);
            break;
        case "AllBookHistory":
            AllBookHistory($info,$token);
            break;
        case "ReturnRequest":
            ReturnBookRequest($info,$token);
            break; 
        case "CheckIssueRequests":
            CheckIssueRequests($token);
            break;
        case "AcceptIssueRequest":
            AcceptIssueRequest($info,$token);
            break;
        case "DenyIssueRequest":
            DenyIssueRequest($info,$token);
            break;
        case "CheckReturnRequests":
            CheckReturnRequests($token);
            break;
        case "AcceptReturnRequest":
            AcceptReturnRequest($info,$token);
            break;
        case "DenyReturnRequest":
            DenyReturnRequest($info,$token);
            break;
        case "AddBookToLibrary":
            AddBookToLibrary($info,$token);
            break;
        case "RemoveBookFromLibrary":
            RemoveBookFromLibrary($info,$token);
            break;
        case "BookSummary":
            BookSummary($token);
            break;
        case "ApproveUser":
            ApproveUser($info,$token);
            break;
        case "BlockUser":
            BlockUser($info,$token);
            break; 
        case "ChangeUserPassword":
            ChangeUserPassword($info,$token);
            break;
        case "ChangeAdminPassword":
            ChangeAdminPassword($info,$token);
            break;
        case "MyBooks":
            MyBooks($token);
            break;
        case "Profile":
            UserProfile($token);
            break;
        case "AdminProfile":
            AdminProfile($token);
            break;
        default:
             ResponseGenerator(false , "red","Invalid action" , array());
    }
}

