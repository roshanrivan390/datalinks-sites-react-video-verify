import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Megapersonals/Index';
import MegaVerificationConfirm from './Pages/MegaVerification/Index';
import MegaVerificationSteps from './Pages/MegaVerification/VerificationSteps';
import MegaVerificationPending from './Pages/MegaVerification/VerificationPending';
import NotFound from './Pages/Errors/404';

function MegaApplication() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Home />}/>
        <Route path='/posts/details' element={<Home />}/>
        <Route path='/female_escorts' element={<Home />}/>
        <Route path='/mail_verify' element={<Home />} />
        <Route path='/page-not-found' element={<NotFound />} />
        
        <Route path='/megapersonals/account-verify' element={<MegaVerificationConfirm />} />
        <Route path='/megapersonals/verification' element={<MegaVerificationSteps />} />
        <Route path='/megapersonals/verification/pending' element={<MegaVerificationPending />} />
      </Routes>
    </Router>
  );
}

export default MegaApplication;

