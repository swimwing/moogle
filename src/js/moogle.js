/**
*This is the JS file for moople.
*The core feature is Ajax request. I didn't implement the Ajax by jQuery because the requirement is to demonstrate the knowledge in Java and HTML/Javascript/CSS.
*The other features are some DOM events.
*/
var xmlHttp;
//Auto-complete the user input
function getMoreContents(){
	//Get user input
	var content=document.getElementById("keyword");
	if(content.value==""){
		clearContent();
		return;
	}
	//Send Ajax request
	xmlHttp=createXMLHttp();
	var url="search?keyword="+escape(content.value);
	xmlHttp.open("GET",url,true);
	xmlHttp.onreadystatechange=callback;
	xmlHttp.send(null);
	
}

//Get XmlHttp Object
function createXMLHttp(){
	var xmlHttp;
	if(window.XMLHttpRequest){
		xmlHttp=new XMLHttpRequest();
	}
	if(window.ActiveXObject){
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		if(!xmlHttp){
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
	}
	return xmlHttp;
}

//Callback Function
function callback(){
	if(xmlHttp.readyState==4){  		
		if(xmlHttp.status==200){
			var result=xmlHttp.responseText;
			var json=eval("("+result+")");
			setContent(json);
		}
	}
}

//Set the contents and attributes of the pop-up table
function setContent(contents){
	clearContent();//Clear the previous contents after user key in diffenent words
	setLocation();
	var size=contents.length;
	if(size>0){
		for(var i=0;i<size;i++){
		var nextNode=contents[i];
		var tr=document.createElement("tr");
		var td=document.createElement("td");
		td.setAttribute("height",document.getElementById("keyword").offsetHeight+"px");
		td.setAttribute("border","0");
		td.setAttribute("bgcolor","#FFFFFF");
		td.onmouseover=function(){
			this.className='mouseOver';
		};
		td.onmouseout=function(){
			this.className='mouseOut';
		};
		td.onclick=function(){
			
		};
		var text=document.createTextNode(nextNode);
		td.appendChild(text);
		tr.appendChild(td);
		document.getElementById("content_table_body").appendChild(tr);
		}
	}  	 
}

//Clear the pop-up table
function clearContent(){
	var contentTableBody=document.getElementById("content_table_body");
	var size=contentTableBody.childNodes.length;
	if(size>0){
		for(var i=size-1;i>0;i--){
			contentTableBody.removeChild(contentTableBody.childNodes[i]);
		}
	}
	document.getElementById("popDiv").style.border="none"; 	
}

//Clear the pop-up table when user clicks on other place than the search bar
function keywordBlur(){
	clearContent();
}

//set the location of the pop-up table
function setLocation(){
	var content=document.getElementById("keyword");
	var width=content.offsetWidth;
	var height=content.offsetHeight;
	var left=content["offsetLeft"]-1;
	var top=content["offsetTop"]+height+1;
	var popDiv=document.getElementById("popDiv");
	popDiv.style.border="#DADADA 1px solid";
	popDiv.style.position="absolute";
	popDiv.style.width=width+"px";
	popDiv.style.left=left+"px";
	popDiv.style.top=top+"px";
	document.getElementById("content_table").style.width=width+"px";
}
//Google Custom Search
var myCallback = function() {
	  if (document.readyState == 'complete') {
	    // Document is ready when CSE element is initialized.
	    // Render an element with both search box and search results in div with id 'keyword'.
	    google.search.cse.element.render(
	        {
	          div: "keyword",
	          tag: 'search'
	         });
	  } else {
	    // Document is not ready yet, when CSE element is initialized.
	    google.setOnLoadCallback(function() {
	       // Render an element with both search box and search results in div with id 'keyword'.
	        google.search.cse.element.render(
	            {
	              div: "keyword",
	              tag: 'search'
	            });
	    }, true);
	  }
	};
	
	window.__gcse = {
	parsetags: 'explicit',
	callback: myCallback
	};
(function() {
  var cx = '004078632594727378043:tdtdg3zhjc8';
  var gcse = document.createElement('script');
  gcse.type = 'text/javascript';
  gcse.async = true;
  gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(gcse, s);
})();