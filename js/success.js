$(document).ready(function() {
						   
	$("#username").html(window.parent.userName);

	//$(".test_name").html(getUrlVar('test'));
	// var thisTest = getUrlVar('file');
	
	// CCS //
	$(".test_name").html(window.parent.testName);
	var thisTest = window.parent.testFileName;
	
	window.parent.traceMsg("!!! thisTest: "+thisTest);
	
	window.parent.setLocation(thisTest);
	
	//Default
	/*
	if (parent.solvedTests === null) 
		parent.solvedTests = "";
	parent.solvedTests += thisTest + ",";
	*/
	window.parent.saveSolvedTests(thisTest);
	
	//parent.score += 25;
	window.parent.saveScore();
	
	console.log(parent.solvedTests);
	
	/*
	$(".topic_circles img").each(function(){
	var circle = $(this);
	
	
	if (window.parent.solvedTests.indexOf(circle.attr("id")) > -1)
		circle.addClass("passed");
	
	});
	
	*/
	var audio = new Audio('../audio/bravo.mp3');
	audio.play();
	
			
	if (window.parent.testFileName == "ingredients"){

		$("#h1_title").html('<p>ΜΠΡΑΒΟ ΚΕΡΔΙΣΕΣ!!!</p>'); 
		
		var totaliseScore = Math.round((window.parent.scoreLocal/ window.parent.clicks)*100);
		window.parent.scoreArray.push(totaliseScore);
		
		
		
		$("#center_section").html('<div class="results"><p>Tα σαῒνια επιβραβεύονται από τον Οίκο Γραβατών Παγώνη</p><br><img id="resimg1" src="../images/pagoni.png"><br><img id="resimg2" src="../images/bravo/balloons.gif"><br><img id="resimg3" src="../images/bravo/selffive.gif"><br><img id="resimg4" src="../images/bravo/frog.gif"></div>');
		
		
		//$("#center_section").html('');
	} else {
		window.parent.tries = window.parent.tries+1;
	}

$(".topic_circles img").click(function(e){
	var circle = $(this);
	
	window.parent.traceMsg("circle.hasClass(passed): "+circle.hasClass("passed"))
	
	if (circle.hasClass("passed")){
		e.preventDefault();		
	} else {
		//parent.goToPage('pages/test_start.html?test=' + lang[circle.attr("id")] + "&num_of_questions=" + circle.attr("alt") + "&file=" + circle.attr("id"), true);
		/*
		window.parent.traceMsg("lang[circle.attr]: "+lang[circle.attr("id")])
		window.parent.traceMsg("circle.attr(alt): "+circle.attr("alt"))
		*/
		window.parent.traceMsg("circle.attr(id): "+circle.attr("id"))
		
		//Dresslaw
			parent.goToPage('tests/ingredients.html', true);
			window.parent.testName = window.parent.testNames[3];
			window.parent.testFileName = window.parent.testFileNames[3];
			window.parent.numOfQuestion = window.parent.numOfQuestions[3];
		
		/* CCS //
	   switch (circle.attr("id")) {
			case "low_calorie":
				parent.goToPage('pages/test1.html', true);
				
				parent.testName = parent.testNames[0];
				parent.testFileName = parent.testFileNames[0];
				parent.numOfQuestion = parent.numOfQuestions[0];	
				
				break;
			case "artificiality":
				parent.goToPage('pages/test2.html', true);
				
				parent.testName = parent.testNames[1];
				parent.testFileName = parent.testFileNames[1];
				parent.numOfQuestion = parent.numOfQuestions[1];
				
				break;
			case "energy_balance":
				parent.goToPage('pages/test3.html', true);
				
				parent.testName = parent.testNames[2];
				parent.testFileName = parent.testFileNames[2];
				parent.numOfQuestion = parent.numOfQuestions[2];
				
				break;
			case "ingredients":
				parent.goToPage('pages/test4.html', true);
				
				parent.testName = parent.testNames[3];
				parent.testFileName = parent.testFileNames[3];
				parent.numOfQuestion = parent.numOfQuestions[3];
				
				break;
			default:
				break;
		} 
		*/
	}
})

});