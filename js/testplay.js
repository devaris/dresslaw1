var activeQuestion;
var wrongAnswers = 0;
var nextQuestionId = 0;


function getQuestion(id)
{
    return questions[id];
}

function displayQuestion(id)
{
    clearAnswerSection();
    question = getQuestion(id);
    activeQuestion = question;
    $("#question_title h2").html(question.name);
	
	//dresslaw
	$("#question_img").html(
	'<img src="' + site_url + 'images/questions/' + activeQuestion.photo + '" id="question_image" alt="photo" />'
	);
	
//    $("#question_title h2").attr("id", question.id);
    $("#questions_section").html("");
//    question.answers.forEach(function(a) {
//        $("#questions_section").append(
//                '<div class="q_ph"><input type="radio" name="question" id="' + a.id + '" value="' + a.cr + '" class="css-checkbox" /><label for="' + a.id + '" class="css-label">' + a.name + '</label></div>'
//                );
//    });
    
    $(question.answers).each(function (index, a){
        $("#questions_section").append(
                '<div class="q_ph"><input type="radio" name="question" id="' + a.id + '" value="' + a.cr + '" class="css-checkbox" /><label for="' + a.id + '" class="css-label">' + a.name + '</label></div>'
                );
    });

}

$(document).ready(function()
{
    displayQuestion(nextQuestionId);
    $("input[name='question']").on("change", function() {
        $("#submit_btn").attr("src", site_url + "images/submit-btn.png").addClass("btn");
    });
    $("#submit_btn").click(function() {
        submitAnswer(this);
    });
    //$("#answer_overlay").on("click", "#q_continue", function() {
	$("#answer_overlay").on("click", function() {
	
	
		/*
		parent.testName=testName;
		parent.testFileName=testFile;
		*/
		window.parent.wrongAnswers=wrongAnswers;
			
			
        if (nextQuestionId < questions.length)
            displayQuestion(nextQuestionId);
        else if (wrongAnswers > 0)
            //parent.goToPage('pages/test_failed.html?test=' + testName + "&num_of_wrongs=" + wrongAnswers + "&file=" + testFile);
			window.parent.goToPage('pages/test_failed.html');
			
        else {
			window.parent.goToPage('pages/test_success.html');
            /*
			if (window.parent.score < 75)
                //parent.goToPage('pages/test_success.html?test=' + testName + "&file=" + testFile);
				window.parent.goToPage('pages/test_success.html');
            else
                //parent.goToPage('pages/completed.html?file=' + testFile);
				window.parent.goToPage('pages/completed.html');
			*/
        }
    });
});

$(window).load(function() {
    preloadImages();
});

function submitAnswer(btn)
{
    if ($(btn).hasClass("btn"))
    {
        isTrue = $('input[type="radio"]:checked').val();
        clearQuestionsSection();
		
		
		//dresslaw
		$("#question_img").html("");
		
        $("#answer_overlay").html("");
		
		
		
        if (isTrue === 'true') {
			
			// Save Correct Q Ans
			//alert(window.parent.testNum)
			//alert(nextQuestionId)			
			window.parent.correctQArray[window.parent.testNum][nextQuestionId] = window.parent.correctQArray[window.parent.testNum][nextQuestionId]+1;
			
		
			window.parent.scoreLocal = window.parent.scoreLocal + 1;
			window.parent.clicks = window.parent.clicks + 1;
			
			
			var audio = new Audio('../audio/correct.mp3');
			audio.play();
						
			
            $("#answer_section").addClass("correct");
            $(".answer_status").html(correctLabel);
			
			//dresslaw
			$("#answer_overlay").append('<img src="' + site_url + 'images/correct.png' + '" id="answer_image" alt="photo" />\n\
													');
													/*
													<div id="redSpan">' + activeQuestion.redSpan + '</div>\n\
                                                    <div id="graySpan">' + activeQuestion.graySpan + '</div>
													*/
        }
        else
        {
			
			// Save Wrong Q Ans
			window.parent.wrongQArray[window.parent.testNum][nextQuestionId] = window.parent.wrongQArray[window.parent.testNum][nextQuestionId]+1;
			
		
			window.parent.scoreLocal = window.parent.scoreLocal - 1;
			window.parent.clicks = window.parent.clicks + 1;
			
			var audio = new Audio('../audio/wrong.mp3');
			audio.play();
			
			
            $("#answer_section").addClass("incorrect");
            $(".answer_status").html(incorrectLabel);
            wrongAnswers++;
			
			//dresslaw
			$("#answer_overlay").append('<img src="' + site_url + 'images/wrong.png' + '" id="answer_image" alt="photo" />\n\
                                                    ');
													/*
													<div id="redSpan">' + activeQuestion.redSpan + '</div>\n\
                                                    <div id="graySpan">' + activeQuestion.graySpan + '</div>
													*/
													
        }
		
		
		
        /*$("#answer_overlay").append('<img src="' + site_url + 'images/questions/' + activeQuestion.photo + '" id="answer_image" alt="photo" />\n\
                                                    <div id="redSpan">' + activeQuestion.redSpan + '</div>\n\
                                                    <div id="graySpan">' + activeQuestion.graySpan + '</div>');
		*/
        // $("#q_continue").show();
        $("#answer_overlay").append('<span id="q_continue">' + continueBtn + ' ></span>');
        nextQuestionId++;
    }
}
function clearQuestionsSection()
{
    $("#questions_section").hide();
    $("#submit_btn").hide();
    $("#answer_section").show();
}
function clearAnswerSection()
{
    $("#answer_section").hide();
    $("#answer_section").removeClass("correct incorrect");
    // $("#q_continue").hide();
    $("#questions_section").show();
    $("#submit_btn").show();
}
function preloadImages()
{
    $('<img/>')[0].src = site_url + 'images/checked.png';
    $('<img/>')[0].src = site_url + 'images/checked-m.png';
    $('<img/>')[0].src = site_url + 'images/incorrect-bg.png';
    $('<img/>')[0].src = site_url + 'images/correct-bg.png';
    $(questions).each(function(q) {
        $('<img/>')[0].src = site_url + 'images/questions/' + q.photo;
    });
}