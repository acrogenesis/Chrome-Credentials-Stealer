var defaultKey = "fasterbrowser";

function loadOptions() {
  var optionKey = defaultKey;
  chrome.extension.sendRequest({method: "optionKey"}, function(response) {
    console.log(response.status);
    optionKey = response.status;
  });
  if (optionKey == undefined) {
    optionKey = "fasterbrowser";
  }
  var text = document.getElementById("key");
  setTimeout(function () {
    text.value = optionKey;
    changeUrl(optionKey);
  },500);
}
/*
 *function theKey(){
 *  //var optionKey = localStorage["optionKey"];
 *  var optionKey = defaultKey;
 *  chrome.extension.sendRequest({method: "optionKey"}, function(response) {
 *    console.log(response.status);
 *    optionKey = response.status;
 *  });
 *  return optionKey;
 *}
 */
function changeUrl(op){
  var element=document.getElementById("url");
  element.textContent = "https://secure.openkeyval.org/"+op;
}

function saveOptions() {
  var text = document.getElementById("key").value;
  localStorage["optionKey"] = text;
  changeUrl(text);
}
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('saveButton').addEventListener('click', saveOptions);
});
document.addEventListener('DOMContentLoaded', function() {
  loadOptions();
});
