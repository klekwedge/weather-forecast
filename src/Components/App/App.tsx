import React, { lazy, Suspense } from "react";
import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const CityListPage = lazy(() => import("../../pages/CityListPage"));
const CityPage = lazy(() => import("../../pages/CityPage"));
const MyLocationPage = lazy(() => import("../../pages/MyLocationPage"));
const Page404 = lazy(() => import("../../pages/Page404"));

function App() {
  return (
    <Router>
      <Box p="10px 20px" className="flex flex-col items-center">
        <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
            <Route path="/" element={<CityListPage />} />
            <Route path="/:cityId" element={<CityPage />} />
            <Route path="/my-location" element={<MyLocationPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </Box>
    </Router>
  );
}

export default App;
