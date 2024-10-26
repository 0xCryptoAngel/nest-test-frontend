import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import NoPageFound from "./pages/NoPageFound";
import { useEffect, useState } from "react";

import AllRelations from "./pages/AllRelations";
import NewRelation from "./pages/NewRelation";
import EditRelation from "./pages/EditRelation";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<AllRelations />} />
          <Route path="/new-relation" element={<NewRelation />} />
          <Route path="/:id/edit" element={<EditRelation />} />
        </Route>
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
