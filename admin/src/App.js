import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ApprovedQuotes from './Pages/ApprovedQuotes';
import QuotesToApprove from './Pages/QuotesToApprove';

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<QuotesToApprove />} />
					<Route
						path='/approvedquotes'
						element={<ApprovedQuotes />}
					/>
				</Routes>
			</Router>
			<div></div>
		</>
	);
}

export default App;
