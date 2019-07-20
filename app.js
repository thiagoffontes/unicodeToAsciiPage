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

function syncScrolls () {
	let oInput = document.querySelector("#txinput");
	let oOutPut = document.querySelector("#txoutput");

	const scrollInput =  () => {
		oInput.scrollTop = oOutPut.scrollTop;
		oInput.scrollLeft = oOutPut.scrollLeft;
	};

	const scrollOutput =  () => {
		oOutPut.scrollTop = oInput.scrollTop;
		oOutPut.scrollLeft = oInput.scrollLeft;
	};

	oInput.addEventListener('scroll', scrollOutput, false);
	oOutPut.addEventListener('scroll', scrollInput, false);
}

function convertButton () {
	let oButton = document.querySelector("#convert");
	oButton.onclick = function() {
		let oInput = document.querySelector("#txinput");
		let oOutPut = document.querySelector("#txoutput");

		let outStr = "";

		for (let i = 0; i < oInput.value.length; i++){
			outStr += escapeCharacter(oInput.value[i]);
		}

		oOutPut.value = outStr;

		oOutPut.scrollTop = oInput.scrollTop;
		oOutPut.scrollLeft = oInput.scrollLeft;
	}	
}

window.onload = function() {
	
	clearTextAreas();
	syncScrolls();
	convertButton();

};
