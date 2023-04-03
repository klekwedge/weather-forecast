import { lazy, Suspense } from "react";
import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const CityListPage = lazy(() => import("../../pages/CityListPage"));
const CityPage = lazy(() => import("../../pages/CityPage"));
const MyLocationPage = lazy(() => import("../../pages/MyLocationPage"));
const Page404 = lazy(() => import("../../pages/Page404/Page404"));

function App() {
  return ( 
    <Router>
      <Box maxW='1200px' margin='0 auto' className="flex flex-col items-center">
        <Suspense fallback={<Spinner/>}>
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
