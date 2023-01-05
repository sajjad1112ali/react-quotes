import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import PrivateLayout from "./pages/layouts/private/PrivateLayout";
import PublicLayout from "./pages/layouts/public/PublicLayout";

import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AddQuote from "./pages/Home/AddQuote";
import Register from "./pages/Login/Register";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/quotes" element={<PrivateLayout />}>
          <Route index element={<Home />} />
          <Route path="add" element={<AddQuote />} />
          <Route path="edit/:id" element={<AddQuote />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Provider>
  );
}

export default App;
