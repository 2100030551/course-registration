// Layout.js
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="app-container">
      <nav className="app-nav">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>
      <main>
        <Outlet /> {/* This renders the matched route component */}
      </main>
    </div>
  );
};

// Then in App.js
<Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
  </Route>
</Routes>