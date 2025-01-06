import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import App from './pages/App';
import LoginPage from './pages/login/index';
import { Layout } from './pages/layout';
import store from './store';

export const DRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          
        </Route>
      </Routes>
    </Router>
  );
};

// function PrivateRoute({ children, ...rest }: { children: React.ReactNode }) {
//   const { isAuth } = store.getState().user;

//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         isAuth ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/login',
//               state: { from: location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }
