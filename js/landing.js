$(document).ready(function() {
	$(".user_name").html(parent.userName);
	
	$("#landing_central a").each(function(){
		var circle = $(this).parent();
		
		window.parent.traceMsg("circle.children().attr(class): "+circle.children().attr("class"))
		window.parent.traceMsg("circle.children().attr(class) [>-1?]: "+window.parent.solvedTests.indexOf(circle.children().attr("class")))
		/*
		if (window.parent.solvedTests.indexOf(circle.children().attr("class")) > -1){					
			circle.addClass("passed");
		}
		*/
		window.parent.scoreLocal=0;
		window.parent.clicks=0;
	});
	
	$("#results").click(function(e) {
		parent.goToPage('pages/results.html', true);					 
	});									 
	//$("#landing_central a").click(function(e) {
	$("#landing_central").click(function(e) {
		if ($(this).parent().hasClass('passed')){
			e.preventDefault();
			
		} else {
			var anchor = $(this);
			//window.parent.traceMsg('anchor.html=' +anchor.html() + " | num_of_questions=" +anchor.attr("id") + " | file=" + anchor.attr("class"));
			//parent.goToPage('pages/test_start.html?test=' +anchor.html() + "&num_of_questions=" +anchor.attr("id") + "&file=" + anchor.attr("class"), true);
			
			//Dresslaw
			//parent.goToPage('pages/test1.html', true);
			parent.goToPage('tests/low_calorie.html', true);
			window.parent.testName = window.parent.testNames[0];
			window.parent.testFileName = window.parent.testFileNames[0];
			window.parent.numOfQuestion = window.parent.numOfQuestions[0];
			
		   
		   /* CCS //
		   switch ($(this).parent().attr("id")) {
				case "test1":
					window.parent.goToPage('pages/test1.html', true);
					
					window.parent.testName = window.parent.testNames[0];
					window.parent.testFileName = window.parent.testFileNames[0];
					window.parent.numOfQuestion = window.parent.numOfQuestions[0];
					
					break;
				case "test2":
					window.parent.goToPage('pages/test2.html', true);
					
					window.parent.testName = parent.testNames[1];
					window.parent.testFileName = parent.testFileNames[1];
					window.parent.numOfQuestion = parent.numOfQuestions[1];
					
					break;
				case "test3":
					window.parent.goToPage('pages/test3.html', true);
					
					window.parent.testName = parent.testNames[2];
					window.parent.testFileName = parent.testFileNames[2];
					window.parent.numOfQuestion = parent.numOfQuestions[2];
					
					break;
				case "test4":
					window.parent.goToPage('pages/test4.html', true);
					
					window.parent.testName = parent.testNames[3];
					window.parent.testFileName = parent.testFileNames[3];
					window.parent.numOfQuestion = parent.numOfQuestions[3];
					
					break;
				default:
					break;
			} 				   
		   */
		   
		}
	
	});
});