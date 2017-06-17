// Write a function that checks if an inputted value is a palindrome. The
// function should return true/false (bool). You can assume that all input will be a
// string type and lower case.

var tstStr = "cata c";

function checkPalindrome(str) {
  var strLeng = str.length;
  var x = (Math.floor(strLeng/2));
  var countFalse = 0;
  for (var i=0, s=(strLeng-1); i<x, s>0; i++, s--) {
    if (str.charAt(i) !== str.charAt(s)) {
      countFalse++;
    }
  }
  return countFalse > 0? false : true;
}

// checkPalindrome(tstStr);

// version that allows spaces
function checkPalindromeAlt(str) {
  var nospaceStr = str.replace(" ", "");
  var strLeng = nospaceStr.length;
  var x = (Math.floor(strLeng/2));
  var countFalse = 0;
  for (var i=0, s=(strLeng-1); i<x, s>0; i++, s--) {
    if (nospaceStr.charAt(i) !== nospaceStr.charAt(s)) {
      countFalse++;
    }
  }
  return countFalse > 0? false : true;
}

checkPalindromeAlt(tstStr);
