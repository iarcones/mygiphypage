// Variables
var limitImg = 15;

// displayImages function re-renders the HTML to display the appropriate content

function getTopic() {

  console.log(this);

  var topic = $(this).attr("data-name");

  console.log("topic-1: " + topic);
  displayImages(topic);
  
}

function displayImages(topic) {

  var queryURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=U2E0KeRa320EgNxloxFE3VwHL3OAKsxA&limit=${limitImg}`;
  console.log("queryURL: " + queryURL);

  // Creating an AJAX call for the specific topic button being clicked

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    $("#images-view").empty();


    for (var index = 0; index < limitImg; index++) {

      // Retrieving image info
      var rating = response.data[index].rating;
      var title = response.data[index].title;
      var datetime = response.data[index].import_datetime;

      var imgjpgURLStill = response.data[index].images.fixed_height_small_still.url;
      var imgjpgURLAnimate = response.data[index].images.fixed_height_small.url;

      // Creating html elements for info
      // var pOne = $("<p>").text("Title: " + title);
      var pTwo = $("<p>").text("Rating: " + rating);
      // var pThree = $("<p>").text("Import datetime: " + datetime);
      // Creating html elements for the image  
      var image = $("<img>").attr("src", imgjpgURLStill);
      // Adding 
      image.addClass("image-click");
      // Adding a data-attribute
      image.attr("data-index", index);
      image.attr("altURL", imgjpgURLAnimate);

      // Creating new div
      var topicDiv = $("<div class='topic m-1'>");
      topicDiv.append(image);
      // topicDiv.append(pOne);
      topicDiv.append(pTwo);
      // topicDiv.append(pThree);

      // Adding new div to the images-view col
      $("#images-view").append(topicDiv);

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

   var imageCurrent = $(this).attr("src");
  
    $(this).attr("src", $(this).attr("altURL"));
    $(this).attr("altURL", imageCurrent);

  }



  // This function handles events where a topic button is clicked
  $("#add-topics").on("click", function (event) {

    event.preventDefault();

    // This line grabs the input from the textbox
    var topic = $("#topic-input").val().trim();
    
    if (topic === "") {
      console.log("empty");
      return;
    }

    // Adding topic from the textbox to our array
    topics.push(topic);
    localStorage.clear();
    localStorage.setItem("movies", topics);

    // Calling renderButtons which handles the processing of our topic array
    renderButtons();

    // Calling to displayImages direct from the submit new topic
    displayImages(topic);

    // clear the input text
    $("#topic-input").val("");
   
  });

  // Adding a click event listener to all elements with a class of "topic-btn"
  $(document).on("click", ".topic-btn", getTopic);

  $(document).on("click", ".image-click", switchImages);


  // Getting the value from the localStorage
  
  if (localStorage.getItem("movies") === null) {
    
    // Initial array of topics
    var topicsFirstTime = ["Matrix the movie", "Alien the movie", "Ex-Machina", "Star Wars", "Terminator", "Blade Runner", "Back to the future", "Mad Max", "2001 the movie", "Star Trek", "Dune the movie"];
    localStorage.setItem("movies", topicsFirstTime);
  }

  topicsSTR = localStorage.getItem("movies");
  console.log("topicsSTR: " + topicsSTR);
  topics = topicsSTR.split(",");
  console.log("topics: " + topics);


  // Calling the renderButtons function to display the intial buttons
  renderButtons();
  displayImages(topics[Math.floor(Math.random()*topics.length)]);


