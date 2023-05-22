<?php
$conn = mysqli_connect("localhost","root" , "", "library");
function TokenGenerator()
{
    $digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $token = '';
    for ($i = 0; $i < 40; $i++) {
        $token .= $digits[rand(0, 61)];
    }
    return $token;
}

function getUserFromToken($token){
    global $conn;
    $sql = "select * from user where token='".$token."'";
    $result = mysqli_query($conn , $sql);
    if(mysqli_num_rows($result)){
        $response = mysqli_fetch_all($result , MYSQLI_ASSOC);
        return $response[0];
    }else{
        ResponseGenerator(false ,"#dd4444", "Session Expired ! Kindly ReLogin" , null);
        die();
    }
}
function getAdminFromToken($token){
    global $conn;
    $sql = "select * from admin where token='".$token."'";
    $result = mysqli_query($conn , $sql);
    if(mysqli_num_rows($result)){
        $response = mysqli_fetch_all($result , MYSQLI_ASSOC);
        return $response[0];
    }else{
        ResponseGenerator(false ,"#dd4444", "Session Expired! Kindly ReLogin" , null);
        die();
    }
}
function ResponseGenerator($status = true ,$mode, $message = "" , $response){
    global $data;
    $response_array=array(
        "status"=>$status,
        "message"=>$message,
        "mode"=>$mode,
        "data"=>$response
    );
    echo json_encode($response_array);
}
function UserLogin($data){
    global $conn;
    $email = mysqli_real_escape_string($conn , $data["email"]);
    $password = mysqli_real_escape_string($conn , $data["password"]);
    $sql = "select * from user where email='".$email."' and approved=1 and password='".$password."'";
    $result = mysqli_query($conn , $sql);
    if(mysqli_num_rows($result)){
        $response = mysqli_fetch_all($result , MYSQLI_ASSOC);
        ResponseGenerator(true ,"green", "Login Success" , $response);
    }else{
        ResponseGenerator(false ,"#dd4444", "Email or password is incorrect" , null);
    }
}
function AdminLogin($data){
    global $conn;
    $email = mysqli_real_escape_string($conn , $data["email"]);
    $password = mysqli_real_escape_string($conn , $data["password"]);
    $sql = "select * from admin where email='".$email."' and password='".$password."'";
    $result = mysqli_query($conn , $sql);
    if(mysqli_num_rows($result)){
        $response = mysqli_fetch_all($result , MYSQLI_ASSOC);
        ResponseGenerator(true ,"green", "Login Success" , $response);
    }else{
        ResponseGenerator(false ,"#dd4444", "Email or password is incorrect" , null);
}
}
function Registration($data){
    global $conn;
    $email = mysqli_real_escape_string($conn , $data["email"]);
    $name = mysqli_real_escape_string($conn , $data["name"]);
    $registration = mysqli_real_escape_string($conn , $data["registration"]);
    $password = mysqli_real_escape_string($conn , $data["password"]);
    $token = TokenGenerator();
    $sql = "INSERT INTO `user` (`id`, `name`, `email`, `registration`, `password`, `token`) VALUES (NULL, '".$name."', '".$email."', '".$registration."', '".$password."', '".$token."')";
    $result = mysqli_query($conn , $sql);
    if($result){
        ResponseGenerator(true ,"green", "Registration Success" , null);
    }else{
        ResponseGenerator(true ,"#dd4444", "Registration failed" , null);
    }
   
}
function CheckBookAvailabiity($account){

}
function getBookFromAccountnumber($account){
    global $conn;
    $sql = "select * from book where account=".$account;
    $result = mysqli_query($conn , $sql);
    if(mysqli_num_rows($result)){
        $response = mysqli_fetch_all($result , MYSQLI_ASSOC);
        return $response;
    }else{
        ResponseGenerator(0 ,"#dd4444", "Book Account Number doesn't exist" , null);
        die();
    }

}
function AddBook($info){
    $acc = $info["account"];
    $response = getBookFromAccountnumber($acc);
    ResponseGenerator(1 , "green" , "Book Added Successfully" , $response);
}
function InitiateBookRequest($info , $token){
    global $conn;
    $accounts =  $info["account"];
    $user_id = getUserFromToken($token)["id"];
    $sql = "INSERT INTO `transaction` (`id`, `book_account`, `user_id`, `status`) VALUES (NULL, '".$accounts."', ".$user_id.", '0')";
    $result = mysqli_query($conn , $sql);
    if($result){
        ResponseGenerator(true ,"green", "Book Request Initiated Successfully" , null);
    }else{
        ResponseGenerator(true ,"#dd4444", "Book can't be initiated" , null);
    }
}
function SearchBook($info){
    global $conn;
    $key = $info["key"];
    $sql = "select * from book where name like '%".$key."%' or author like '%".$key."%' or account like '%".$key."%'";
    $result = mysqli_query($conn , $sql);
    if(mysqli_num_rows($result)){
        $response = mysqli_fetch_all($result , MYSQLI_ASSOC);
        ResponseGenerator(1 ,"", "" , $response);
    }else{
        ResponseGenerator(0 ,"#dd4444", "Book Not Found" , null);
        die();
    }
}
function BookHistory($info , $token){
    global $conn;
    $user_id = getUserFromToken($token)["id"];
    $sql = "select book.name as name,book.author as author , transaction.timestamp as issue_date,transaction.return as return_date from transaction left join book on book.account=transaction.book_account where status=3 and user_id=".$user_id;
    $result = mysqli_query($conn , $sql);
    if(mysqli_num_rows($result)){
        $response = mysqli_fetch_all($result , MYSQLI_ASSOC);
        ResponseGenerator(true ,"", "" , $response);
    }else{
        ResponseGenerator(false ,"#dd4444", "Book History Empty" , null);
        die();
    }
}
function AllBookHistory($info , $token){
    global $conn;
    $user_id = getAdminFromToken($token)["id"];
    $sql = "select book.name as name,book.author as author , transaction.timestamp as issue_date,transaction.return as return_date from transaction left join book on book.account=transaction.book_account";
    $result = mysqli_query($conn , $sql);
    if(mysqli_num_rows($result)){
        $response = mysqli_fetch_all($result , MYSQLI_ASSOC);
        ResponseGenerator(true ,"", "" , $response);
    }else{
        ResponseGenerator(false ,"#dd4444", "Book History Empty" , null);
        die();
    }
}
function ReturnBookRequest($info , $token){
    global $conn;
    $transaction_id = $info["transaction"];
    $user_id = getUserFromToken($token)["id"];
    $sql = "update transaction set status=2 where status=1 and user_id=".$user_id." and id=".$transaction_id;
    $result = mysqli_query($conn , $sql);
    if($result){
        ResponseGenerator(1 ,"green", "Return Initiated successfully" , null);
    }else{
        ResponseGenerator(0 ,"#dd4444", "Return Initiation Failed" , null);
        die();
    }
}
function CheckIssueRequests($token){
    global $conn;
    $user_id = getAdminFromToken($token)["id"];
    $sql = "select p.id as id,user.name as name,user.email as email,p.account as account,p.book as book, p.author as author,p.issue as issue from (select book.name as book,book.author as author,transaction.timestamp as issue,transaction.id as id,transaction.user_id as user_id,book.account as account,transaction.status as status from transaction left join book on transaction.book_account=book.account) p left join user on p.user_id=user.id where p.status=0";
    $result = mysqli_query($conn , $sql);
    if(mysqli_num_rows($result)){
        $response = mysqli_fetch_all($result , MYSQLI_ASSOC);
        ResponseGenerator(true ,"", "" , $response);
    }else{
        ResponseGenerator(false ,"#dd4444", "No Issue Request Found" , null);
        die();
    }
}
function AcceptIssueRequest($info , $token){
    global $conn;
    $transaction_id = $info["id"];
    $user_id = getAdminFromToken($token)["id"];
    $sql = "update transaction set status=1 where status=0 and id=".$transaction_id;
    $result = mysqli_query($conn , $sql);
    if($result){
        ResponseGenerator(true ,"green", "Book Initiated successfully" , null);
    }else{
        ResponseGenerator(false ,"#dd4444", "Failed to accept issue request" , null);
        die();
    }
}
function DenyIssueRequest($info , $token){
    global $conn;
    $transaction_id = $info["id"];
    $user_id = getAdminFromToken($token)["id"];
    $sql = "update transaction set status=-1 where status=0 and id=".$transaction_id;
    $result = mysqli_query($conn , $sql);
    if($result){
        ResponseGenerator(true ,"green", "Isssue Request Denied" , null);
    }else{
        ResponseGenerator(false ,"#dd4444", "Failed to deny issue request" , null);
        die();
    }
}


