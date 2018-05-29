
// https://obb-train-schedule.firebaseio.com (Firebase project link)

//Just dynamically adding a photo to the background
$(".jumbotron").css("background-image","url(images/vienna.jpg)");


// Initializing Firebase
var config = {
    apiKey: "AIzaSyCJqEV-tlLHJQgMBwM7oqZyAZJInxKlWs8",
    authDomain: "obb-train-schedule.firebaseapp.com",
    databaseURL: "https://obb-train-schedule.firebaseio.com",
    projectId: "obb-train-schedule",
    storageBucket: "obb-train-schedule.appspot.com",
    messagingSenderId: "218123717330"
  };
  firebase.initializeApp(config);

 //Creating a variable to reference the database.
    
 var database = firebase.database();

    // Initial Values
    var trainName = "";
    var destination = "";
    var firstDeparture = "";
    var frequency = "";

    // Capture Button Click
    $("#add-train").on("click", function(event) {
      event.preventDefault();

      // Capture values from text boxes
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstDeparture = $("#first-departure").val().trim();
    frequency = $("#frequency").val().trim();

      var train = {
          "train": trainName,
          "destination": destination,
          "departure": firstDeparture,
          "frequency": frequency
      }

      // Pushing values to Firebase
      database.ref().push(train);

    console.log(trainName);
    console.log(destination);
    console.log(firstDeparture);
    console.log(frequency);

    // Code for setting the time of the next departure

    var firstDepartureConverted = moment(firstDeparture, "HH:mm").subtract(1, "years");
    console.log(firstDepartureConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


    
    });

    // Clear input from form
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-departure").val("");
    $("#frequency").val("");


    // Creating a Firebase event for adding the trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var firstDeparture = childSnapshot.val().departure;
    var frequency = childSnapshot.val().frequency;
  

    // Add the information of the trains to the table
  $("#train-info > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  firstDeparture + "</td><td>" + frequency + "</td></tr>");

});


   