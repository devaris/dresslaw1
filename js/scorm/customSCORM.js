//javascript
var testNames = ["Low calorie sweeteners","Artificiality","Energy balance and active lifestyle","Ingredients"];
var testFileNames = ["low_calorie","artificiality","energy_balance","ingredients"];
var numOfQuestions = ["6","7","6","10"];
	

var testNum=0;
var correctQArray = [[0,0,0,0,0],[0,0,0,0,0]];
var wrongQArray = [[0,0,0,0,0],[0,0,0,0,0]];
var tries = 0;


var scoreLocal = 0;
var clicks = 0;
var scoreArray = [];


var testwrongtime = [0,0];

var testName;
var testFileName;
var numOfQuestion;
var wrongAnswers;

// CCS Params
var scorm = pipwerks.SCORM;
var lmsConnected = false;
var unloaded = false;
var hasSCORMscore = false;

// Default Params
var userName = "";
var userId = "";
var solvedTests = "";
var score = 0;


function traceMsg(msg){
	//alert(msg);
	//window.close();
}

function show(val){
   console.log(val);
}


/***** DEFAULT ************************************/
function setLocation(successChapter){
	
	/*
	var scormLocated = scorm.get("cmi.core.lesson_location");
	traceMsg("setLocation 1 > scormLocated: "+scormLocated);
	
	
	//if (scormLocated == "unknown" || scormLocated == "" || scormLocated == "null") {
		//scormLocated = "";			
	//} 
	
	
	//scormLocated += successChapter + "/";	
	scormLocated += successChapter;	
	
	var scormNewLocation = scorm.set("cmi.core.lesson_location", scormLocated);
	scorm.save();
	
	solvedTests = scormLocated;
	
	traceMsg("setLocation 2 > scormLocated: "+scormLocated+" | scormNewLocation: "+scormNewLocation);
	*/
	
}

function goToPage(pageUrl, saveLocation){
	
	$("#contentFrame").attr("src", pageUrl);
	
	saveLocation = saveLocation || false;
	
	if (saveLocation) {
		
		var scormLocation = scorm.set("cmi.core.lesson_location", pageUrl);		
		scorm.save();	
		
	} else {
		scormLocation = false;
	}
	
	traceMsg("'goToPage' > scormLocation: "+scormLocation+" | pageUrl: "+pageUrl);
}

function saveSolvedTests(thistest){
	
	traceMsg("! saveSolvedTests 1 > thistest: "+thistest);
	
	if (solvedTests == "unknown" || solvedTests == "" || solvedTests == "null") {
		solvedTests = "";			
	} 
	
	solvedTests += thistest + ",";	
	//solvedTests += thistest;	
	
	var scormSolvedTests = scorm.set("cmi.suspend_data", solvedTests);

	scorm.save();
	
	traceMsg("! saveSolvedTests 2 > solvedTests: "+solvedTests+" | scormSolvedTests: "+scormSolvedTests);

}

function saveScore()
{
	// dresslaw
	//score = score+25;
	score = score+50;
	
	var scormScore = scorm.set("cmi.core.score.raw", score);
	var scaledScore = score / 100;
	//var scormScaledScore = scorm.set("cmi.score.scaled", scaledScore);

	if (score == 100) {
		//var scormSuccess = scorm.set("cmi.success_status", "passed")
		var scormCompletion = scorm.set("cmi.core.lesson_status", "completed");
	} else {
		//scormSuccess = scorm.set("cmi.success_status", "failed")
		scormCompletion = scorm.set("cmi.core.lesson_status", "incomplete");
	}
	
	scorm.save();
	
	//traceMsg("!!! Save Score > score: "+score+" | scormScore: "+scormScore+" | scormScaledScore: "+scormScaledScore+" | scormSuccess: "+scormSuccess+" | scormCompletion: "+scormCompletion);
	traceMsg("!!! Save Score > score: "+score+" | scormScore: "+scormScore+" | scormCompletion: "+scormCompletion);
}

function exit(){
	unloadHandler();
	location.href = "http://www.google.com";
}
/************************************************************/
function setScoreResult(result, qcount, isScorable) {
	//scorm.set("cmi.core.score.raw", result);
	//scorm.set("cmi.core.score.max", qcount);
	//scorm.set("cmi.core.score.min", qcount/2.5);
	if (isScorable) {	
		//scorm.set("cmi.core.score.raw", result);
		if (result > qcount/2.5) {
			//scorm.set("cmi.success_status", "passed")
			scorm.set("cmi.core.lesson_status", "completed");
		} else {
			//scorm.set("cmi.success_status", "failed")
			scorm.set("cmi.core.lesson_status", "failed");			
		}
	} else {
		//scorm.set("cmi.success_status", "completed")
		scorm.set("cmi.core.lesson_status", "completed");
	}
	scorm.save();
	scorm.quit();
}