function CheckReturnRequests($token){
    global $conn;
    $user_id = getAdminFromToken($token)["id"];
    $sql = "select p.id as id,user.name as name,user.email as email,p.account as account,p.book as book, p.author as author,p.issue as issue from (select book.name as book,book.author as author,transaction.timestamp as issue,transaction.id as id,transaction.user_id as user_id,book.account as account,transaction.status as status from transaction left join book on transaction.book_account=book.account) p left join user on p.user_id=user.id where p.status=2";
    $result = mysqli_query($conn , $sql);
    if(mysqli_num_rows($result)){
        $response = mysqli_fetch_all($result , MYSQLI_ASSOC);
        ResponseGenerator(true ,"", "" , $response);
    }else{
        ResponseGenerator(false ,"#dd4444", "No Return Request Found" , null);
        die();
    }
}
function AcceptReturnRequest($info , $token){
    global $conn;
    $transaction_id = $info["id"];
    $user_id = getAdminFromToken($token)["id"];
    $sql = "update transaction set status=3 where status=2 and id=".$transaction_id;
    $result = mysqli_query($conn , $sql);
    if($result){
        ResponseGenerator(true ,"green", "Book Return successfully" , null);
    }else{
        ResponseGenerator(false ,"#dd4444", "Failed to return request" , null);
        die();
    }
}
function DenyReturnRequest($info , $token){
    global $conn;
    $transaction_id = $info["id"];
    $user_id = getAdminFromToken($token)["id"];
    $sql = "update transaction set status=1 where status=2 and id=".$transaction_id;
    $result = mysqli_query($conn , $sql);
    if($result){
        ResponseGenerator(true ,"green", "Return Request Denied" , null);
    }else{
        ResponseGenerator(false ,"#dd4444", "Failed to deny return request" , null);
        die();
    }
}



