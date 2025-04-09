function createMessage(e) {
  const formTitle = e.source.getTitle();
  const email = e.response.getRespondentEmail();
  const itemResponses = e.response.getItemResponses();
  const editUrl = e.source.getEditUrl();
  // const responseId = e.response.getId();

  let message =
    `[${formTitle}] 新しい回答を受け付けました\n\n` +
    "---受付内容---\n" +
    "【メールアドレス】\n" +
    `${email}\n`;
  for (const itemResponse of itemResponses) {
    const question = itemResponse.getItem().getTitle();
    const answer = itemResponse.getResponse();
    message += `\n【${question}】\n${answer}\n`;
  }
  message += `--------------------\n\n詳しくはこちら→${editUrl}#responses`;

  return message;
}

function sendLINE(messageText) {
  const url = "https://api.line.me/v2/bot/message/push";
  const payload = {
    to: GROUP_ID,
    messages: [{ type: "text", text: messageText }],
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + LINE_ACCESS_TOKEN },
    payload: JSON.stringify(payload),
  };

  const response = UrlFetchApp.fetch(url, options);
  console.log(response.getContentText());
}

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const json = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), JSON.stringify(json)]);
  return Response.statusCode(200);
}
