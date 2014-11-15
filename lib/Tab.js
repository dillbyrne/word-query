var Tab = require("sdk/tabs");

exports.openURL = function(siteURL){

	Tab.open({
		url: siteURL 
	});
}

