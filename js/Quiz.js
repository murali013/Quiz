var Quiz = angular.module("Quiz", ['ngRoute', 'base64', 'ngDragDrop']);

Quiz.controller(mainController);

/**
* Main Controller for the Quiz
**/
function mainController($scope, $base64, $element, GetJson)
{
	$scope.json = GetJson.data();
	
	// Get the Headings
	$scope.heading1 = "Introduction";
	$scope.heading2 = $scope.json["contents"][0]["contentTitle"];
	$scope.heading3 = $scope.json["contents"][1]["contentTitle"];
	$scope.heading4 = $scope.json["contents"][2]["contentTitle"];
	$scope.heading5 = "Complete this tutorial";
	
	/**
	 *	Introduction 
	 **/
	$scope.title = $scope.json["title"];
	$scope.level = $scope.json["englishLevel"];
	var duration = $scope.json["duration"];
	var time = "";
	if ((duration / 60) > 1)
	{
		time = (duration % 60) + " Hours";
		if (duration <= 1)
			time = (duration % 60) + " Hour";			
	}
	else 
	{
		time = duration + " Minutes";
		if (duration <= 1)
			time = duration + " Minute";
	}
	$scope.time = time;
	$scope.skill = $scope.json["skill"];
	$scope.subject = $scope.json["subject"];
	$scope.description = $scope.json["description"];
	
	
	/**
	 * 	Quiz 2 (drag and drop)
	 **/
	 $scope.answers = [];
	 $scope.source  = [];
	 $scope.destination = [];
	 
	 $scope.quiz = $scope.json["contents"][0]["contentTitle"];
	 $scope.query = $base64.decode($scope.json["contentDetails"][0]["contents"][0]["question"]);
	 var option = $scope.json["contentDetails"][0]["contents"][0]["shuffledData"];
	 for (var i = 0; i < option.length; i++)
	 {
		var opt = {
		 "model" :  $base64.decode(option[i].answer)		 
		};
		 $scope.source.push(opt);
	 }
	 
	  for (var j = 0; j < option.length; j++)
	 {
		var opt = {
		 "model" :  "ans"+j
		};
		 $scope.destination.push(opt);
	}	
	
	/**
	*	Quiz fill in the blank
	**/
	$scope.fillQuery = $base64.decode($scope.json["contentDetails"][1]["contents"][0]["question"]);
	
}

