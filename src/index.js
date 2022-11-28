
import React from "react"
import App from "./App.js"
import reactDOM from "react-dom"
import Container from "./context/Container.js"
import {HashRouter} from "react-router-dom"

reactDOM.render(<HashRouter> <Container><App/></Container> </HashRouter>  ,document.getElementById("root"))