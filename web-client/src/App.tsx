import React from 'react';
import type { FC } from 'react';
import 'antd/dist/reset.css';
import './App.css';
import LoginForm from "./login/login";
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import {RequireAuth} from "./routes/RequireAuth";

const App: FC = () => (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route
                    path="/dashboard"
                    element={
                        <RequireAuth>
                            <LoginForm></LoginForm>
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    </div>
);

export default App;