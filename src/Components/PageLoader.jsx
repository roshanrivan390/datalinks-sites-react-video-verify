import { useEffect, useState } from "react";

const PageLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false)
    }, 500)
  }, []);
  return (
    <div className={isLoading ? 'w-screen h-screen flex justify-center items-center fixed bg-base-300 z-50' : ''}>
      {
        isLoading ? <span></span> : children
      }
    </div>
  )
}
export default PageLoader
