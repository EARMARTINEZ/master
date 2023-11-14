import { signOut, useSession } from 'next-auth/react';
import {  FormItemResetpassword } from '@/components/sections/sections/FormItemResetpassword'
import { Hero } from '@/components/Hero'

const Resetpassword = () => {

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

                        <p className="m-5">Enter and confirm a new password</p>

                        <FormItemResetpassword /> 
                        
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

export default Resetpassword;
