import React from "react";
import Router from "./Router/Router";
import NavBar from "./Components/Templates/NavBar";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <NavBar/>
      <Router />
    </SnackbarProvider>
  );
}

export default App;
