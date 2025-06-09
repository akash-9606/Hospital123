// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import './App.css';
// import AllRoutes from './routes/allroutes';

// function App() {
//   return (
//     <BrowserRouter>
//       <AllRoutes />
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AllRoutes from "./routes/allroutes";
import { LoginProvider } from "./LoginContext"; // ✅ add this line

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        {" "}
        {/* ✅ wrap AllRoutes with LoginProvider */}
        <AllRoutes />
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
