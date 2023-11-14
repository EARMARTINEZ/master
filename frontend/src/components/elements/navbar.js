import { getProviders, getSession, signIn, signOut, useSession } from "next-auth/react";
import {  useState } from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import { useRouter } from "next/router"
import { getButtonAppearance } from "utils/button"
import { mediaPropTypes, linkPropTypes, buttonLinkPropTypes } from "utils/types"
import { MdMenu } from "react-icons/md"
import MobileNavMenu from "./mobile-nav-menu"
import ButtonLink from "./button-link"
import NextImage from "./image"
import CustomLink from "./custom-link"
import LocaleSwitch from "../locale-switch"
import Logout from '../../components/user/Logout';

const Navbar = ({ navbar,  pageContext }) => {
  const router = useRouter()
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false)

  const { data: session, status } = useSession()  
  //const { accessToken } = data 
  
      /* if (status === "authenticated") {
        console.log('data '+session)     } */

      

  ////button

  const signInButtonNode = () => {
    if (session) {
           return false;
    }

    return (

         <div >
          {navbar.button && (
              <div className="hidden md:block">
                <ButtonLink
                  button={navbar.button}
                  appearance={getButtonAppearance(navbar.button.type, "light")}
                  compact
                />
              </div>
            )}
         </div>
  




    );
  };

  const signOutButtonNode = () => {
    if (!session) {
      return false;
    }

    return (   


        <div className="flex items-center justify-center gap-4">
        <Link href="/api/auth/signout">
              <button className="px-6 py-2 block w-full lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm border-2 rounded-md bg-primary-500 text-white border-primary-600  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >

           Cerrar
        </button>
        </Link>
        </div>        


    );
  };
 
////    
      


 /* if (session) {      */

  return (
    <>
      {/* The actual navbar */}
      <nav className="border-gray-000 border-b-10 py-8 sm:py-12">
        <div className="container flex flex-row items-center justify-between">
          {/* Content aligned to the left */}
          <div className="flex flex-row items-center">
            <Link href="https://pagosegurove.com/" >
              <a className="h-8 w-82">
                <NextImage width="250" height="50" media={navbar.logo} />
              </a>
            </Link>
            {/* List of links on desktop */}
            <ul className="hidden list-none md:flex flex-row gap-4 items-baseline ml-10">
              {navbar.links.map((navLink) => (
                <li key={navLink.id}>
                  <CustomLink link={navLink} locale={router.locale}>
                    <div className="text-blue-900 hover:text-blue-700 px-2 py-1">
                      {navLink.text}
                    </div>
                  </CustomLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex">
            {/* Locale Switch Mobile */}
            {pageContext.localizedPaths && (
              <div className="md:hidden">
                 {/* <LocaleSwitch pageContext={pageContext} /> */}
              </div>
            )}
            {/* Hamburger menu on mobile 
            
                <button
                  onClick={() => setMobileMenuIsShown(true)}
                  className="p-1 block md:hidden"
                >
                  <MdMenu className="h-8 w-auto" />
                </button>  
            
            */}

            {/* CTA button on desktop */}
              
               {/* {signInButtonNode()} */}
               {/*signOutButtonNode()*/}
               
          
               
            {/* Locale Switch Desktop */}
            {pageContext.localizedPaths && (
              <div className="hidden md:block">
                 {/* <LocaleSwitch pageContext={pageContext} /> */}
                
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile navigation menu panel */}
      {mobileMenuIsShown && (
        <MobileNavMenu
          navbar={navbar}
          closeSelf={() => setMobileMenuIsShown(false)}
        />
      )}
    </>
  )//Return 
      /* } return <p>Access Denied</p>  */
}

Navbar.propTypes = {
  navbar: PropTypes.shape({
    logo: PropTypes.shape({
      image: mediaPropTypes,
      url: PropTypes.string,
    }),
    links: PropTypes.arrayOf(linkPropTypes),
    button: buttonLinkPropTypes,
  }),
  initialLocale: PropTypes.string,
}



   /*  getServerSideProps().then(props => console.log(
      
      props
      
      ) )     */
export async function getServerSideProps(req) {       
  const providers = await getProviders();               
  const session = await getSession({ req });
 
         
  return {
    props: {
      providers,           
      session,
     
      
    },
  };
};

export default Navbar
