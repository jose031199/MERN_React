import {BrowserRouter,Route,Routes} from 'react-router-dom'
import AddBooks from './components/AddBooks';
import Books from './components/Books';
import Update from './components/Update';
import  './css/style.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Books/>}></Route>
          <Route path='/add' element={<AddBooks/>}></Route>
          <Route path='/update/:id' element={<Update/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
