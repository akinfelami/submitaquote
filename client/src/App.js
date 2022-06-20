import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/AdminPage';
import Home from './pages/Home';
import New from './pages/New';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/new' element={<New />} />
				<Route path='/admin' element={<Admin />} />
			</Routes>
		</Router>
	);
}

export default App;