function setComplete(){

	//If the lmsConnection is active...
	if(lmsConnected){

		//... try setting the course status to "completed"
		var success = scorm.set("cmi.core.lesson_status", "completed");

		//If the course was successfully set to "completed"...
		if(success){
	
			//... disconnect from the LMS, we don't need to do anything else.
			traceMsg("You have already completed the course.");
			scorm.quit();
		
		//If the course couldn't be set to completed for some reason...
		} else {
	
			//alert the user and close the course window
			//traceMsg("Error: Course could not be set to complete!");
			scorm.set("cmi.core.lesson_status", "completed");
			scorm.save();
			scorm.quit();
		}

	//If the course isn't connected to the LMS for some reason...
	} else {
	
	//alert the user and close the course window
	//traceMsg("Error: Course is not connected to the LMS");
	
	}

}

function initCourse(){
	
	//scorm.init returns a boolean
	lmsConnected = scorm.init();
	//If the scorm.init function succeeded...
	if(lmsConnected){

		/**** Let's get the completion status to see if the course has already been completed ****/
		var completionStatus = scorm.get("cmi.core.lesson_status");
		traceMsg("get completionStatus: "+completionStatus);
		
		//If the course has already been completed...
		if(completionStatus == "completed"){
		
			//...let's display a message and close the browser window
			//traceMsg("You have already completed this course. You do not need to continue.");
			alert("Course already completed!");
		
		} else if (completionStatus == "unknown") {
			scorm.set("cmi.core.lesson_status", "incomplete");
		}
		
		/**** Now let's get the username from the LMS ****/
		var learnername = scorm.get("cmi.core.student_name");
		traceMsg("learnername: "+learnername);
		//If the name was successfully retrieved...
		if(learnername){  	
		}
		
		// Default
		userName = learnername;
		userId = scorm.get("cmi.core.student_id");	
		
		/**** SUSPEND DATA *****/
		var scormSolvedTests = scorm.get("cmi.suspend_data");
		solvedTests = scormSolvedTests;
		traceMsg("INIT GET > solvedTests: "+solvedTests+" | scormSolvedTests: "+scormSolvedTests);
		
		
		/* TEST 0 - USE LOCATION instead of SUSPEND
		var scormSolvedTests = scorm.get("cmi.core.lesson_location");
		solvedTests = scormSolvedTests;
		traceMsg("INIT GET > solvedTests: "+solvedTests+" | scormSolvedTests: "+scormSolvedTests);
		*/
		
		/* TESTING 1
		setLocation();
		*/
		/* TESTING 2
		scorm.set("cmi.core.lesson_location", "artificiality");
		var scormSolvedTests = scorm.get("cmi.core.lesson_location");
		solvedTests = scormSolvedTests;
		traceMsg("INIT GET 2> solvedTests: "+solvedTests+" | scormSolvedTests: "+scormSolvedTests);
		*/
		
		
		/**** Default Score *****/
		var scormMinScore = scorm.set("cmi.core.score.min", "0");
		var scormMaxScore = scorm.set("cmi.core.score.max", "100");
		
		var savedScore = scorm.get("cmi.core.score.raw");
		//var savedScaledScore = scorm.get("cmi.score.scaled");
		
		
		if (savedScore == "unknown" || savedScore == "" || savedScore == "null") {
			score = 0;
			
		} else {
			//score = parseInt(savedScore);
			score = savedScore*1;
		}
		//traceMsg("INIT GET > score: "+score+" | savedScore: "+savedScore+" | savedScaledScore: "+savedScaledScore+" | scormMinScore: "+scormMinScore+" | scormMaxScore: "+scormMaxScore);
		traceMsg("INIT GET > score: "+score+" | savedScore: "+savedScore+" | scormMinScore: "+scormMinScore+" | scormMaxScore: "+scormMaxScore);
		
		savedScore = scorm.set("cmi.core.score.raw ", score);
		//savedScaledScore = scorm.set("cmi.score.scaled", (score / 100));
		
		//traceMsg("INIT SET > savedScore: "+savedScore+" | savedScaledScore: "+savedScaledScore);
		traceMsg("INIT SET > savedScore: "+savedScore);
		
		// Default		
		/*
		var bookmark = scorm.get("cmi.core.lesson_location");
		
		traceMsg("INIT GET> bookmark: "+bookmark);
		
		if (bookmark == "unknown" || bookmark == "" || bookmark == "null") {
			scorm.set("cmi.core.lesson_location", "pages/landing.html");
		}
		var bookmark = scorm.get("cmi.core.lesson_location");
		
		traceMsg("INIT after SET> bookmark: "+bookmark);
		*/
		// if (bookmark == "" || bookmark == "null") {
		goToPage('pages/landing.html');
		/*
		}else {
		goToPage(bookmark);
		}
		*/

	//If the course couldn't connect to the LMS for some reason...
	} else {
		
		goToPage('pages/landing.html');
		
		//... let's alert the user then close the window.
		traceMsg("Error: Course could not connect with the LMS");	
	}
	
	scorm.save();

}

function unloadHandler(){
	traceMsg("unloadHandler");
	if(!unloaded){
		traceMsg("Save on Quit");
		scorm.save(); //save all data that has already been sent
		scorm.quit(); //close the SCORM API connection properly
		unloaded = true;
	}
}

$(document).ready(function() {
	window.onbeforeunload = unloadHandler;
	window.onunload = unloadHandler;
	initCourse();
	
	
});