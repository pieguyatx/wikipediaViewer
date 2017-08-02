var limit = 6; // number of entries to obtain

$(document).ready(function(){

  // search wikipedia on keyboard press (enter/return)
  $("#searchInput").on('keyup', function (e) {
    if (e.keyCode == 13) {
      searchInput();
    }
  });

  // search wikipedia on click
  $("#searchButton").on("click", function(){
    searchInput();
  });

  // search wikipedia randomly on click
  $("#randomButton").on("click", function(){
    // fill in code
    //console.log("random button clicked"); //debug
    // call API data: https://en.wikipedia.org/wiki/Special:Random
    // use similar functions as previously defined to display data
    searchRandom();
  });

});

// Read in user search terms
function searchInput(){
  var searchTerms = document.getElementById("searchInput").value;
  // search for terms on wikipedia
  searchCustom(searchTerms);
}

// search for user's custom input terms
function searchCustom(searchTerms){
  // clear results screen
  $("#results").html("");
  // get user search terms using Opensearch API: https://www.mediawiki.org/wiki/API:Opensearch
  //console.log('Button clicked. Searching for: ' + searchTerms); // debug
  var searchAPI = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerms + "&limit=" + limit + "&namespace=0&format=json&callback=?&redirects=resolve";
  $.getJSON(searchAPI, function(searchData){
    if(searchData.hasOwnProperty("error")||searchData[1].length==0){
      //console.log("Invalid search terms"); // debug
      document.getElementById("searchInput").value = "Sorry, please try again.";
    }
    else{
      // parse data; distribute into boxes
      showSearchData(searchData);
    }
  });
}

// parse data; distribute into boxes
function showSearchData(searchData){
  // console.log("User search terms: " + searchData); //debug
  // Prepare the text data
  var imageTitle = [];
  var output = [];
  for(let i=0; i<searchData[1].length; i++){
    // get text data
    output.push("<article class='entry'><h3>%TITLE%</h3>%IMAGE%<p>%INFO%</p><div class='learnMore'>%LINK%</div></article>");
    output[i] = output[i].replace("%TITLE%",searchData[1][i]);
    output[i] = output[i].replace("%INFO%",searchData[2][i]);
    var linkstr = "<a href='"+searchData[3][i]+"' target='_blank' title='Visit Wikipedia article (opens in new window)'>Learn more...</a>";
    output[i] = output[i].replace("%LINK%",linkstr);
    // Prepare the image URLs
    // format title for query string; replace spaces
    imageTitle.push(searchData[1][i].replace(/\s+/g,"%20"));
  }
  // get image data related to text data
  var imageTitles = imageTitle.join("|"); // link titles into one string for single query
  var imageAPI = "https://en.wikipedia.org/w/api.php?action=query&titles=" + imageTitles + "&prop=pageimages&format=json&pithumbsize=100&redirects=resolve&callback=?";
  $.ajax({
    url: imageAPI,
    dataType: "json",
    success: function(imageData) { // if image data is found,
      // console.log(imageData.query.pages); // debug
      // Get the image URLs
      for(let j=0; j<searchData[1].length; j++){
        // Check if URL can be found.
        if(imageData.query.pages[Object.keys(imageData.query.pages)[j]] && imageData.query.pages[Object.keys(imageData.query.pages)[j]].hasOwnProperty("thumbnail")){
          // if URL exists...
          var url = imageData.query.pages[Object.keys(imageData.query.pages)[j]].thumbnail.source;
          // match the title from the image to the proper text
          var imageTitleAPI = imageData.query.pages[Object.keys(imageData.query.pages)[j]].title;
          for(let k=0; k<searchData[1].length; k++){
            if(searchData[1][k]==imageTitleAPI){
              output[k] = output[k].replace("%IMAGE%","<img src='" + url + "' alt='Thumbnail for article' title='Image from article on " + imageTitleAPI + "'>");
              break;
            }
          }
        }
      }
      // console.log(output); // debug
      showResult(output);
    },
    error: function(){
      showResult(output);
    }
  });
  function showResult(output){
    // console.log(outputHTML); //debug
    for (let i=0; i<searchData[1].length; i++){
      output[i] = output[i].replace("%IMAGE%",""); // replace image placeholders
      $("#results").append(output[i]); // output results to user
    }
    // make results draggable on desktops w/ large screens only
    if($(window).width() >= 1024){
      addDrag();
    }
  }
}

function searchRandom(){
  var randAPI = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&redirects=1&rnnamespace=0&rnfilterredir=nonredirects&rnlimit=1&callback=?";
  $.getJSON(randAPI, function(randData){
    var randTitle = randData.query.random[0].title;
    //console.log(randData); // debug
    searchCustom(randTitle);
  });
}

// allow draggability: http://api.jqueryui.com/draggable/
function addDrag(){
  // add draggability to all articles
  $( function() {
    $( "article.entry" ).addClass("ui-widget-content").draggable();
  } );
  // inform user of draggability, clickability (popup? snackbar?)
  var x = document.getElementById("snackbar");
  // Add the "show" class to DIV
  x.className = "show";
  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
