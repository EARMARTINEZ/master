import Markdown from "react-markdown"
import { getButtonAppearance } from "utils/button"
import ButtonLink from "../elements/button-link"
import NextImage from "../elements/image"
import { BasicTasks } from "utils/Provider/BasicProvider";
import { useTasks } from "utils/ProviderContext";

import  'flowbite'

const Hero = ({ data }) => {
  const { 
    NameCollection,
   
   } = useTasks();   
     
  //console.log(data)  
  return (  
    
    <>
    
      
    <div className="py-5 sm:px-2 lg:relative lg:px-0 lg:py-10"> 
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-3 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
     
           {/* Right column for the image */}
           <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 " />                
                <div className="relative overflow-hidden rounded-xl p-6 ">            
                   <NextImage media={data.picture} />            
                    <p className="uppercase tracking-wide font-semibold">{data.label} {NameCollection} </p>                
                    <p className="text-xl mb-4 sm:mb-2">{data.description}</p>                 
                  </div>              
              </div>

          {/* Left column for content */}
            <div className="relative z-10 md:text-center lg:text-left"> 
                <h2 className="title mt- sm:mt-0 mb-4 sm:mb-2">{data.title}</h2>         
                <div className="text-base md:text-sm mt-4 sm:mt-3 rich-text-hero">
                  <Markdown>{data.smallTextWithLink}</Markdown>
                </div>
              {/* Buttons row */}        
              {data.buttons.map((button) => (
                    <ButtonLink
                      button={button}
                      appearance={getButtonAppearance(button.type, "light")}
                      key={button.id}
                    />
                  ))}
            </div>
       

          </div>
        </div>

        
     
            
    </>
   
  )
}

export default Hero
