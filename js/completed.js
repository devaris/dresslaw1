$(document).ready(function() {
	$(".user_name").html(parent.userName);
	//var thisTest = getUrlVar('file');
	
	// CCS //
	var thisTest = window.parent.testFileName;
	
	window.parent.setLocation(thisTest);

	/* Default
	parent.solvedTests += thisTest + ",";
	parent.saveSolvedTests();
	*/
	window.parent.saveSolvedTests(thisTest);
	
	//parent.score += 25;
	window.parent.saveScore();

});