import { Fragment } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import Highlight, { defaultProps } from 'prism-react-renderer'

import { Button } from '@/components/Button'
import { HeroBackground } from '@/components/HeroBackground'
import blurCyanImage from '@/images/blur-cyan.png'
import blurIndigoImage from '@/images/blur-indigo.png'

import { CardDoughnut } from '@/components/Cards/CardDoughnut'
import { CardProfilePicture } from '@/components/Cards/CardProfilePicture'
import epkImage from '@/images/logoEpk.jpg'

import  'flowbite'

const codeLanguage = 'javascript'
const code = `export async function getStaticPaths() {
  const posts = await getFiles("posts");
  const paths = posts.map((post) => ({
    params: {
      slug: post.replace(/\.mdx/, ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
`

const tabs = [
  // { name: '[slug].js', isActive: true },
  { name: 'Emmanuel Ruiz', isActive: true },
]

function TrafficLightsIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  )
}

export function Hero() {
  return (
    <div className="overflow-hidden bg-blue-950 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-12">
       
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
                        
              <div className="relative lg:static xl:pl-10">
                      <div className="absolute inset-x-[-50vw] -bottom-48 -top-32 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:-bottom-32 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0 lg:[mask-image:none] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
                        {/* <HeroBackground className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" /> */}
                      </div>
                    
                                  
                        <div className="relative rounded-2xl">              
                          <div className="pl-1 pt-1">          
                              <div
                                aria-hidden="true"
                                className="select-none"
                              >
                                <Image
                                    className=" rounded-2xl opacity-90 "
                                    src={epkImage}
                                    alt=""
                                    width={200}
                                    height={330}
                                    unoptimized
                                    priority
                                  />
                              </div>           
                            </div>
                        </div>            
              </div>
          
              <div className="relative z-10 md:text-center lg:text-left">              
                      <div className="relative">
                        <p className="inline bg-gradient-to-r from-indigo-100 via-indigo-100 to-indigo-100 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                        Master Collection
                        </p>                  
                      
                      </div>
              </div>

          </div>
        
      </div>
    </div>
  )
}
