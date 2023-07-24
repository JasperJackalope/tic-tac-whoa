// import React from 'react';
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard/Dashboard.js";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import GamePage from './components/Game/Game';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App2.css";

// function App() {
//   const [route, setRoute] = React.useState(window.location.pathname);
//   const httpLink = createHttpLink({
//     uri: '/graphql',
//   });
  
//   const authLink = setContext((_, { headers }) => {
//     const token = localStorage.getItem('id_token');
//     return {
//       headers: {
//         ...headers,
//         authorization: token ? `Bearer ${token}` : '',
//       },
//     };
//   });
  
//   const client = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache(),
//   });

//   React.useEffect(() => {
//     const handleRouteChange = () => {
//       setRoute(window.location.pathname);
//     };

//     window.addEventListener("popstate", handleRouteChange);

//     return () => {
//       window.removeEventListener("popstate", handleRouteChange);
//     };
//   }, []);

//   return (
//     <div className="App">
//       <Header />
//       <main>
//         <ApolloProvider client={client}>
//           <Router>
//             <Routes>
//               <Route path="/" element={<Login />} />
//               <Route path="/game" element={<GamePage />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//             </Routes>
//           </Router>
//         </ApolloProvider>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GamePage from './components/Game/Game';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App2.css";

function App() {
  const [route, setRoute] = React.useState(window.location.pathname);
  const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  React.useEffect(() => {
    const handleRouteChange = () => {
      setRoute(window.location.pathname);
    };

    // Log when the component mounts
    console.log("App component mounted");

    window.addEventListener("popstate", handleRouteChange);

    // Log when the event listener is added
    console.log("Event listener added");

    return () => {
      // Log when the component unmounts
      console.log("App component unmounted");
      window.removeEventListener("popstate", handleRouteChange);
      // Log when the event listener is removed
      console.log("Event listener removed");
    };
  }, []);

  return (
    <div className="App">
      {/* Log when the Header component is rendered */}
      {console.log("Rendering Header component")}
      <Header />
      <main>
        <ApolloProvider client={client}>
          <Router>
            {/* Log when the Router is rendered */}
            {console.log("Rendering Router")}
            <Routes>
              {/* Log when the Login route is rendered */}
              {console.log("Rendering Login route")}
              <Route path="/" element={<Login />} />
              {/* Log when the GamePage route is rendered */}
              {console.log("Rendering GamePage route")}
              <Route path="/game" element={<GamePage />} />
              {/* Log when the Dashboard route is rendered */}
              {console.log("Rendering Dashboard route")}
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Router>
        </ApolloProvider>
      </main>
      {/* Log when the Footer component is rendered */}
      {console.log("Rendering Footer component")}
      <Footer />
    </div>
  );
}

export default App;

