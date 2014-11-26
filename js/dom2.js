console.log(BuildJson());

function BuildJson(object){
    var object = object || document.getElementsByTagName('body')[0];
	var jsonobj={};
	jsonobj.tag=object.tagName;
	if(object.hasAttribute){
		for(i=0;i<object.attributes.length;i++){
			jsonobj[object.attributes[i].name] = object.attributes[i].value;
		}	
	}
	
	if (object.hasChildNodes()) {
		var child = object.firstChild;
		if(child.nodeType === 3 && child.data.trim()!=''){////node type===3 for the text node
			jsonobj.content=child.data.trim();
		}
		
		if((child.nodeType === 3 && child.nextSibling)||child.nodeType === 1){/////node type===3 and no sibling means no children other than text node as the child
			jsonobj.children=[];
		}
		
      	while (child) {
			if (child.nodeType === 1 && child.nodeName != 'SCRIPT') {/////node type===1 for element tags and avoiding script nodename
			  
			  jsonobj.children.push(BuildJson(child));
			}
			child = child.nextSibling;
      	}
    }
	
    return jsonobj;
}
 