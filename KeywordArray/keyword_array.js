// Write a function that accepts two parameters: (1) a collection of keywords and (2) a new
// item to be appended to the end of the collection. The function should check to ensure that
// only unique values are added to the collection. The function should return the new updated
// array.

var keywordArr = ["one", "two", "three"];
var newWord = "four";

function combineArr (initArr, newItem) {
  var count = 0;
  initArr.forEach(function(element) {
    if (element == newItem) {
     count++;
    }
  });
  return count>0? initArr : initArr.concat(newItem);
}

combineArr(keywordArr, newWord);
