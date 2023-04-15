import Cards from './components/Cards.jsx';
import Nav from './components/Nav';
import About from './components/About.jsx';
import Detail from './components/Detail.jsx';
import Form from './components/Form.jsx';
import axios from 'axios';
import {useState,useEffect} from 'react'
import { Routes,Route,useLocation,useNavigate } from 'react-router-dom';


const url_base='https://be-a-rym.up.railway.app/api/character';
const apiKey='4a3d9ecfb7d1.e28339605e2e942608f5';

const email = 'lean@gmail.com';
const password = '123asd';


function App() {
   const location=useLocation();
   const navigate = useNavigate();
   const [characters,setCharacters]=useState([])
   const [access, setAccess] = useState(false);


   const login = (userData) => {
      if(userData.email === email && userData.password === password){
         setAccess(true);
         navigate('/home');
      }
   }
   useEffect(() => {
      !access && navigate('/')
   }, [access])

   function onSearch(id) {
      axios(`${url_base}/${id}?key=${apiKey}`)
      .then(response=>response.data)
      .then(( data ) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            alert('¡No hay personajes con este ID!');
         }
      });
   }
   const onClose = (id) => {
      const charactersFiltered = characters.filter(character => character.id !== id)
      setCharacters(charactersFiltered)
   }
   return (
      <div className='App'>
         {
            location.pathname!=='/'&& <Nav onSearch={onSearch}/>
         }
        
         <Routes>
            <Route path='/' element={<Form login={login}/>}/>
            <Route path='/home' element={ <Cards characters={characters} onClose={onClose}/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/detail/:id' element={<Detail/>}/>
         </Routes>
      </div>
   );
}

export default App;
