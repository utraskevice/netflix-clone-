import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Content from "./pages/Content";
import Layout from "./components/Layout";
import MainProvider from "./context/MainProvider";

function App() {
  return (
    <MainProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/content" element={<Content />} />
          <Route path="*" element={<p>Your Lost! No Page Here!</p>} />
        </Routes>
      </Layout>
    </MainProvider>
  );
}

export default App;
