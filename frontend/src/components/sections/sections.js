import { useRouter } from "next/router";
import ReporCollectionPdf from "@/components/sections/Reports/ReporCollectionPdf";
import RichText from "@/components/sections/richText";

import { CardReference } from '@/components/Cards/DetailReference/CardReference'
import { CardTableSearchReference} from '@/components/Cards/CardTableSearchReference'
import RegistroForm from "@/pages/auth/login";

// Map Strapi sections to section components
const sectionComponents = {
  ComponentSectionsHero: ReporCollectionPdf,   
  ComponentSectionsRichText: CardTableSearchReference,
  ComponentSectionsRegistroform: RegistroForm,
};

// Display a section individually
const Section = ({ sectionData }) => {
  // Prepare the component  
  const SectionComponent = sectionComponents[sectionData.__typename];  
  if (!SectionComponent) {
    return null;
  }

  // Display the section
  return <SectionComponent data={sectionData}  />;
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
const Sections = ({ sections, preview }) => {  
  
  return (
    <div className="flex flex-col">
      {/* Show a banner if preview mode is on */}
      {preview && <PreviewModeBanner />}
      {/* Show the actual sections */}
      {sections.map((section) => (
        <Section
          sectionData={section}        
          key={`${section.__typename}${section.id}`}
        />        
      ))}       
      
    </div>
  );
};

export default Sections;
