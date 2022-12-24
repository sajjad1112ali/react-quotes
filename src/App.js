import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import PrivateLayout from "./pages/layouts/private/PrivateLayout";
import PublicLayout from "./pages/layouts/public/PublicLayout";

import Chat from "./pages/Chat/Chat";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/chat" element={<PrivateLayout />}>
          <Route index element={<Chat />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Provider>
  );
}

export default App;
