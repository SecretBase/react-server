import React from 'react';

const App = () => (
  <div>
    <h1>React will be mounted after 5s</h1>
    <button onClick={ event => {
      console.log(event);
    } }>Testing binding event for react</button>
  </div>
);

export default App;
