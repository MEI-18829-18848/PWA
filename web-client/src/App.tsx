import React from 'react';
import type { FC } from 'react';
import 'antd/dist/reset.css';
import './App.css';
import LoginForm from "./login/login";
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import {RequireAuth} from "./routes/RequireAuth";
import RegisterForm from "./register/register";
import Dashboard from "./dashboard/dashboard";

const App: FC = () => (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route
                    path="/dashboard"
                    element={
                        <RequireAuth>
                            <Dashboard></Dashboard>
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    </div>
);

export default App;