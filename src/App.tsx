import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Sidebar } from "common/components/Sidebar";
import Orders from "view/Orders";

import styles from "./App.module.css";
import "./index.css";

function App() {
  return (
    <div className={styles.wrapper}>
      <BrowserRouter>
        <Sidebar />
        <main className={styles.main}>
          <Routes>
            <Route path="/*" element={<Orders />} />
            <Route path="/" element={<Navigate to="/orders" />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
