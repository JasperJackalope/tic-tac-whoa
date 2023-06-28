import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Today from "./components/Today/Today";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [route, setRoute] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handleRouteChange = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const renderRoute = () => {
    switch (route) {
      case "/":
        return <Login />;
      default:
        return <Login />;
    }
  };

  return (
    <div className="App">
      <Header />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/today" element={<Today />} />
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </div>
  );
}

export default App;
