import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCategory from "./components/CreateCategory";
import ShowAndUpdateCategoryImage from "./components/ShowAndUpdateCategoryImage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer limit={3} position="bottom-center" autoClose={2000} />
        <Routes>
          <Route path="/" element={<CreateCategory />} />
          <Route
            path="/category/:categoryId"
            element={<ShowAndUpdateCategoryImage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
