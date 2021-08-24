/* eslint-disable */
export default function getIP(cb) {
  const newJs = document.createElement('script');
  try {
    document.body.appendChild(newJs);
    newJs.src = '//pv.sohu.com/cityjson';
  } catch (err) {
    console.log('创建script标签失败');
  }

  // 监听script标签加载完毕
  newJs.onload = function() {
    if (
      !this.readyState || // 这是FF的判断语句，因为ff下没有readyState这人值，IE的readyState肯定有值
      this.readyState === 'loaded' ||
      this.readyState === 'complete' // 这是IE的判断语句
    ) {
      console.log('ip地址：', returnCitySN && returnCitySN.cip);
      cb && returnCitySN && cb(returnCitySN.cip);
      document.body.removeChild(newJs);
    }
  };
}
