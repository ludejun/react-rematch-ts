/**
 * 将数字转化为一定长的字符串，不够长的前面默认以0补齐
 * @param num 需要转化的数字
 * @param count 字符串长度
 * @param fillChat 用来补齐长度的单字符
 * @returns {string}
 */
export function num2String(num: number, count: number = 2, fillChat: string = '0'): string {
  const result = num.toString();
  if (result.length >= count) {
    return result;
  }
  return fillChat.repeat(count - result.length) + result;
}
