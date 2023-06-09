import { render } from "preact"
import { Provider } from "react-redux"

import { App } from "./app.tsx"
import "./index.css"
import { store } from "./state/store.ts"


const el_app: HTMLElement = document.getElementById("app")!

render(
    <Provider store={store}>
        <App />
    </Provider>
, el_app)
