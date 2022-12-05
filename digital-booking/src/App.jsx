import { BrowserRouter, RouterProvider } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import { router } from './core/Routes';
import Header from './components/Header/Header';
import { DataProvider } from './core/Context';

function App() {
   return (
      <DataProvider>
         <div id="app">
            <RouterProvider router={router} />
         </div>
      </DataProvider>
   );
}

export default App;
