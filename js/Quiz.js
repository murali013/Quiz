var Quiz = angular.module("Quiz", ['base64', 'ngDragDrop']);

Quiz.controller(mainController);

/**
* Main Controller for the Quiz
**/
function mainController($scope, $base64, $route, $element, GetJson)
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
	 $scope.option = $scope.json["contentDetails"][0]["contents"][0]["shuffledData"];
	 $scope.draganswers = $scope.json["contentDetails"][0]["contents"][0]["answers"];
	 for (var i = 0; i < $scope.option.length; i++)
	 {
		var opt = {
		 "model" :  $base64.decode($scope.option[i].answer)		 
		};
		 $scope.source.push(opt);
	 }
	 
	 for (var j = 0; j < $scope.option.length; j++)
	 {
		var opt = {
		 "model" :  "ans"+j
		};
		 $scope.destination.push(opt);
	 }	
	
	$scope.text1 = $scope.src1 = $base64.decode($scope.option[0].answer);
	$scope.text2 = $scope.src2 = $base64.decode($scope.option[1].answer);
	$scope.text3 = $scope.src3 = $base64.decode($scope.option[2].answer);
	$scope.text4 = $scope.src4 = $base64.decode($scope.option[3].answer);
	$scope.text5 = $scope.src5 = $base64.decode($scope.option[4].answer);
	$scope.text6 = $scope.src6 = $base64.decode($scope.option[5].answer);
	$scope.text7 = $scope.src7 = $base64.decode($scope.option[6].answer);
	$scope.text8 = $scope.src8 = $base64.decode($scope.option[7].answer);
	
	$scope.drop0 = "";
	$scope.drop1 = "";
	$scope.drop2 = "";
	$scope.drop3 = "";
	$scope.drop4 = "";
	$scope.drop5 = "";
	$scope.drop6 = "";
	$scope.drop7 = "";
	$scope.dropans1 = $scope.dropans2 = $scope.dropans3 = $scope.dropans4 = 1;
	$scope.dropans5 = $scope.dropans6 = $scope.dropans7 = $scope.dropans8 = 1;
	$scope.dropright1 = $scope.dropright2 = $scope.dropright3 = $scope.dropright4 = 0;
	$scope.dropright5 = $scope.dropright6 = $scope.dropright7 = $scope.dropright8 = 0;
	
		
	
	
	/**
	*	Quiz fill in the blank
	**/
	$scope.fillQuery = $base64.decode($scope.json["contentDetails"][1]["contents"][0]["question"]);
	$scope.answers = [];
	var ans = $scope.json["contentDetails"][1]["contents"][0]["answers"];
	for (var  i = 0; i < ans.length; i++)
	{
		var obj = {};
		obj[ans[i]["id"]] = $base64.decode(ans[i]["answer"]);
		$scope.answers.push(obj);
	}
	console.log($scope.answers);
	
	/**
	* Duration
	**/
	$scope.durationsrc = $scope.json["contentDetails"][2]["path"];
}

function mainRouteConfig($routeProvider){

	var baseURL = "template/";
	$routeProvider.when('/INTRODUCTION', {
		templateUrl : baseURL + "introduction.html",
		controller  : 'introductionController'
	}).
	when('/FILLBLANK', {
		templateUrl : baseURL + "quizfillblank.html",
		controller  : 'fillblankController'
	}).
	when('/DRAGDROP', {
		templateUrl : baseURL + "quizdragdrop.html",
		controller  : 'dragdropController'
	}).
	when('/TIME', {
		templateUrl : baseURL + "quizduration.html",
		controller  : 'timeController'
	}).
	when('/COMPLETE', {
		templateUrl : baseURL + "complete.html",
		controller  : 'endController'
	})
	.otherwise({
		templateUrl : baseURL + "introduction.html",
		controller  : 'introductionController'
	});
}


