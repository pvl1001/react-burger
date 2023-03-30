import ReactDOM from 'react-dom/client'
import 'styles/main.scss'
import App from './components/App'
import { Provider } from "react-redux";
import store from "./services/store";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
   document.getElementById( 'root' ) as HTMLElement
)

root.render(
   // <React.StrictMode>
   <HashRouter>
      <Provider store={ store }>
         <App/>
      </Provider>
   </HashRouter>
   // </React.StrictMode>
)

