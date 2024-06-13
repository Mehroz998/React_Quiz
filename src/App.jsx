import './App.css';
import Home from './Components/Home.jsx'
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import ViewQuestion from './Components/ViewQuestion.jsx';
import Result from './Components/Result.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<><Home/></>
    },
    {
      path:'/questions',
      element:<><ViewQuestion/></>
    },
    {
      path:'/result',
      element:<><Result/></>
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
        {/* <Home></Home> */}

    </div>
  );
}

export default App;
