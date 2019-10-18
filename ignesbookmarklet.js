javascript: (function() {
var host = "";
var url =  host + "/ignes?q=" + escape(location.href); 

var txt = "";
var rankedtext = [];

var request = new XMLHttpRequest();
request.open("GET", url, true);
request.onreadystatechange = function() {
  var done = 4, ok = 200;
  if (request.readyState == done && request.status == ok) {
    if (request.responseText) {
    	var obj = JSON.parse(request.responseText);
		rankedtext = obj.texts;
		
		rankedtext.forEach(highlight);
		alert("Highlighted!");

    }
  }
};
request.send(null);


function highlight(txt, index, array) {

  var els, i="";
    if (txt) {
        txt = txt.toString();
    }

     if (!txt || txt.length == 0) {
        els = document.querySelectorAll(".hiColor");
        i = els.length;
        while (i--) {
            els[i].style.backgroundColor="transparent";
            els[i].className = "";
        }
        return null; 
    } 
    searchNode(document.body, txt.toUpperCase(), txt.length);
    els = document.querySelectorAll(".hiColor");
    if (els && els.length) {
        for (var i=0; i < els.length; i++) {
            els[i].style.backgroundColor="yellow";
        }
    }

}

    function searchNode(node, te, len) {
        var pos, skip=0, spannode, middlebit, endbit, middleclone; 
        if(node.nodeType==3) {
            pos=node.data.toUpperCase().indexOf(te); 
            if(pos>=0) {
                spannode=document.createElement("SPAN"); 
                spannode.className ="hiColor"; 
                middlebit=node.splitText(pos); 
                endbit=middlebit.splitText(len); 
                middleclone=middlebit.cloneNode(true); 
                spannode.appendChild(middleclone); 
                middlebit.parentNode.replaceChild(spannode,middlebit); 
                skip=1; 
            } 
        } else if ( node.nodeType==1 && node.childNodes && 
                node.tagName.toUpperCase()!="SCRIPT"&& node.tagName.toUpperCase!="STYLE") {
            for (var child=0; child < node.childNodes.length; ++child) {
                child=child+searchNode(node.childNodes[child], te, len); 
            } 
        } 
        return skip; 
    }

})();