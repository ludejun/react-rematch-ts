export default function getIP(cb?: (ip: string) => void) {
  if (cb) {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://api.ipify.org?format=json', true);
    request.onload = () => {
      if (
        request.status >= 200 &&
        request.status < 400 &&
        request.readyState === XMLHttpRequest.DONE
      ) {
        const data = JSON.parse(request.responseText);
        cb(data.ip);
      }
    };
    request.send();
  }
}