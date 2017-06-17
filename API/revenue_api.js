// var xhr = new XMLHttpRequest();
// xhr.open("GET", "http://jsapi.makespi.com?key=508bce9c8cf114ded87959c536fd2323", false);
// xhr.send();
//
// console.log(xhr.status);
// console.log(xhr.statusText);


$.ajax({
  dataType: 'json',
  url: 'http://jsapi.makespi.com?key=508bce9c8cf114ded87959c536fd2323',
  success: function(data){
    console.log(data);
  },
  error: function(){
    console.log("No response.")
  }
})
