import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import { App } from "./app.tsx"
import "./index.css"
import { store } from "./state/store.ts"


const el_app: HTMLElement = document.getElementById("app")!

ReactDOM.createRoot(el_app).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
