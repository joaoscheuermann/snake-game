import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import "./index.css";
import Home from "./components/routes/Home";
import GameOver from "./components/routes/GameOver";
import Game from "./components/routes/Game";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Theme accentColor="amber">
        <Routes>
          <Route index element={<Home />} />
          <Route path="play" element={<Game />} />
          <Route path="game-over" element={<GameOver />} />
        </Routes>
      </Theme>
    </BrowserRouter>
  </StrictMode>
);
