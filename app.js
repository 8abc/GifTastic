$(document).ready(function() {
  var topics = [];

  //Makes the button clickable
  $(".btn").on("click", function() {
    //clears out previous gifs
    $(".gifArea").empty();
    //"this" keyword refers to the button that was clicked
    var dance = $(this).attr("data-search");
    console.log(dance);
    //Building the URL we need to query database
    var queryURL =
      //search for 10  gifs of dance moves using an api key
      "https://api.giphy.com/v1/gifs/search?&api_key=FoFAMnrStNIHtnw8cSYX9uka0nAlS2Qn&q=" +
      dance +
      "&limit=10&rating=pg-13";
    //getting rid of bad characters and space in my URL
    var encoded = encodeURI(queryURL);
    console.log(encoded);
    // Using ajax method to call giphy.com
    $.ajax({
      url: encoded,
      method: "GET"
      // We store all of the retrieved data inside of an object called "response"
    }).then(function(response) {
      //logs results of the object
      console.log(response.data);
      //loops over every gif

      for (var i = 0; i < response.data.length; i++) {
        //save the gif properties of content
        var gifUrl = response.data[i].images.original_still.url;
        //create and store in a image tag
        var danceMoves = $("<img>");
        //set attributes to image
        danceMoves.attr("src", gifUrl);
        //if the images doesn't load it will show text of dance moves
        danceMoves.attr("alt", "dance moves");
        //animated gif
        var gifUrl2 = response.data[i].images.original.url;
        danceMoves.attr("src2", gifUrl2);
        //add image tag to gif area
        $(".gifArea").prepend(danceMoves);
      }
    });
  });
  //makes the image tag clickable
  $(document).on("click", "img", function() {
    //grabbing the attributes we set to the image tag and add to  a variable
    var currentState = $(this).attr("src");
    var nextState = $(this).attr("src2");
    //using the attributes we set and swapping them
    $(this).attr("src", nextState);
    $(this).attr("src2", currentState);
  });
  //function for creating buttons
  function renderButtons() {
    //loops through each item of the topics array
    for (var i = 0; i < topics.length; i++) {
      console.log(topics);
      //dynamically creates a new button for each item in the array
      var a = $("<button>");
      //add class
      a.addClass("btn btn-warning");
      //add attribute
      a.attr("data-search", topics[i]);
      //adds text to the button
      a.text(topics[i]);
      //add buttons where the other buttons are at
      $(".container").prepend(a);
      //make the new button clickable
      // $("<button>").on("click", function() {
      //   console.log("renderbutton function click event");
      //   //"this" keyword refers to the button that was clicked
      //   var topics = $(this).attr("data-search");
      //   console.log("<button>");
      // });
    }
  }
  //This is for the gif search box
  $("#createButton").on("click", function() {
    //prevents the submit button from trying to submit a form when clicked
    event.preventDefault();
    //array for searched topics
    // var topics = [];
    // console.log("create button on click is working");

    //Grab the the text from the input box and remove white space
    var searchInput = $("#searchInput")
      .val()
      .trim();
    // console.log(button);

    //add new buttons to array of dance moves
    topics.push(searchInput);
    // console.log(topics);
    // console.log(topics.length);
    renderButtons();
  });
});

//Get giphy data from giphy API
//Pick a random gi from the search term we chose
//Make that gif display on the page
//Need to create a button from search box and create gif when clicked like the other button
