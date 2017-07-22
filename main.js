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
  var limit = 8; // number of entries to obtain
  var searchTerms = document.getElementById("searchInput").value;
  console.log('Button clicked. Searching for: ' + searchTerms); // debug
  var searchAPI = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerms + "&limit=" + limit + "&namespace=0&format=json&callback=?&redirects=resolve";
  $.getJSON(searchAPI, function(searchData){
    if(searchData.hasOwnProperty("error")){
      console.log("Invalid search terms"); // debug
    }
    else{
      console.log(searchData); //debug
    }
  });
  // call API data: https://www.mediawiki.org/wiki/API:Main_page
  // parse data; distribute into boxes
  // allow draggability: http://api.jqueryui.com/draggable/
  // inform user of draggability, clickability (popup? snackbar?)
}
