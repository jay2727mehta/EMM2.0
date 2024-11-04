import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home/home";
import Setting from "./component/Settings/setting";
import GadgetDashboard from "./component/gadgets/gadgetHome";
import { DashboardProvider } from "./component/context/gadgetcontext";
import { BarProvider } from "./component/context/barcontext";
import Login from "./component/Login/login";
import ErrorPage from "./component/Eroor Pages/errorPage";
import Registration from "./component/Registration/registration";
import ProtectedRoute from "./component/pagelayout/protectedRoute";
import ACCESS_LEVELS from "./component/pagelayout/permission.level";
import SolarPanel from "./component/Energy/components/Solar/solarpanel";

function App() {
  return (
    <div>
      <BrowserRouter>
        <DashboardProvider>
          <BarProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/home/*" element={<Home />} />
              {/* <Route path="/Solar_Panel" element={<SolarPanel />} /> */}
              {/* <Route path="/addgadgets" element={<GadgetDashboard />} /> */}
              <Route
                path="/addgadgets"
                element={
                  <ProtectedRoute requiredAccessLevel={ACCESS_LEVELS.ADMIN}>
                    <GadgetDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/setting/*" element={<Setting />} />
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </BarProvider>
        </DashboardProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
