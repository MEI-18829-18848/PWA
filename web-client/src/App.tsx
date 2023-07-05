import React from 'react';
import type {FC} from 'react';
import 'antd/dist/reset.css';
import './App.css';
import LoginForm from "./components/login/login";
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import {RequireAuth} from "./routes/RequireAuth";
import LayoutMenu from "./components/layout-menu/layout-menu";
import {Switch} from "antd";
import Dashboard from "./components/dashboard/dashboard";
import RegisterForm from "./components/register/register";

const App: FC = () => (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route element={<RequireAuth><LayoutMenu/></RequireAuth>}>
                    <Route
                        path="/dashboard"
                        element={
                            <Dashboard></Dashboard>
                        }
                    />
                </Route>
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    </div>
);

export default App;