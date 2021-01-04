export default function getIP(cb) {
  const new_js = document.createElement('script');
  try {
    document.body.appendChild(new_js);
    new_js.src = 'http://pv.sohu.com/cityjson';
  } catch (err) {
    console.log('创建script标签失败');
  }

  // 监听script标签加载完毕
  new_js.onload = new_js.onreadystatechange = function() {
    if (
      !this.readyState || //这是FF的判断语句，因为ff下没有readyState这人值，IE的readyState肯定有值
      this.readyState == 'loaded' ||
      this.readyState == 'complete' // 这是IE的判断语句
    ) {
      console.log('ip地址：', returnCitySN && returnCitySN.cip);
      cb && cb(returnCitySN);
      document.body.removeChild(new_js);
    }
  };
}

