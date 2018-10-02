
$(document).ready(function() {
    // Initial topics array
    var topics = ['Puppies', 'Kittens', 'Zebras', "Otters", "Giraffes", "Jaguar", "Nic Cage",];    

    // Function to display gif info after being clicked 
    function displayGif() {
        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif 
        + "&api_key=gWsfU1zcBEqfjCoeJocHrKj995L8KYBy&limit=10";
        
        // Empty giphyTime div so it only displays results from most recently clicked button
        $("#giphyTime").empty();

        // AJAX get request 
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
            var results = response.data;
            console.log(results)
            for (i=0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating.toUpperCase());
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url)
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("giphyGif")
                gifDiv.append(gifImage);
                gifDiv.append(p);
                $("#giphyTime").append(gifDiv);
            };
        
            // Function that will change gif src from still to animated
            $(".giphyGif").on("click", function () {
            var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animated");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
    
            });
        
            // Click listner to animate gifs
            // $(document).on("click", ".giphyGif", animateGif);
        
        });
    };

    // Function to create buttons from above array that will be used to select gifs to display
    function renderButtons () {
        
        $("#buttonGen").empty();
        // Loops through topics array & creates a button for each one
        for (i=0; i < topics.length; i++) {
            var button = $("<button>");
            button.addClass("gif-btn");
            button.addClass("btn");
            button.addClass("btn-secondary");
            button.attr("data-name", topics[i]);
            button.text(topics[i]);
            $("#buttonGen").append(button);
        };
    };
    
    // Will add searched term as a button and render it when add button is clicked 
    $("#addButton").on("click", function () {
        event.preventDefault();
        var input = $("#userInput").val().trim();
        topics.push(input);
        renderButtons();
    });
  



    // Click listener to display gifs when a button gets clicked 
    $(document).on("click", ".gif-btn", displayGif);
    // Need to render buttons on initialization
    renderButtons();
})