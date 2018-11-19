// Initial array of topics

var topics = ["matrix-the-movie", "alien the movie", "ex-machina", "star-wars", "terminator", "blade-runner", "back-to-the-future", "mad-max", "star-trek"];

// Variables
var limitImg = 10;
var imagePack = {};
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
     //console.log(JSON.stringify(response))

      console.log ("imagePack : " + imagePack); 

      $("#images-view").empty();


      for (var index=0; index<limitImg; index++) {


        imagePack = {[index]: {
           J: response.data[index].images.fixed_height_small.url,
           G: response.data[index].images.fixed_height_small_still.url
          }
        };

        console.log("imagePack : " + imagePack); 
        imagePackSTR = JSON.stringify(imagePack);
        console.log("imagePackSTR : " + imagePackSTR); 
        console.log(imagePack[index].J)
        console.log(imagePack[index].G)

        // Retrieving image info
        var rating = response.data[index].rating;
        var title = response.data[index].title;
        var datetime = response.data[index].import_datetime;

        var imgjpgURL = response.data[index].images.fixed_height_small.url;

        // Creating html elements for info
        // var pOne = $("<p>").text("Title: " + title);
        var pTwo = $("<p>").text("Rating: " + rating);
        // var pThree = $("<p>").text("Import datetime: " + datetime);
        // Creating html elements for the image  
        var image = $("<img>").attr("src", imgjpgURL);
        // Adding 
        image.addClass("image-click");
        // Adding a data-attribute
        image.attr("data-index", index);
        image.attr("jpgorgif", "J");
        image.attr("id", index);
   
        // Creating new div
        var topicDiv = $("<div class='topic m-1'>");
        topicDiv.append(image);
        // topicDiv.append(pOne);
        topicDiv.append(pTwo);
        // topicDiv.append(pThree);
        

        // Adding new div to the images-view col
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

// This function switch images still | animated
function switchImages() {
  
  var imageClicked = $(this).attr("data-index");
  var imageType = $(this).attr("jpgorgif");
  
  console.log("imageClicked: " + imageClicked);
  console.log("imageType: " + imageType);

  console.log("switch" + imagePack[imageClicked])
  console.log("switch" + imagePack[imageClicked])

  if (imageType === "J") {

    var imgjpgURL = imagePack[imageClicked].G;

    $('#' +imageClicked).attr("src", imgjpgURL);
    $('#' +imageClicked).attr("jpgorgif", "G");
  }
  else {
    var imgjpgURL = imagePack[imageClicked].J;
     $('#' +imageClicked).attr("src", imgjpgURL);
     $('#' +imageClicked).attr("jpgorgif", "J");
  }
  }
  


// This function handles events where a topic button is clicked
$("#add-topics").on("click", function(event) {
  console.log("click");

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

$(document).on("click", ".image-click", switchImages);


// Calling the renderButtons function to display the intial buttons
renderButtons();