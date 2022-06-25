import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
// import axios from 'axios';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/new' element={<New />} />
			</Routes>
		</Router>
	);
}

export default App;
