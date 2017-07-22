var limit = 8; // number of entries to obtain

$(document).ready(function(){

  // search wikipedia on keyboard press (enter/return)
  $("#searchInput").on('keyup', function (e) {
    if (e.keyCode == 13) {
      searchCustom();
    }
  });

  // search wikipedia on click
  $("#searchButton").on("click", function(){
    searchCustom();
  });

  // search wikipedia randomly on click
  $("#random").on("click", function(){
    // fill in code
    console.log("random button clicked"); //debug
    // call API data: https://en.wikipedia.org/wiki/Special:Random
    // use similar functions as previously defined to display data
  });

});

// search for user's custom input terms
function searchCustom(){
  // get user search terms using Opensearch API: https://www.mediawiki.org/wiki/API:Opensearch
  var searchTerms = document.getElementById("searchInput").value;
  console.log('Button clicked. Searching for: ' + searchTerms); // debug
  var searchAPI = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerms + "&limit=" + limit + "&namespace=0&format=json&callback=?&redirects=resolve";
  $.getJSON(searchAPI, function(searchData){
    if(searchData.hasOwnProperty("error")||searchData[1].length==0){
      console.log("Invalid search terms"); // debug
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
  for(let i=0; i<searchData[1].length; i++){
    // get text data
    var output = "<article class='entry'><h3>%TITLE%</h3><p>%INFO%</p><p>%LINK%</p></article>";
    output = output.replace("%TITLE%",searchData[1][i]);
    output = output.replace("%INFO%",searchData[2][i]);
    var linkstr = "<a href='"+searchData[3][i]+"' target='_blank' title='Visit Wikipedia article (opens in new window)'>Learn more...</a>";
    output = output.replace("%LINK%",linkstr);
    // get image data
    /*
    var imageAPI = "https://en.wikipedia.org/w/api.php?action=query&titles=" + searchData[1][i] + "&prop=pageimages&format=json&pithumbsize=100&redirects=resolve&callback=?";
    console.log(imageAPI);
    $.getJSON(imageAPI, function(imageData){
      var url = imageData.query.pages[0].thumbnail.source;
        console.log("Image output: " + url); // debug
      if(url){ // if image url found...
        output = output.replace("<img src='" + url + "' alt='Thumbnail for article' title='Image from article on " + searchData[1][i] + "'>");

      } else {
        output = output.replace("%IMAGE%","");
      }
    });
    */
    // output results to user
    $("#results").append(output);
  }
}

// allow draggability: http://api.jqueryui.com/draggable/
// inform user of draggability, clickability (popup? snackbar?)
