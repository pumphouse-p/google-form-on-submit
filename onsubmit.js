var POST_URL = "<URL>";

function onSubmit(e) {
  var form = FormApp.getActiveForm();
  var allResponses = form.getResponses();
  var latestResponse = allResponses[allResponses.length -1];
  var response = latestResponse.getItemResponses();
  var payload = {};

  payload['reporter_email'] = latestResponse.getRespondentEmail();
  payload['submission_time'] = latestResponse.getTimestamp();

  for (var i = 0; i < response.length; i++) {
    var question = response[i].getItem().getTitle().toLowerCase().replaceAll(' ', '_');
    var answer = response[i].getResponse();
    payload[question] = answer;
  }

  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  }

  UrlFetchApp.fetch(POST_URL, options);
}
