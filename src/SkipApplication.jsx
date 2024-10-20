import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Skipthegames/Index';
import NotFound from './Pages/Errors/404';

function SkipApplication() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Home />}/>
        <Route path='/posts/details' element={<Home />}/>
        <Route path='/female_escorts' element={<Home />}/>
        <Route path='/mail_verify' element={<Home />} />
        <Route path='/page-not-found' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default SkipApplication;

