// // progressbar.js@1.0.0 version is used
// // Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
app.controller('progressCtrl', ['$scope', function($scope){

  function drawProgressBar(videoVotes, voteGoal){
      

      var bar = new ProgressBar.Line('#progress' + $scope.$index, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 1500,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {width: '100%', height: '100%'},
        from: {color: '#109010'},
        to: {color: '#ED6A5A'},
        step: (state, bar) => {
          bar.path.setAttribute('stroke', state.color);
        }
      });

      bar.animate(videoVotes/voteGoal);  // Number from 0.0 to 1.0
  };

  $scope.videoVotes = 14;
  $scope.voteGoal = 16;
  window.setTimeout(function(){
    drawProgressBar($scope.videoVotes, $scope.voteGoal);
  }, 10);
  
  
}]);



// app.controller('progressCtrl', ['$scope', function($scope) {

//   function drawFirstCircleBar(videoVotes, voteLimit) {
//     var bar = new ProgressBar.Line(graph, {
//       color: '#aaa',
//       // This has to be the same size as the maximum width to
//       // prevent clipping
//       strokeWidth: 4,
//       trailWidth: 1,
//       easing: 'easeInOut',
//       duration: 3000,
//       text: {
//         autoStyleContainer: false
//       },
//       from: { color: '#ED6A5A', width: 1 },
//       to: { color: '#087830', width: 4 },
//       // Set default step function for all animate calls
//       step: function(state, circle) {
//         circle.path.setAttribute('stroke', state.color);
//         circle.path.setAttribute('stroke-width', state.width);

//         var value = Math.round(line.value() * voteLimit);
//         if (value === 0) {
//           circle.setText('');
//         } else {
//           circle.setText(value + "/" + voteLimit);
//         }
//       }
//     } );
//     console.log(videoVotes, voteLimit);
//     bar.animate(videoVotes / voteLimit);  // Number from 0.0 to 1.0
//     bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
//     bar.text.style.fontSize = '2rem';
//   }

//   $scope.showVotes = false;
//   $scope.numOfVidsEnded = 0;
//   $scope.video2NotStarted = true;

//   $scope.video1Votes = 12;
//   $scope.video2Votes = 15;
//   $scope.voteLimit = 16;
//   $scope.video1 = 'https://www.youtube.com/watch?v=bvZolRM7ifA&t=15s';
//   $scope.video2 = 'https://www.youtube.com/watch?v=-z9NwrIj6oA';
//   $scope.videoArr = [{video: $scope.video1, votes: $scope.video1Votes}, {video: $scope.video2, votes: $scope.video2Votes}];

//   // $scope.videoArr = shuffle($scope.videoArr);
//   // $scope.video1 = $scope.videoArr[0].video;
//   // $scope.video2 = $scope.videoArr[1].video;
//   // $scope.video1Votes = $scope.videoArr[0].votes;
//   // $scope.video2Votes = $scope.videoArr[1].votes;
//   console.log("video 1 votes: " + $scope.video1Votes);
//   console.log("video 2 votes: " + $scope.video2Votes);

//   $(document).ready(function() {
//     $('#mybutton').hide().delay(5 * 1000).fadeIn(500);
//   });

//   // autoplay the first video
//   $scope.player1Vars = {
//     autoplay: 1,
//     start: 0.01 // start at the beginning
//   }

//   // start the second video from the beginning
//   $scope.player2Vars = {
//     start: 0.01
//   }

// // voting functionality below
// $scope.showVidRank = function(whichVid) {
//   if (whichVid == 1) {
//     $scope.video1Votes++;
//   }
//   else {
//     $scope.video2Votes++;
//   }
//   drawFirstCircleBar($scope.video1Votes, $scope.voteLimit);
//   drawSecondCircleBar($scope.video2Votes, $scope.voteLimit);
// }

// }]);