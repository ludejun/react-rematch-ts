/**
 * 节流：在 delay 毫秒内最多执行一次。
 *
 * @param fn 被节流的函数
 * @param delay 间隔时间 / ms
 * @param immediate 是否在第一次调用时立即执行（leading edge），默认执行
 */
export default function throttle<A extends unknown[]>(
  fn: (...args: A) => unknown,
  delay = 500,
  immediate = true
) {
  let last = 0;

  return (...rest: A) => {
    const current = Date.now();

    // 第一次调用：记录起点，是否执行由 immediate 决定。
    if (last === 0) {
      last = current;
      if (immediate) fn(...rest);
      return;
    }

    if (current - last >= delay) {
      last = current;
      fn(...rest);
    }
  };
}
