
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageLoader from '../../Components/PageLoader';

export default function Index() {

   const [searchParams, setSearchParams] = useSearchParams();
   const [token, setToken] = useState('')
   const navigate = useNavigate();

   useEffect(() => { 
      if (!searchParams.get("token")) {
         navigate('/page-not-found'); 
      } else {
         setToken(searchParams.get("token"))
      }
   }, [searchParams])
  return (
     <>
        <Helmet>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css"/>
            <link rel="stylesheet" href='/mega-verification/v2/css/p1/custom.css' />
            <link rel="stylesheet" href='/mega-verification/v2/css/p1/emojionearea.min.css' />
            <link rel="icon" href="/megapersonals/images/devilgirl_favicon.ico" type="image/x-icon" />
           <title>MegaPersonals: Classified hookups</title>
        </Helmet>
        <PageLoader>
           <div className="frontpage">
         <div className="container candywrapper" style={{ paddingLeft: '4em', paddingRight: '4em' }}>
            <div className="row">
               <a href="">
               <img
                  src="/mega-verification/v2/images/megapersonalsPageHeader3.png"
                  className="img-responsive center-block"
                  id="megapersonalsPageHeader"
                  />
               </a>
            </div>
            <div className="row">
               <img
                  src="/mega-verification/v2/images/almostThereDarlings.png"
                  className="img-responsive center-block"
                  />
            </div>
            <div className="row">
               <div id="confirmModal_verification" role="dialog">
                  <div className="modal-dialog">
                     <div className="modal-content modal-content-white" id="termsandconditions">
                        <div className="modal-body">
                           <img src="/mega-verification/v2/images/ageCheckPopup.png"/>
                           <div className="centered">
                              <p className="popup-text">
                                 You must prove you<br/>
                                 are 18 years or older.
                              </p>
                              <br/>
                              <p className="popup-text">
                                 To help prevent scammers<br/>
                                 and support this process<br/>
                                 there is a one time fee<br/>
                                 of <span className="text-success"><strong>&#8364;15 + tax</strong></span>
                              </p>
                              <br/>
                           </div>
                        </div>
                        <div className="modal-footer flex-btn-row text-center">
                            <a href={'/megapersonals/verification?token=' + token} className="btn btn-success btn-lg text-white" id="button-ok">
                               <h3 className="bold text-uppercase mt-0">Ok let's go</h3>
                               <span className="text-uppercase">I will pay fee</span><br/>
                            </a>
                            <a href={'/megapersonals/verification?token=' + token} className="btn btn-danger btn-lg text-white"  id="close-verification" data-dismiss="modal">
                               <h3 className="bold text-uppercase mt-0">No thanks</h3>
                               <span className="text-uppercase">Exit Verification</span><br/>
                            </a>
                         </div>
                     </div>
                  </div>
               </div>
            </div>

         </div>
              </div>
        </PageLoader>
     </>
  )
}

      
