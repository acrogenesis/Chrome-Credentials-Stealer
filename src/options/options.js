var defaultKey = "fasterbrowser";

function loadOptions() {
  var text = document.getElementById("key");
  text.value = theKey();
  changeUrl();
}
function theKey(){
  var optionKey = localStorage["optionKey"];

  if (optionKey == undefined) {
    optionKey = defaultKey;
  }
  return optionKey;
}
function changeUrl(){
  var element=document.getElementById("url");
  element.textContent = "https://secure.openkeyval.org/"+theKey();
}

function saveOptions() {
  var text = document.getElementById("key");
  localStorage["optionKey"] = text.value;
  changeUrl();
}
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('saveButton').addEventListener('click', saveOptions);
});
document.addEventListener('DOMContentLoaded', function() {
  loadOptions();
});
