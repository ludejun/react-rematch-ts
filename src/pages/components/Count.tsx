import * as React from 'react';

export interface Props {
  onAddClick?: () => void,
  onAddAsyncClick?: () => void,
}

const Count = (props:Props) => (
  <div>
      <button onClick={props.onAddClick}>Count计数：+1</button>
      <button onClick={props.onAddAsyncClick}>Count计数：异步+1</button>
  </div>
);

export default Count;