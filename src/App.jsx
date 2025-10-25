import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NewsSection from './components/NewsSection';
import ReportSection from './components/ReportSection';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  console.log('App rendered - Active section:', activeSection);

  const renderSection = () => {
    console.log('Rendering section:', activeSection);
    
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'news':
        return <NewsSection />;
      case 'reports':
        return <ReportSection />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      {renderSection()}
    </div>
  );
}

export default App;
