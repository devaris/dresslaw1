


$(document).ready(function() {
								   

		$("#completedries").html("<p>ΣΥΝΟΛΟ ΠΡΟΣΠΑΘΕΙΩΝ: </p>"+window.parent.tries);
		
		
		$('.listItemQ1 li').each(function (j) {			
			$(this).append(window.parent.correctQArray[0][j]);							  
		});

		$('.listItemQ2 li').each(function (j) {
			$(this).append(window.parent.correctQArray[1][j]);							  
		});

		// WRONG
		$('.listItemW1 li').each(function (j) {
								
			$(this).append(window.parent.wrongQArray[0][j]);							  
		});

		$('.listItemW2 li').each(function (j) {
			$(this).append(window.parent.wrongQArray[1][j]);							  
		});
		
		//alert(window.parent.scoreArray.length)
		for(k=0;k<window.parent.scoreArray.length;k++){
			$("#scoreResL").append('<li>'+window.parent.scoreArray[k]+'</li>');	
		}
 		
});