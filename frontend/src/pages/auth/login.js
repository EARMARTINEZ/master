import { signOut, useSession } from 'next-auth/react';
import {  FormItemLogin } from '@/components/sections/sections/FormItemLogin'
import { Hero } from '@/components/Hero'

const Login = () => {

  const { data: session } = useSession();

  return (
    <>
    
     
     <div >
     {!session ? (
        
          <div className="py-1 flex items-center bg-white ">
            <div className="flex-1 h-full max-w-2xl mx-auto bg-white rounded-lg shadow-xl ">
              <div className="flex flex-col md:flex-row">
                
                  <div className="grid grid-cols- gap-1 m-0 py-1">
                  <div className="col-start-1 col-span-1 ">   
                      <Hero />
                    </div>
                    <div className="col-start-1 col-span-1 m-5">   
                        <FormItemLogin  /> 
                    </div>
                  </div>

                  </div>
                </div>

              </div>
          
         
       ) : null}   
     
     
     
     
    </div>
    
    </>
  
  )
};

export default Login;
