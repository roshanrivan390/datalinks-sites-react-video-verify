import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/VideoCalling/Index';
import Login from './Pages/VideoCalling/Login';
import MegaVerificationConfirm from './Pages/MegaVerification/Index';
import MegaVerificationSteps from './Pages/MegaVerification/VerificationSteps';
import MegaVerificationPending from './Pages/MegaVerification/VerificationPending';
import NotFound from './Pages/Errors/404';

function VideoCallingApplication() {

  return (
    <Router>
      <Routes>
        <Route path='/:site/invite/:categoryType' element={<Home />} />
        <Route path='/:site/login/:categoryType' element={<Login />} />
        
        <Route path='/megapersonals/account-verify' element={<MegaVerificationConfirm />} />
        <Route path='/megapersonals/verification' element={<MegaVerificationSteps />} />
        <Route path='/megapersonals/verification/pending' element={<MegaVerificationPending />} />

        <Route path='/page-not-found' element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default VideoCallingApplication;

