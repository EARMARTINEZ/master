import Image from 'next/image'
import eruizPicture from '@/images/eruizPicture.jpg'
import { Fragment } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import clsx from 'clsx'

const codeLanguage = 'javascript'
const code = `let code = [
    'Javascript',
    'TypeScript',
    'Dart',
    'Python'  ];
    
 let framework = [
    'Next.js',
    'Flutter',
    'Tailwindcss',
    'Django'  ]; `


export const CardProfilePicture = () => {       

  
      return (
        <>             
            <div className="grid grid-cols-4 gap-4 ">
                <div className="col-span-6 sm:col-span-2 ">         
                    <Image
                        className="mt-6 flex items-start inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-40 blur-0   "
                        src={eruizPicture}
                        alt=""
                        width={300}
                        height={300}
                        unoptimized
                        priority
                    />
                 </div>   
                                        
                    <div className="col-span-3 sm:col-span-2"> 
                        <div className="mt-6 flex items-start px-1 text-sm">
                            <div
                            aria-hidden="true"
                            className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600"
                            >
                            {Array.from({
                                length: code.split('\n').length,
                            }).map((_, index) => (
                                <Fragment key={index}>
                                {(index + 1).toString().padStart(2, '0')}
                                <br />
                                </Fragment>
                            ))}
                            </div>
                            <Highlight
                            {...defaultProps}
                            code={code}
                            language={codeLanguage}
                            theme={undefined}
                            >
                            {({
                                className,
                                style,
                                tokens,
                                getLineProps,
                                getTokenProps,
                            }) => (
                                <pre
                                className={clsx(
                                    className,
                                    'flex overflow-x-auto pb-6'
                                )}
                                style={style}
                                >
                                <code className="px-4">
                                    {tokens.map((line, lineIndex) => (
                                    <div key={lineIndex} {...getLineProps({ line })}>
                                        {line.map((token, tokenIndex) => (
                                        <span
                                            key={tokenIndex}
                                            {...getTokenProps({ token })}
                                        />
                                        ))}
                                    </div>
                                    ))}
                                </code>
                                </pre>
                            )}
                            </Highlight>
                        </div>                            
                    </div> 
                
                </div>      
        </>

);
  }
  