function mainRouteConfig($routeProvider){

	var baseURL = "/template/";
	$routeProvider.when('/INTRODUCTION', {
		templateUrl : baseURL + "introduction.html"
	}).
	when('/FILLBLANK', {
		templateUrl : baseURL + "quizfillblank.html"
	}).
	when('/DRAGDROP', {
		templateUrl : baseURL + "quizdragdrop.html"
	}).
	when('/TIME', {
		templateUrl : baseURL + "quizduration.html"
	}).
	when('/COMPLETE', {
		templateUrl : baseURL + "compelte.html"
	})
	.otherwise({
		templateUrl : baseURL + "introduction.html"
	});
}
Quiz.config(mainRouteConfig);
Quiz.factory("GetJson", function(){
	var GetJson = {};
	var data = {"nodeId":"267197","type":"tutorial","provider":1,"title":"Tutorial for bug fix","description":"Be the first to complete and like this tutorial","descriptionMedia":null,"created":"1404989607","englishLevel":"Beginner","duration":"30","skill":"Grammar","subject":"Industry Specific","totalViews":"3","alreadyReviewed":"no","totalComments":"0","totalLikes":"0","contents":[{"type":"quiz","contentId":"267199","contentTitle":"Quiz 2(drag and drop)","description":null},{"type":"quiz","contentId":"267198","contentTitle":"Quiz one(fill in blankx)","description":null},{"type":"image","contentId":"267200","contentTitle":"02-12-2013 PM 06-13-33","description":null}],"contentsVisited":null,"lastVisitedContentId":0,"status":[{"tutorialLevel":"notCompleted","percentage":"0%"}],"contentDetails":[{"nodeId":"267199","type":"quiz","title":"Quiz 2(drag and drop)","description":null,"created":"1404989807","englishLevel":"Beginner","duration":"10","skill":"Pronunciation,Vocabulary","subject":"Industry Specific","totalViews":null,"alreadyReviewed":"no","totalComments":"0","totalLikes":"0","questionType":"dragAndDrop","caseSensitive":"N","contents":[{"question":"VHlwZTxDSVRfYW5zd2VyPmFuc3dlcnNbMF08L0NJVF9hbnN3ZXI+aW5zdHJ1Y3Rpb25zLDxDSVRfYW5zd2VyPmFuc3dlcnNbMV08L0NJVF9hbnN3ZXI+IGFuZCA8Q0lUX2Fuc3dlcj5hbnN3ZXJzWzJdPC9DSVRfYW5zd2VyPmluIHRoZSB0ZXh0Ym94IG9uIHRoZSBsZWZ0LiBUaGVuLCA8Q0lUX2Fuc3dlcj5hbnN3ZXJzWzNdPC9DSVRfYW5zd2VyPiB0aGF0IDxDSVRfYW5zd2VyPmFuc3dlcnNbNF08L0NJVF9hbnN3ZXI+YW5zd2VycyBhbmQgY2xpY2sgPENJVF9hbnN3ZXI+YW5zd2Vyc1s1XTwvQ0lUX2Fuc3dlcj4gYXMgQW5zd2VyLiA8Q0lUX2Fuc3dlcj5hbnN3ZXJzWzZdPC9DSVRfYW5zd2VyPiA8Q0lUX2Fuc3dlcj5hbnN3ZXJzWzddPC9DSVRfYW5zd2VyPg==","answers":[{"id":0,"answer":"eW91cg=="},{"id":1,"answer":"cXVlc3Rpb25zLA=="},{"id":2,"answer":"YW5zd2Vycw=="},{"id":3,"answer":"c2VsZWN0IHRoZSB3b3Jkcw=="},{"id":4,"answer":"cmVwcmVzZW50IHRoZQ=="},{"id":5,"answer":"TWFyaw=="},{"id":6,"answer":"UmVwZWF0"},{"id":7,"answer":"dGhpcyBmb3IgZWFjaCBxdWVzdGlvbi4="}],"shuffledData":[{"answer":"TWFyaw==","occurrence":1},{"answer":"dGhpcyBmb3IgZWFjaCBxdWVzdGlvbi4=","occurrence":1},{"answer":"cXVlc3Rpb25zLA==","occurrence":1},{"answer":"c2VsZWN0IHRoZSB3b3Jkcw==","occurrence":1},{"answer":"cmVwcmVzZW50IHRoZQ==","occurrence":1},{"answer":"YW5zd2Vycw==","occurrence":1},{"answer":"eW91cg==","occurrence":1},{"answer":"UmVwZWF0","occurrence":1}],"questionMedia":null,"status":{"user_answer":false}}],"status":[{"quizLevel":"notCompleted","status":1,"result":[{"percentage":null,"correctAnswer":"0"}]}]},{"nodeId":"267198","type":"quiz","title":"Quiz one(fill in blankx)","description":null,"created":"1404989701","englishLevel":"Beginner","duration":"10","skill":"Grammar","subject":"Industry Specific","totalViews":null,"alreadyReviewed":"no","totalComments":"0","totalLikes":"0","questionType":"fill_in","caseSensitive":"N","contents":[{"question":"VHlwZTxDSVRfYW5zd2VyPmFuc3dlcnNbMF08L0NJVF9hbnN3ZXI+aW5zdHJ1Y3Rpb25zLDxDSVRfYW5zd2VyPmFuc3dlcnNbMV08L0NJVF9hbnN3ZXI+LCBhbmQgPENJVF9hbnN3ZXI+YW5zd2Vyc1syXTwvQ0lUX2Fuc3dlcj5pbiA8Q0lUX2Fuc3dlcj5hbnN3ZXJzWzNdPC9DSVRfYW5zd2VyPiBvbjxDSVRfYW5zd2VyPmFuc3dlcnNbNF08L0NJVF9hbnN3ZXI+VGhlbiwgc2VsZWN0IHRoZSB3b3JkcyB0aGF0IHJlcHJlc2VudCB0aGUgYW5zd2VycyBhbmQgY2xpY2sgPENJVF9hbnN3ZXI+YW5zd2Vyc1s1XTwvQ0lUX2Fuc3dlcj4gYXMgQW5zd2VyLiBSZXBlYXQgdGhpcyBmb3IgZWFjaCBxdWVzdGlvbi4=","answers":[{"id":0,"answer":"eW91cg=="},{"id":1,"answer":"cXVlc3Rpb25z"},{"id":2,"answer":"YW5zd2Vycw=="},{"id":3,"answer":"dGhlIHRleHRib3g="},{"id":4,"answer":"dGhlIGxlZnQu"},{"id":5,"answer":"TWFyaw=="}],"questionMedia":null,"status":{"user_answer":false}}],"status":[{"quizLevel":"notCompleted","status":1,"result":[{"percentage":null,"correctAnswer":"0"}]}]},{"nodeId":"267200","type":"image","title":"02-12-2013 PM 06-13-33","created":"1404989836","commentCount":0,"likeCount":0,"status":1,"path":"https://d2baxhafiqu7fc.cloudfront.net/files/ge/images/bloom_231764_1404989772490.preview.jpg","description":null}]};
	GetJson.data = function()
	{
		return data;
	};	
	return GetJson;	
});

Quiz.directive("getQuestion", function($compile){
	return {
		restrict: 'A',
		scope : true,
		link : function(scope, element, attrs){	
			element.html("<p>"+scope.query+"</p>");
			var text = angular.element("<div data-drop='true' data-jqyoui-options jqyoui-droppable class = 'container'></div>");
			var e = $compile(text)(scope);
			element.addClass("dragging");
			$(element).droppable({})
			element.find("CIT_answer").replaceWith(e);		
			
		}
	}
});


Quiz.directive("getFillQuestion", function($compile){
	return {
		restrict : 'A',
		scope : { fillquestion : "="},
		link :function(scope, element, attrs){
			element.html(scope.fillquestion);
			var text = angular.element("<input type = 'text'>");
			var e = $compile(text)(scope);
			element.find("CIT_answer").replaceWith(e);
		}		
	}
});