Quiz.controller('introductionController', function($rootScope){
	$rootScope.isintro = true;
	$rootScope.isdrag = false;
	$rootScope.isfillblank = false;
	$rootScope.istime = false;
	$rootScope.isend = false;
});

Quiz.controller('dragdropController', function($rootScope, $scope, $base64){
	$rootScope.isdrag = true;
	$rootScope.isintro = false;
	$rootScope.isfillblank = false;
	$rootScope.istime = false;
	$rootScope.isend = false;
	
	$scope.clearDragAnswers = function(){
			$scope.dropans1 = $scope.dropans2 = $scope.dropans3 = $scope.dropans4 = 1;
			$scope.dropans5 = $scope.dropans6 = $scope.dropans7 = $scope.dropans8 = 1;
			$scope.dropright1 = $scope.dropright2 = $scope.dropright3 = $scope.dropright4 = 0;
			$scope.dropright5 = $scope.dropright6 = $scope.dropright7 = $scope.dropright8 = 0;
			
			$scope.src1 = $base64.decode($scope.option[0].answer);			
			$scope.src2 = $base64.decode($scope.option[1].answer);
			$scope.src3 = $base64.decode($scope.option[2].answer);
			$scope.src4 = $base64.decode($scope.option[3].answer);
			$scope.src5 = $base64.decode($scope.option[4].answer);
			$scope.src6 = $base64.decode($scope.option[5].answer);
			$scope.src7 = $base64.decode($scope.option[6].answer);
			$scope.src8 = $base64.decode($scope.option[7].answer);		
			$scope.drop0 = "";
			$scope.drop1 = "";
			$scope.drop2 = "";
			$scope.drop3 = "";
			$scope.drop4 = "";
			$scope.drop5 = "";
			$scope.drop6 = "";
			$scope.drop7 = "";			
			
	}
	
	$scope.showDragAnswers = function(){
		$scope.isClicked = true;
	
		$scope.dropans1 = $scope.dropans2 = $scope.dropans3 = $scope.dropans4 = 1;
		$scope.dropans5 = $scope.dropans6 = $scope.dropans7 = $scope.dropans8 = 1;
		console.log($base64.decode($scope.draganswers[0]["answer"]) + "" + $scope.drop1)
		if ($scope.drop0 == $base64.decode($scope.draganswers[0]["answer"]))
			$scope.dropright1 = 1;
		else
			$scope.dropans1 = 0;
			
		if ($scope.drop1 == $base64.decode($scope.draganswers[1]["answer"]))
			$scope.dropright2 = 1;			
		else
			$scope.dropans2 = 0;
		
		if ($scope.drop2 == $base64.decode($scope.draganswers[2]["answer"]))
			$scope.dropright3 = 1;			
		else
			$scope.dropans3 = 0;
		
		if ($scope.drop3 == $base64.decode($scope.draganswers[3]["answer"]))
			$scope.dropright4 = 1;			
		else
			$scope.dropans4 = 0;
			
		if ($scope.drop4 == $base64.decode($scope.draganswers[4]["answer"]))
			$scope.dropright5 = 1;
		else
			$scope.dropans5 = 0;
			
		if ($scope.drop5 == $base64.decode($scope.draganswers[5]["answer"]))
			$scope.dropright6 = 1;
		else
			$scope.dropans6 = 0;
			
		if ($scope.drop6 == $base64.decode($scope.draganswers[6]["answer"]))
			$scope.dropright7 = 1;
		else
			$scope.dropans7 = 0;	
			
		if ($scope.drop7 == $base64.decode($scope.draganswers[7]["answer"]))
			$scope.dropright8 = 1;
		else
			$scope.dropans8 = 0;
		
		
	}
});

Quiz.controller('fillblankController', function($rootScope){
	$rootScope.isfillblank = true;
	$rootScope.isdrag = false;
	$rootScope.isintro = false;
	$rootScope.istime = false;
	$rootScope.isend = false;
});
	