function AddBookToLibrary($data,$token){   
    global $conn;
    $name = mysqli_real_escape_string($conn , $data["name"]);
    $author = mysqli_real_escape_string($conn , $data["author"]);
    $account = mysqli_real_escape_string($conn , $data["account"]);
    $edition = mysqli_real_escape_string($conn , $data["edition"]);
    $user_id = getAdminFromToken($token)["id"];
    $sql = "INSERT INTO `book` (`id`, `account`, `name`, `author`,`edition`) VALUES (NULL, '".$account."', '".$name."', '".$author."', '".$edition."')";
    $result = mysqli_query($conn , $sql);
    if($result){
        ResponseGenerator(true ,"green", "Book Added To Library" , null);
    }else{
        ResponseGenerator(false ,"#dd4444", "Failed to add Book" , null);
        die();
    }
}


function RemoveBookFromLibrary($data,$token){   
    global $conn;
    $account = mysqli_real_escape_string($conn , $data["account"]);
    $user_id = getAdminFromToken($token)["id"];
    $sql = "DELETE FROM book WHERE account = ".$account;
    $result = mysqli_query($conn , $sql);
    if($result){
        ResponseGenerator(true ,"green", "Book Removed From Library" , null);
    }else{
        ResponseGenerator(false ,"#dd4444", "Failed to add Book" , null);
        die();
    }
}

