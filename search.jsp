<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<html>
  <head>
	<link href="src/css/style.css" rel="stylesheet">  
  	<script src="src/js/moogle.js"></script>
  </head>
  <body>
    <div id="search">
    	<div id="logo_container">
    		<img id="logo" src="src/image/moogle_logo.png">
    	</div>
    	<!-- Search Box -->
    	<input type="text" size="100" id="keyword" onkeyup="getMoreContents()" onblur="keywordBlur()" onfocus="getMoreContents()"/>
    	<!--<input type="button" value="Moogle" width="50px"/>-->
    	<!-- Auto complete content display area -->
    	<div id="popDiv">
    		<table id="content_table" bgcolor="#FFFAFA" border="0" cellspacing="0" cellpadding="0">
    			<tbody id="content_table_body">
    				
    			</tbody>
    		</table>
    	</div>
    </div>
  </body>
</html>
