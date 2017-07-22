$(document).ready(function(){
  // search wikipedia on click
  $("#searchButton").on("click", function(){
    // get user search terms using Opensearch API: https://www.mediawiki.org/wiki/API:Opensearch
    var searchAPI = "https://en.wikipedia.org/w/api.php?action=opensearch&search=api&limit=10&namespace=0&format=json&callback=?";
    $.getJSON(searchAPI, function(searchData){
      console.log(searchData); //debug
    });
    // call API data: https://www.mediawiki.org/wiki/API:Main_page
    // parse data; distribute into boxes
    // allow draggability: http://api.jqueryui.com/draggable/
    // inform user of draggability, clickability (popup? snackbar?)
  });
  $("#random").on("click", function(){
    // fill in code
    console.log("random button clicked"); //debug
    // call API data: https://en.wikipedia.org/wiki/Special:Random
    // use similar functions as previously defined to display data
  });
});