function BookSummary($token){
      ///code kr bsdk
      global $conn;
      $user_id = getAdminFromToken($token)["id"];
      $total = mysqli_fetch_assoc(mysqli_query($conn , "select count(account) as total from book"))["total"];
      $issued = mysqli_fetch_assoc(mysqli_query($conn , "select count(book_account) as issued from transaction where status=1 or status=2"))["issued"];
      $booktype = mysqli_fetch_assoc(mysqli_query($conn , "select count(id) as book from user"))["book"];

      if($total){
        $response = array(
            "totalBook"=>$total,
            "issuedBook"=>$issued,
            "availableBook"=>$total-$issued,
            "bookType"=>$booktype
        );
          ResponseGenerator(true ,"", "" , $response);
      }else{
          ResponseGenerator(false ,"#dd4444", "Failed to add Book" , null);
          die();
      }
}

function ApproveUser($info , $token){
    global $conn;
    $user_id = $info["id"];
    $user_id = getAdminFromToken($token)["id"];
    $sql = "update user set approved=1 where id=".$user_id;
    $result = mysqli_query($conn , $sql);
    if($result){
        ResponseGenerator(true ,"green", "User Approved" , null);
    }else{
        ResponseGenerator(false ,"#dd4444", "Failed to approved User" , null);
        die();
    }
}
function BlockUser($info , $token){
    global $conn;
    $user_id = $info["id"];
    $user_id = getAdminFromToken($token)["id"];
    $sql = "update user set approved=0 where id=".$user_id;
    $result = mysqli_query($conn , $sql);
    if($result){
        ResponseGenerator(true ,"green", "User Blocked" , null);
    }else{
        ResponseGenerator(false ,"#dd4444", "Failed to block User" , null);
        die();
    }
}


function ChangeUserPassword($info , $token){
    global $conn;
    $password = $info["password"];
    $user_id = getUserFromToken($token)["id"];
    $sql = "update user set password='".$password."' where id=".$user_id;
    $result = mysqli_query($conn , $sql);
    if($result){
        ResponseGenerator(true ,"green", "Password Updated" , null);
    }else{
        ResponseGenerator(false ,"#dd4444", "Password Updation Failed" , null);
        die();
    }
}

function ChangeAdminPassword($info , $token){
    global $conn;
    $password = $info["password"];
    $user_id = getAdminFromToken($token)["id"];
    $sql = "update admin set password='".$password."' where id=".$user_id;
    $result = mysqli_query($conn , $sql);
    if($result){
        ResponseGenerator(true ,"green", "Password Updated" , null);
    }else{
        ResponseGenerator(false ,"#dd4444", "Password Updation Failed" , null);
        die();
    }
}


function MyBooks($token){
    global $conn;
    $user_id = getUserFromToken($token)["id"];
    $sql = "select transaction.id as id, book.account as account_no ,book.name as name,book.author as author , transaction.timestamp as issue_date,transaction.return as return_date from transaction left join book on book.account=transaction.book_account where transaction.status=1 and user_id=".$user_id;
    $result = mysqli_query($conn , $sql);
    if(mysqli_num_rows($result)){
        $response = mysqli_fetch_all($result , MYSQLI_ASSOC);
        ResponseGenerator(1 ,"", "" , $response);
    }else{
        ResponseGenerator(0 ,"#dd4444", "Empty" , null);
        die();
    }
}

function UserProfile($token){
   $user = getUserFromToken($token);
   ResponseGenerator(1 ,"", "" , $user);
}
function AdminProfile($token){
    $user = getAdminFromToken($token);
    ResponseGenerator(1 ,"", "" , $user);
 }