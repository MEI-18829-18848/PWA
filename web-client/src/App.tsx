import React from 'react';
import type {FC} from 'react';
import 'antd/dist/reset.css';
import './App.css';
import LoginForm from "./components/login/login";
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import {RequireAuth} from "./routes/RequireAuth";
import LayoutMenu from "./components/layout-menu/layout-menu";
import Dashboard from "./components/dashboard/dashboard";
import Stations from "./components/stations/stations";
import Notifications from "./components/notifications/notifications";
import RegisterForm from "./components/register/register";
import AddStation from "./components/stations/add-station/addStation";
import StationView from "./components/stations/viewStation/viewStation";
import SlotView from "./components/slot/slotView";

const App: FC = () => (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route element={<RequireAuth><LayoutMenu/></RequireAuth>}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    // Station Routes
                    <Route path="/stations/:stationId/slots/:id" element={<SlotView />} />
                    <Route path="/stations/:id" element={<StationView />} />
                    <Route path="/stations/new" element={<AddStation />} />
                    <Route path="/stations" element={<Stations />} />

                    <Route path="/notifications" element={<Notifications />} />

                </Route>
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    </div>
);

export default App;
