import Markdown from "react-markdown"
import { getButtonAppearance } from "utils/button"
import ButtonLink from "../elements/button-link"
import NextImage from "../elements/image"
import { useState } from "react"

const Blog = ({ data }) => {
  //console.log(data)
 
   return (  
    
    <> 
    
      <ol className="relative border-l border-gray-300 dark:border-gray-700">         
      {data.map((_data) => (   
          _data.slugSection =='BlogSectionsHero' && (  
            <li className="mb-10 ml-4"  key={_data.id}  >       
              <div className="absolute w-3 h-3 bg-gray-300 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{_data.label}</time>
            
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{_data.title}</h3>
              <div className="text-base md:text-sm mt-4 sm:mt-3 rich-text-hero">
                        <Markdown>{_data.smallTextWithLink}</Markdown>
                      </div>
            
                  {_data.buttons.map((button) => (       
                      <a 
                        key={button.id}  
                        href={button.url} 
                        className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
                      {button.text }<span aria-hidden="true">&rarr;</span></a>
                  ))}      
            </li> 
          )
      ))}  
    </ol>    
  
    </>
   
  )
}

export default Blog
