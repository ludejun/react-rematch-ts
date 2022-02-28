import * as React from 'react';

const Count = (props: {
  onAddClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onAddAsyncClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => (
  <div>
    <button onClick={props.onAddClick}>Count计数：+1</button>
    <button onClick={props.onAddAsyncClick}>Count计数：异步+1</button>
  </div>
);

export default Count;
