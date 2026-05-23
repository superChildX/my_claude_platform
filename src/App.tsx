import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import GuidePage from "./pages/GuidePage";
import HomePage from "./pages/HomePage";
import SupportPage from "./pages/SupportPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </Layout>
  );
}