Quiz.controller('timeController', function($rootScope){
	$rootScope.istime = true;
	$rootScope.isdrag = false;
	$rootScope.isfillblank = false;
	$rootScope.isintro = false;
	$rootScope.isend = false;
});

Quiz.controller('endController', function($rootScope){
	$rootScope.isend = true;
	$rootScope.isdrag = false;
	$rootScope.isfillblank = false;
	$rootScope.istime = false;
	$rootScope.isintro = false;
});
Quiz.config(mainRouteConfig);
Quiz.factory("GetJson", function(){
	var GetJson = {};
	var data = {"nodeId":"267197","type":"tutorial","provider":1,"title":"Tutorial for bug fix","description":"Be the first to complete and like this tutorial","descriptionMedia":null,"created":"1404989607","englishLevel":"Beginner","duration":"30","skill":"Grammar","subject":"Industry Specific","totalViews":"3","alreadyReviewed":"no","totalComments":"0","totalLikes":"0","contents":[{"type":"quiz","contentId":"267199","contentTitle":"Quiz 2(drag and drop)","description":null},{"type":"quiz","contentId":"267198","contentTitle":"Quiz one(fill in blankx)","description":null},{"type":"image","contentId":"267200","contentTitle":"02-12-2013 PM 06-13-33","description":null}],"contentsVisited":null,"lastVisitedContentId":0,"status":[{"tutorialLevel":"notCompleted","percentage":"0%"}],"contentDetails":[{"nodeId":"267199","type":"quiz","title":"Quiz 2(drag and drop)","description":null,"created":"1404989807","englishLevel":"Beginner","duration":"10","skill":"Pronunciation,Vocabulary","subject":"Industry Specific","totalViews":null,"alreadyReviewed":"no","totalComments":"0","totalLikes":"0","questionType":"dragAndDrop","caseSensitive":"N","contents":[{"question":"VHlwZTxDSVRfYW5zd2VyPmFuc3dlcnNbMF08L0NJVF9hbnN3ZXI+aW5zdHJ1Y3Rpb25zLDxDSVRfYW5zd2VyPmFuc3dlcnNbMV08L0NJVF9hbnN3ZXI+IGFuZCA8Q0lUX2Fuc3dlcj5hbnN3ZXJzWzJdPC9DSVRfYW5zd2VyPmluIHRoZSB0ZXh0Ym94IG9uIHRoZSBsZWZ0LiBUaGVuLCA8Q0lUX2Fuc3dlcj5hbnN3ZXJzWzNdPC9DSVRfYW5zd2VyPiB0aGF0IDxDSVRfYW5zd2VyPmFuc3dlcnNbNF08L0NJVF9hbnN3ZXI+YW5zd2VycyBhbmQgY2xpY2sgPENJVF9hbnN3ZXI+YW5zd2Vyc1s1XTwvQ0lUX2Fuc3dlcj4gYXMgQW5zd2VyLiA8Q0lUX2Fuc3dlcj5hbnN3ZXJzWzZdPC9DSVRfYW5zd2VyPiA8Q0lUX2Fuc3dlcj5hbnN3ZXJzWzddPC9DSVRfYW5zd2VyPg==","answers":[{"id":0,"answer":"eW91cg=="},{"id":1,"answer":"cXVlc3Rpb25zLA=="},{"id":2,"answer":"YW5zd2Vycw=="},{"id":3,"answer":"c2VsZWN0IHRoZSB3b3Jkcw=="},{"id":4,"answer":"cmVwcmVzZW50IHRoZQ=="},{"id":5,"answer":"TWFyaw=="},{"id":6,"answer":"UmVwZWF0"},{"id":7,"answer":"dGhpcyBmb3IgZWFjaCBxdWVzdGlvbi4="}],"shuffledData":[{"answer":"TWFyaw==","occurrence":1},{"answer":"dGhpcyBmb3IgZWFjaCBxdWVzdGlvbi4=","occurrence":1},{"answer":"cXVlc3Rpb25zLA==","occurrence":1},{"answer":"c2VsZWN0IHRoZSB3b3Jkcw==","occurrence":1},{"answer":"cmVwcmVzZW50IHRoZQ==","occurrence":1},{"answer":"YW5zd2Vycw==","occurrence":1},{"answer":"eW91cg==","occurrence":1},{"answer":"UmVwZWF0","occurrence":1}],"questionMedia":null,"status":{"user_answer":false}}],"status":[{"quizLevel":"notCompleted","status":1,"result":[{"percentage":null,"correctAnswer":"0"}]}]},{"nodeId":"267198","type":"quiz","title":"Quiz one(fill in blankx)","description":null,"created":"1404989701","englishLevel":"Beginner","duration":"10","skill":"Grammar","subject":"Industry Specific","totalViews":null,"alreadyReviewed":"no","totalComments":"0","totalLikes":"0","questionType":"fill_in","caseSensitive":"N","contents":[{"question":"VHlwZTxDSVRfYW5zd2VyPmFuc3dlcnNbMF08L0NJVF9hbnN3ZXI+aW5zdHJ1Y3Rpb25zLDxDSVRfYW5zd2VyPmFuc3dlcnNbMV08L0NJVF9hbnN3ZXI+LCBhbmQgPENJVF9hbnN3ZXI+YW5zd2Vyc1syXTwvQ0lUX2Fuc3dlcj5pbiA8Q0lUX2Fuc3dlcj5hbnN3ZXJzWzNdPC9DSVRfYW5zd2VyPiBvbjxDSVRfYW5zd2VyPmFuc3dlcnNbNF08L0NJVF9hbnN3ZXI+VGhlbiwgc2VsZWN0IHRoZSB3b3JkcyB0aGF0IHJlcHJlc2VudCB0aGUgYW5zd2VycyBhbmQgY2xpY2sgPENJVF9hbnN3ZXI+YW5zd2Vyc1s1XTwvQ0lUX2Fuc3dlcj4gYXMgQW5zd2VyLiBSZXBlYXQgdGhpcyBmb3IgZWFjaCBxdWVzdGlvbi4=","answers":[{"id":0,"answer":"eW91cg=="},{"id":1,"answer":"cXVlc3Rpb25z"},{"id":2,"answer":"YW5zd2Vycw=="},{"id":3,"answer":"dGhlIHRleHRib3g="},{"id":4,"answer":"dGhlIGxlZnQu"},{"id":5,"answer":"TWFyaw=="}],"questionMedia":null,"status":{"user_answer":false}}],"status":[{"quizLevel":"notCompleted","status":1,"result":[{"percentage":null,"correctAnswer":"0"}]}]},{"nodeId":"267200","type":"image","title":"02-12-2013 PM 06-13-33","created":"1404989836","commentCount":0,"likeCount":0,"status":1,"path":"duration.jpg","description":null}]};
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
		replace : true,
		link : function(scope, element, attrs){	
			var text = angular.element("<div  class = 'container source' data-drop='true' data-jqyoui-options  jqyoui-droppable ><div class='container1 destination' data-drag='false' data-jqyoui-options  ng-model = 'ngModel' ng-bind = 'ngModel' jqyoui-draggable ng-hide = '!ngModel'></div></div>");	
			var e = $compile(text)(scope);
			element.addClass("dragging");
			element.find("CIT_answer").replaceWith(e);		
			var src = element.find('.source');
			var des = element.find('.destination');
			for (var i = 0; i < src.length; i++)
			{
				$(des[i]).attr("ng-hide", "!drop"+i);
				$(des[i]).attr("ng-model", "drop"+i);
				$(des[i]).attr("ng-bind", "drop"+i);
				$(src[i]).attr('ng-model', "drop"+i);
				$(src[i]).attr('aria-disabled', "false");
			}
			$compile(element.contents())(scope);
		},
		controller : function($scope, $base64){
			$scope.ques = $scope.query;
		}
	}
});


