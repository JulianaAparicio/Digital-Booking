import { RouterProvider } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import { router } from './core/Routes';
import Header from './components/Header/Header';
import { DataProvider } from './core/Context';

function App() {
   return (
      <DataProvider>
         <div id="app">
            <Header />
            <main>
               <RouterProvider  router={router} />
            </main>
            <Footer>©2022 Digital Booking</Footer>
         </div>
      </DataProvider>
   );
}

export default App;
