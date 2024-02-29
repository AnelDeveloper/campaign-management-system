import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CampaignDashboard from './Pages/CampaignDashboard'; 
import { Notifications } from './Components/Notifications/notification';


function App() {
  return (
    <Router>
      <div>
      <Notifications /> 
        <Routes>
          <Route path="/" element={<CampaignDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
