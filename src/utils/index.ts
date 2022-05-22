export function getUuiD(randomLength = Math.random()) {
  return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36);
}
export function getTime() {
  var now = new Date();
  var year = now.getFullYear();
  var mon = now.getMonth() + 1;
  var day = now.getDate();
  var week = now.getDay();
  var hour = now.getHours();
  var min = now.getMinutes();
  var sec = now.getSeconds();

  // return year+"-"+todo(mon)+"-"+todo(day)+"-"+
  // toweek(week)+todo(hour)+":"+todo(min)+":"+todo(sec)
  return (
    year + "-" + todo(mon) + "-" + todo(day) + " " + todo(hour) + ":" + todo(min) + ":" + todo(sec)
  );
}
function todo(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}
export function createRandomId() {
  return (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
}
function rand(m) {
  m = m > 16 ? 16 : m;
  var num = Math.random().toString();
  if(num.substr(num.length - m, 1) === '0') {
    return rand(m);
  }
  return num.substring(num.length - m);
}
