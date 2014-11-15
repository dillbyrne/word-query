var cm = require("sdk/context-menu");
    Data = require("./Data"),
	Tab = require("./Tab");
	
var dictionary = cm.Item({ 
	image: Data.get("images/dictionary.png"), 
	label: "Query in Dictionary", 
	data: "dict" 
});

var thesaurus = cm.Item({ 
	image: Data.get("images/thesaurus.png"), 
	label: "Query in Thesaurus ", 
	data: "thes"
});

var translate = cm.Item({ 
	image: Data.get("images/translate.png"), 
	label: "Query translation", 
	data: "tran" 
});

var menu = cm.Menu({
	label: "Word Query",
	image: Data.get("images/icon16.png"),
	context: [ 
		cm.PredicateContext(checkText),
		cm.SelectionContext()
	],
	contentScriptFile: Data.get("js/handleSelection.js"),
	items: [
		dictionary,
		thesaurus,
		translate
	],
	onMessage:function (text){
		Tab.openURL(text);
	}
});

		
function checkText(data) {


	if ( data.selectionText  === null)
		return false;


	if (countWords(data.selectionText) > 1)
		showOrHideItem("hide");
	else
		showOrHideItem("show");
	
	return true;
};

function showOrHideItem(text){
	
	if(text == "hide" && menu.items.length == 3 ){
		
		menu.removeItem(dictionary);
		menu.removeItem(thesaurus);
	}
	else if(text == "show" && menu.items.length == 1 ){
		
		menu.removeItem(translate);
		menu.addItem(dictionary);
		menu.addItem(thesaurus);
		menu.addItem(translate);
	}
};


function countWords(s){
	
	//exclude  start and end white-space
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
	//2 or more space to 1
    s = s.replace(/[ ]{2,}/gi," ");
	// exclude newline with a start spacing
    s = s.replace(/\n /,"\n"); 
    
    return s.split(' ').length; 
};
