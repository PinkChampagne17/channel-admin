import axios from "axios";
import { lazy } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Login } from "./app/account/screens/login/login.component";
import { SuspenseWithSpinner } from "./app/shared/components/suspense-with-loading/suspense-with-loading";

// import logo from "./logo.svg";

// config default instance of axios
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

const Dashboard = lazy(
  () => import("./app/admin/dashboard/dashboard.component")
);
const Home = lazy(() => import("./app/admin/home/home.component"));
const Users = lazy(() => import("./app/admin/users/users.component"));
const Groups = lazy(() => import("./app/admin/groups/groups.component"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={<SuspenseWithSpinner children={<Dashboard />} />}
          >
            <Route index element={<Home />} />
            <Route
              path="users"
              element={<SuspenseWithSpinner children={<Users />} />}
            />
            <Route
              path="groups"
              element={<SuspenseWithSpinner children={<Groups />} />}
            />
          </Route>
          <Route path="*" element={<p>404 Not Found</p>} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
