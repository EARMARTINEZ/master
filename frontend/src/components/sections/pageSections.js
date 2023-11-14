import { useRouter } from "next/router";
import Blog from "@/components/sections/blog";



// Map Strapi sections to section components
const sectionComponents = {
  ComponentSectionsHero: Blog,  
  
};

// Display a section individually
const Section = ({  pageSection }) => {
  // Prepare the component
  //console.log(pageSection) 
 
  let SectionComponent=[];
  let sectionComponent=[];

  pageSection.forEach(function(elemento) { 
        SectionComponent = sectionComponents[elemento.__typename]
        
        if (!SectionComponent) {
        return null;
        }
        sectionComponent.push(SectionComponent)      
    }) 
//console.log(sectionComponent[1])
    SectionComponent = sectionComponent[0]

return <SectionComponent data={pageSection}  />
};



const PreviewModeBanner = () => {
  const router = useRouter();
  const exitURL = `/api/exit-preview?redirect=${encodeURIComponent(
    router.asPath
  )}`;

  return (
    <div className="py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
      <div className="container">
        Preview mode is on.{" "}
        <a
          className="underline"
          href={`/api/exit-preview?redirect=${router.asPath}`}
        >
          Turn off
        </a>
      </div>
    </div>
  );
};


// Display the list of sections
const PageSections = ({ pageDatas ,preview }) => {   
  const { contentSections } = pageDatas.attributes; 
  return (
    <div className="flex flex-col">
      {/* Show a banner if preview mode is on */}
      {preview && <PreviewModeBanner />}
      {/* Show the actual sections */}    
        <Section
          pageSection={contentSections}        
          key={`${contentSections.__typename}${contentSections.id}`}
        />           
    </div>
  );
};

export default PageSections;
