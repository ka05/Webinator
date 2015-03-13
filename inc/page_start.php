<?php
  // Initialize everything I'll need for the page
  
  define( "PATH", "/" );
  define( "PATH_INC", PATH . "inc/" );
  
  define( "URL", "http://webinator.com/" );
  define( "URL_CSS", URL . "css/" );
  define( "URL_JS", URL . "js/" );
  
  define( "SITE_TITLE", "Webinator" );
    
  // Include any PHP function libraries or classes
  // include "../db_conn.inc.php";
  if($db){
    //$link = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
    $link = mysqli_connect("localhost", "root", "Kink03oz", "webinator");
    if(!$link){
        echo "connection error: " . mysqli_connect_error();
        die();
    }
  }
?>