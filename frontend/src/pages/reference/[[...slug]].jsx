
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { getPageData, fetchAPI, getGlobalData } from "utils/api";
import { getLocalizedPaths } from "utils/localize";
import Sections from "@/components/sections/sections";
//import { getSession } from 'next-auth/react';

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicPage = ({ sections, metadata, preview, global, pageData,pageContext }) => {
  const router = useRouter();
  
  
  // Check if the required data was provided
  if (!router.isFallback && !sections?.length) {  
    return <ErrorPage statusCode={404} />;
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>;
  }

  // Merge default site SEO settings with page specific SEO settings
  if (metadata.shareImage?.data == null) {
    delete metadata.shareImage;
  }
  const metadataWithDefaults = {
    ...global.attributes.metadata,
    ...metadata,
  };
  //console.log(pageContext)
  return (
    <>
    {/* Display content sections */}
    <Sections sections={sections} pageDatas={pageData} preview={preview} />

      
    </>
  );
};

export async function getServerSidePaths(context) {
  // Get all pages from Strapi
  const pages = await context.locales.reduce(
    async (currentPagesPromise, locale) => {
      const currentPages = await currentPagesPromise;
      const localePages = await fetchAPI("/pages", {
        locale,
        fields: ["slug", "locale"],
      });
      return [...currentPages, ...localePages.data];
    },
     Promise.resolve([])
  );

  const paths = pages.map((page) => {
    const { slug, locale } = page.attributes;
    // Decompose the slug that was saved in Strapi
    const slugArray = !slug ? false : slug.split("/");

    return {
      params: { slug: slugArray },
      // Specify the locale to render
      locale,
    };
  });
  
  return { paths, fallback: true };
}

export async function getServerSideProps(context) {
  const {
    params,
    locale,
    locales,
    defaultLocale,
    limit = 1,
    preview = null,
  } = context;
  
  //const session = await getSession(context);

  const globalLocale = await getGlobalData(locale);
  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getPageData({
    slug: (!params.slug ? [""] : params.slug).join("/"),    
    locale,
    limit,
    preview,
  });
  //console.log(pageData)
  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} };
  }
  
  // We have the required page data, pass it to the page component
  const { contentSections, metadata, localizations, slug } =
    pageData.attributes;
  const pageContext = {
    locale,
    locales,
    defaultLocale,
    slug,
    localizations,
  };
  
  const localizedPaths = getLocalizedPaths(pageContext);
  
 
  
  // if (session == null) {
  //   return {
  //     redirect: {
  //       destination: '/auth/login',
  //       permanent: true,
  //     },
  //   };
  // } 
  
  return {
    props: {
      pageData,
      preview,
      sections: contentSections,
      //session,
      metadata,
      global: globalLocale.data,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
    },
  };
}
export default DynamicPage;
