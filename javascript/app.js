// Initial array of topics

var topics = ["matrix-the-movie", "alien the movie", "ex-machina", "star-wars", "terminator", "blade-runner", "back-to-the-future", "mad-max", "star-trek"];

// Variables
var limitImg = 10;

// displayImages function re-renders the HTML to display the appropriate content

function displayImages() {

  var topic = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=U2E0KeRa320EgNxloxFE3VwHL3OAKsxA&limit=" + limitImg;

  // Creating an AJAX call for the specific topic button being clicked

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);

      $("#images-view").empty();


      for (var index=0; index<limitImg; index++) {

        // Retrieving image info
        var rating = response.data[index].rating;
        var imgjpgURL = response.data[index].images.fixed_height_small.url;

        // Creating html elements for info
        var pOne = $("<p>").text("Rating: " + rating);

        // Creating html elements for the image  
        var image = $("<img>").attr("src", imgjpgURL);
        // Adding 
        image.addClass("image-click");
        // Adding a data-attribute
        image.attr("data-index", index);
      

        // Creating new div
        var topicDiv = $("<div class='topic m-3'>");
        topicDiv.append(pOne);
        topicDiv.append(image);

        // Adding new div to the images-vies col
        $("#images-view").append(topicDiv);
        console.log("append: " + index);
    
      }

  });
}


function renderButtons() {

  // Deleting the topics prior to adding new topics
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each topic in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var newButton = $("<button>");
    // Adding a class of topic-btn to our button
    newButton.addClass("topic-btn");
    // Adding a data-attribute
    newButton.attr("data-name", topics[i]);
    // Providing the initial button text
    newButton.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(newButton);
  }
}

// This function handles events where a topic button is clicked
$("#add-topics").on("click", function(event) {
  console.log("click");
  console.log(this);

  event.preventDefault();
  // This line grabs the input from the textbox
  var topic = $("#topic-input").val().trim()
  // var topic = $("#topic-input").val();
  console.log("topic to add: " + topic);

  // Adding topic from the textbox to our array
  topics.push(topic);

  // Calling renderButtons which handles the processing of our topic array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "topic-btn"
$(document).on("click", ".topic-btn", displayImages);

// Calling the renderButtons function to display the intial buttons
renderButtons();