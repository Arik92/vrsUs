app.controller( 'btlCtrl1', function($scope, $stateParams, $location, authFactory, btlFactory){
  $scope.user = authFactory.currentUser;
  console.log("state param is: ", $stateParams.id);

  $scope.updateUnmatched = function() {
    btlFactory.getAllUnmatched().then(function(result){
      $scope.allUnmatched = result;
    }, function(error){
      throw (error);
    }); // promise callbacks
  } //update ongoing battles

  $scope.updateOngoing = function() {
    btlFactory.getAllOngoing().then(function(result){
      $scope.allOngoing = result;
    }, function(error){
      throw (error);
    }); // promise callbacks
  } //update ongoing battles

  $scope.updateRecords = function() {
    btlFactory.getAllRecords().then(function(result){
      $scope.allRecords = result;
    }, function(error){
      throw (error);
    }); // promise callbacks
  } //update ongoing battles



if ($stateParams.id) {
  btlFactory.getUnmatched($stateParams.id).then(function(result){
    $scope.featuredVid = result;
      $scope.thumb = $scope.getThumb(result.video, 'small');
    console.log("this is the featured vid ", $scope.featuredVid);
  }, function(error){
    throw error;
  });
}



  // if (!$stateParams.urlParam) {
  //   console.log("hellos");
  //   btlFactory.getUnmatched($stateParams.id)
  //     .then(function(btl) {
  //       $scope.btl = btl;
  //     })
  // } else {
  //   console.log("hello");
  //   // which beer are we reviewing now? The following one:
  //   $scope.btl = $stateParams.urlParam; // which we got by clicking on the Review link we created
  // }


     /*$scope.getUnjoined = function() {
    }; //get all unjoined battles from server. also: //unjoinedUpdate
    $scope.getOngoing = function(){
    }; // get all ongoing battles. MIGHT RELOCATE
    $scope.addOngoing = function(){
    }; // add a new ongoing battle. delete corresponding unjoined instance NOTE: will we even need these? */
    $scope.addUnjoined = function() {
      var user = authFactory.getCurrentUser().then(function(user){
        console.log("user from inside btlctrl: ", user);
        var umObj = {
          battleName: $scope.bName,
          user: user._id,
          video: $scope.videourl,
          numVotes: $scope.numVotes
        }
        //console.log("number of votes: " + umObj.numVotes);
        btlFactory.addUnmatched(umObj).then(function(){
          $scope.updateUnmatched();
          alert("successfully opened a new battle!!");
          $location.path('/unmatched');
        });


      }); // NOTE: we want to know who's the user exactly when the button was clicked

      //create a new unmatched battle object to push
    }; //add a new unjoined battle to the collection and update

    $scope.foundMatch = function(unmatched) {
      var user = authFactory.getCurrentUser().then(function(user){
      //  authFactory.addOngoing();
       var ongoingObj = {
         battleName: unmatched.battleName,
         voteGoal: unmatched.numVotes,
         user1: unmatched.user,
         video1: unmatched.video,
         video1Votes: 0,
         user2: user._id ,
         video2: $scope.vidtext,
         video2Votes: 0,
         video1Voters: [],
         video2Voters: []
       }; // ongoingObj

       btlFactory.addOnGoing(ongoingObj).then(function(){//  result unmatched just as an id?
         btlFactory.deleteUnmatched(unmatched._id).then(function(result){
           console.log("deleted unmatched battle");
           $scope.updateUnmatched();
           // NOTE maybe add more functionality here?
         }); // deleting callback
         alert("added ongoing battle. ");
         $scope.updateOngoing();
         $location.path('/ongoing');
       });// add ongoing callback

     }) // getCurrentUser callback
   }; //foundMatch   NOTE: TRANSITION: UNMATCHED==> ONGOING BATTLE
   $scope.voted = function (battle, numVideo) {
     var user = authFactory.getCurrentUser().then(function(user){
       if (numVideo===1) {
        battle.video1Votes++;
        battle.video1Voters.push(user._id);
       } else {
        battle.video2Votes++;
        battle.video2Voters.push(user._id);
       }//else
       btlFactory.updateVotes(battle).then(function(result){
         if ((battle.video1Votes === battle.voteGoal)||(battle.video2Votes===battle.voteGoal)) { //wanna say >= but that SHOULDNT happen
           $scope.finishBattle(battle);
         } else {
           //display result progress bars and related videos. which Im not sure how to tackle
         }// else voting commented but no winner yet
       }, function(error){
         throw error;
       }) //update callback
     }//get current user callback
   }// voted function

   $scope.finishBattle = function(battle){
     var recordObj = {
       battleName: battle.battleName,
       date: new Date(),
       voteGoal: battle.voteGoal
     }// solid parameters on recordObj
     if (battle.video1Votes > battle.video2Votes) {
       recordObj.winner = battle.user1;
       recordObj.winnerVotes = battle.user1Votes;
       recordObj.winnerVideo = battle.video1;
       recordObj.loser = battle.user2;
       recordObj.loserVotes = battle.user2Votes;
       recordObj.loserVideo = battle.video2;
     } else {
       recordObj.winner = battle.user2;
       recordObj.winnerVotes = battle.user2Votes;
       recordObj.winnerVideo = battle.video2;
       recordObj.loser = battle.user1;
       recordObj.loserVotes = battle.user1Votes;
       recordObj.loserVideo = battle.video1;
     } //else user2 won
     btlFactory.addRecord(recordObj).then(function(){//  result unmatched just as an id?
       btlFactory.deleteOngoing(battle._id).then(function(result){
         console.log("deleted battle");
         $scope.updateOngoing();
         // NOTE maybe add more functionality here?
       }); // deleting callback
       console.log("added record to the mix~ ");
       $scope.updateRecords();
     });// add record callback
   } //finishBattle NOTE: TRANSITION: ONGOING BATTLE ===> RECORD



    $scope.getVidId = function(){
    $scope.videourl = $scope.vidtext;
    console.log("url is", $scope.videourl);
    var videoid = $scope.videourl.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if(videoid != null) {
      console.log("video id = ",videoid[1]);
      $scope.vidid = videoid[1];
    } else {
      console.log(videoid);
      alert("The youtube url is not valid.");
    }// else
  } //getVidId



  // $scope.updateUnmatced(); //NOTE: should run on start- up. maybe put on a different place
  // $scope.updateOngoing();
});
