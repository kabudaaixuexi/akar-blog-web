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

export function download(url = '', fileName = '未知文件') {
  console.log(url,fileName);

  const a = document.createElement('a');
  a.style.display = 'none';
  a.setAttribute('target', '_blank');
  /*
   * download的属性是HTML5新增的属性
   * href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。
   * 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式
   * 所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)
   */
  fileName && a.setAttribute('download', fileName);
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
