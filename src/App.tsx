import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AppBar } from "common/components/AppBar";
import Orders from "view/Orders";

import styles from "./App.module.css";
import "./index.css";

function App() {
  return (
    <div className={styles.wrapper}>
      <BrowserRouter>
        <AppBar />
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
