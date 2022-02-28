export interface Count {
  request: {
    num: number;
  };
  response:
    | {
        number: number; // 示例
      }
    | undefined;
}
