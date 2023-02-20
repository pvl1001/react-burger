import ReactDOM from 'react-dom/client'
import 'styles/main.scss'
import App from './components/App'
import {Provider} from "react-redux";
import {store} from "./services/store";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
)

root.render(
   // <React.StrictMode>
   <BrowserRouter>
      <Provider store={store}>
         <App/>
      </Provider>
   </BrowserRouter>
   // </React.StrictMode>
)

