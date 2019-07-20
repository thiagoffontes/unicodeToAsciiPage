function clearTextAreas(){
	document.querySelector("#txinput").value = "";
	document.querySelector("#txoutput").value = "";
}

function unicodeEscape(str) {
	return str.replace(/[\s\S]/g, function (escape) {
		return '\\u' + ('0000' + escape.charCodeAt().toString(16)).slice(-4);
	});
}

function isASCII(str, extended) {
	return (extended ? /^[\x00-\xFF]*$/ : /^[\x00-\x7F]*$/).test(str);
}

function escapeCharacter (inChar) {
	if (isASCII(inChar)){
		return inChar;
	} else {
		return unicodeEscape(inChar);
	}
}

window.onload = function() {
	
	clearTextAreas();

	let oButton = document.querySelector("#convert");
	oButton.onclick = function() {
		let oInput = document.querySelector("#txinput");
		let oOutPut = document.querySelector("#txoutput");

		let outStr = "";

		for (let i = 0; i < oInput.value.length; i++){
			outStr += escapeCharacter(oInput.value[i]);
		}

		oOutPut.value = outStr;
	}
};