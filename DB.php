<?php
// connect database 
$con;
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "baitapgd3";

$con = mysqli_connect($servername, $username, $password);
mysqli_select_db($con, $dbname);
mysqli_query($con, "SET NAMES 'utf8'");