Quiz.directive("getFillQuestion", function($compile){
	return {
		restrict : 'A',
		scope : { fillquestion : "=",
				  fillanswers  : "="},
		transclude : true,
		link :function(scope, element, attrs){
			element.html("<p>"+scope.fillquestion+"</p>");
			var text = angular.element("<input type = 'text' ng-model= 'ngModel' ng-class ng-change = setUiState()>");
			var e = $compile(text)(scope);
			element.find("CIT_answer").replaceWith(e);	
			element.append("<div class = 'fillContainer'><input type = 'button' ng-disabled = 'isUiDisable' value = 'Clear Answers' ng-click = 'clearAnswers()'/><input type = 'button' value = 'Show Answers' ng-disabled = 'isUiDisable' ng-click = 'showAnswers()'/></div>");
			var test = element.find("input");
			for(var i = 0; i < test.length; i++)
			{				
				$(test[i]).attr('ng-model', "fill"+i);
				$(test[i]).attr('ng-class', "{red:wrong"+i+", green : right"+i+"}");
			}
			$compile(element.contents())(scope);
		},
		controller : function($scope){
			
			$scope.initUiState = function(){
				$scope.isUiDisable = true;
				$scope.fill0 = "";
				$scope.fill1 = "";
				$scope.fill2 = "";
				$scope.fill3 = "";
				$scope.fill4 = "";
				$scope.fill5 = "";				
			}
			$scope.initUiState();
			
			$scope.clearAnswers = function(){
				$scope.initUiState();
				$scope.wrong0 = false;
				$scope.right0 = false;
				
				$scope.wrong1 = false;
				$scope.right1 = false;
				
				$scope.wrong2 = false;
				$scope.right2 = false;
				
				$scope.wrong3 = false;
				$scope.right3 = false;
				
				$scope.wrong4 = false;
				$scope.right4 = false;
				
				$scope.wrong5 = false;
				$scope.right5 = false;
				
			}
			
			$scope.showAnswers = function(){
				if ($scope.fill0 == $scope.fillanswers[0]["0"])
				{
					$scope.right0 = true;
					$scope.wrong0 = false;								
				}
				else
				{
					$scope.right0 = false;
					$scope.wrong0 = true;	
				}
				
				if ($scope.fill1 == $scope.fillanswers[1]["1"])
				{
					$scope.right1 = true;
					$scope.wrong1 = false;								
				}
				else
				{
					$scope.right1 = false;
					$scope.wrong1 = true;	
				}
				
				if ($scope.fill2 == $scope.fillanswers[2]["2"])
				{
					$scope.right2 = true;
					$scope.wrong2 = false;								
				}
				else
				{
					$scope.right2 = false;
					$scope.wrong2 = true;	
				}
				
				if ($scope.fill3 == $scope.fillanswers[3]["3"])
				{
					$scope.right3 = true;
					$scope.wrong3 = false;								
				}
				else
				{
					$scope.right3 = false;
					$scope.wrong3 = true;	
				}
				
				if ($scope.fill4 == $scope.fillanswers[4]["4"])
				{
					$scope.right4 = true;
					$scope.wrong4 = false;								
				}
				else
				{
					$scope.right4 = false;
					$scope.wrong4 = true;	
				}
				
				if ($scope.fill5 == $scope.fillanswers[5]["5"])
				{
					$scope.right5 = true;
					$scope.wrong5 = false;								
				}
				else
				{
					$scope.right5 = false;
					$scope.wrong5 = true;	
				}
				
			}
			
			$scope.setUiState = function ()
			{
				$scope.isUiDisable = true;
				if ($scope.fill0.length != 0 || $scope.fill1.length != 0 || $scope.fill2.length != 0 || $scope.fill3.length != 0 || $scope.fill4.length != 0 || $scope.fill5.length != 0)
				{				
					$scope.isUiDisable = false;
				}
				else
					$scope.clearAnswers();
			}
			
		}	
	}
});

