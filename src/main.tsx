import { render } from "preact"
import { Provider } from "react-redux"


render(
    <Provider>
        <div />
    </Provider>
, document.getElementById("app") as HTMLElement)
