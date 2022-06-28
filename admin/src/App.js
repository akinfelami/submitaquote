import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApprovedQuotes from './Pages/ApprovedQuotes';
import QuotesToApprove from './Pages/QuotesToApprove';
import DeclinedQuotes from './Pages/DeclinedQuotes';
import Navbar from './components/Navbar';

function App() {
	return (
		<Router>
			<Navbar />

			<Routes>
				<Route path='/' element={<QuotesToApprove />} />
				<Route path='/approvedquotes' element={<ApprovedQuotes />} />
				<Route path='/declinedquotes' element={<DeclinedQuotes />} />
			</Routes>
		</Router>
	);
}

export default App;
