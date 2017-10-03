 
     $(document).on("click", ".floating-box", function() {
      console.log("hello");

        var state = $(this).attr("data-state");
        
        if (state === "still") {
          //this is the thing we clicked
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
}
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");

        }
        // ==============================================

        // STEP FOUR: open the file in the browser and click on the images.
        // Then click again to pause.
    });


// ADD HERO BUTTON.  which adds to Array
      var heroes = ["batman", "superman", "thor", "nightwing", "aquaman", "green lantern", "the flash", "wolverine", "fantastic 4", "spiderman", "iron man", "daredevil", "wonderwoman", "robin", "human torch"];

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#hero-list").empty();

        // Looping through the array of movies
        for (var i = 0; i < heroes.length; i++) {
        	console.log(heroes[i])
        	var dpAttribute = heroes[i]

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var newButton = $("<button>");
          newButton.attr("class", "list-group-item rendered")
          newButton.attr("data-hero", dpAttribute)


          newButton.text(heroes[i]);
          // Adding the button to the HTML
          $("#hero-list").append(newButton);
        }
      }

// END OF BUTTON RENDER





// This function handles events where the GO! button is clicked

$("#add-heroes").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();
      

  // This line will grab the text from the input box
  var hero = $("#searches").val().trim();
  // The movie from the textbox is then added to our array
  heroes.push(hero);
  console.log(hero);

  // calling renderButtons which handles the processing of our movie array
  renderButtons();
});



// ADD HERO BUTTON


// CLick on and off











//MAKE BUTTONS SHOW GIF's

// twaek below to react with dynamically cerated elements:


    $("#hero-list").on("click", ".rendered", function() {
      console.log("hello");
        //"this" being the button clicked.
      var hero = $(this).attr("data-hero");
      console.log(hero);
        // limit 10 to the images returned because 
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        hero + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          //response is a placeholder - - - everything .after is specific to the API. 
          


// $("#gifs-appear-here").html("whatsup JJ");



           for (var i = 0; i < 10; i++) {
            var gifDiv = $("<div>");
            gifDiv.attr("class", "floating-box");



            var heroImage = $("<img>");
            heroImage.attr("src", response.data[i].images.fixed_width_still.url);            
            heroImage.attr("class", "floating-box");
            heroImage.attr("data-state", "still")
            heroImage.attr("data-still", response.data[i].images.fixed_width_still.url)
            heroImage.attr("data-animate", response.data[i].images.fixed_width.url)

            // var rating = $("<p>");
            var rate = (response.data[i].rating.toUpperCase());
            // var showRating;
            // rating.attr(response.data[i].rating);
            gifDiv.append("<h4>" + "Rating: "+ rate + "</h4>");

            // newButton.attr("class", "gif")
            // console.log(showRating);
            console.log(response.data[i].rating);


            // heroImage.text(rating);

           
            gifDiv.prepend(heroImage);


            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    });





// Calling the renderButtons function at least once to display the initial list of heroes
renderButtons();











