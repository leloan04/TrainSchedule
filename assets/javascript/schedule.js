//Initialize Firebase
var config = {
    apiKey: "AIzaSyBoczOfj584IdtHwo9uZJMTC6ykVvHnfIc",
    authDomain: "my-awesome-project-c2600.firebaseapp.com",
    databaseURL: "https://my-awesome-project-c2600.firebaseio.com",
    projectId: "my-awesome-project-c2600",
    storageBucket: "my-awesome-project-c2600.appspot.com",
    messagingSenderId: "321708718722"
  };
  firebase.initializeApp(config);

//Assign reference to database with variable
var database = firebase.database();

//Code for what happens whenever user clicks on the submit button and adds train to table
$("#addTrainButton").on("click", function(event) {
    event.preventDefault();

//Create variables for the input values on train table whenever a user adds train information
    var trainName = $("#trainInput").val().trim();
    var trainDestination = $("#destinationInput").val().trim();
    var firstTrainTime = moment($("#firstTrainTimeInput").val().trim(), "hh:mm").subtract(1, "years").format("X");
    var trainFrequency = $("#frequencyInput").val().trim();

    if (trainName != "" | trainDestination != "" | firstTrainTime != "" | trainFrequency != "") {
        var addTrain = {
            name: trainName,
            destination: trainDestination,
            time: firstTrainTime,
            frequency: trainFrequency
        }
        database.ref().push(addTrain);
    }
    else {

    }
//Empty entry fields for new Trains

    $("#trainInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTimeInput").val("");
    $("#frequencyInput").val("");
})

database.ref().on("child_added", function(snapshot){
    var currentTrain = snapshot.val();
    var trainKey = snapshot.key;

    var firstTrainTimeConvert = moment.unix(currentTrain.start, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var timeDifference = moment().diff(moment(firstTrainTimeConvert), "minutes");
    var minutesApart = timeDifference % currentTrain.frequency;
    var minutesAway = currentTrain.frequency - minutesApart;
    var nextTrain = moment().add(minutesAway, "minutes");

    $("#trainInformation").append("<tr><td>" + currentTrain.name 
    + "</td><td>" + currentTrain.destination 
    + "</td><td>" + currentTrain.frequency
    + "</td><td>" 
    + moment(nextTrain). format("hh:mm a") 
    + "</td><td>" + minutesAway 
    + "</td><td><button class='btn btn-default removeTrain'>Remove</button></td><tr>")
})
//Time functionality for the trains

$(".removeTrain").on("click", function() {
    var removeButton = $(this).attr("data-key");
    $(".removeTrain" + removeButton).remove();
})