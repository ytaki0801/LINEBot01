// LINE Messaging API Access Token
var ACCESS_TOKEN = '(dummy)';
// URL for reply
var REPLY_URL = 'https://api.line.me/v2/bot/message/reply';

function doPost(e) {
  var replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  var userMessage = JSON.parse(e.postData.contents).events[0].message.text;
  var headers = { 
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + ACCESS_TOKEN 
  };
  
  if (userMessage.toLowerCase() == 'help') {
    rMes = '0以上の整数値xを送信するとx番目のフィボナッチ数を返信します．';
  } else {
    x = Number(userMessage)
    if (isNaN(x = Number(userMessage)) || x < 0)
      rMes = '0以上の整数値を送信して下さい．';
    else
      rMes = String((g=>g(g))(g=>(a,b,n)=>n==0?a:g(g)(b,a+b,n-1))(0,1,x))
  }

  var payload = JSON.stringify({
    'replyToken' : replyToken,
    'messages': [{
      'type' : 'text',
      'text' : rMes
    }]
  })
  
  var options = {
    'headers' : headers,
    'method' : 'post',
    'payload' : payload
  };

  UrlFetchApp.fetch(REPLY_URL, options);
}

