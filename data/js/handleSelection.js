self.on("click", function (node, data) {

	var text = window.getSelection().toString().trim();
	var message;

	if(data == "dict")
		message = "http://dictionary.reference.com/browse/"+text;
	else if (data == "thes")
		message = "http://thesaurus.reference.com/browse/"+text;
	else if (data == "tran")
		message = "http://translate.reference.com/?query="+text;

//"https://translate.google.com/?#auto/en/query goes here"
//"translate.reference.com/english/dutch/query goes here/"
	
	self.postMessage(message);
	
});
