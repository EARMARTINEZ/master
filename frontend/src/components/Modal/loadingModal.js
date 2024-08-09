import { useTasks } from "utils/ProviderContext";


const LoadingModal =({ data }) => {
  
  const { showModalLoading} = useTasks();
   
  
  return (
    <>
     
      {showModalLoading ? (
        <>
          {/* This is an example component */}
      <div>
        <style dangerouslySetInnerHTML={{__html: "\n\n.loader-dots div {\n    animation-timing-function: cubic-bezier(0, 1, 1, 0);\n}\n.loader-dots div:nth-child(1) {\n    left: 8px;\n    animation: loader-dots1 0.6s infinite;\n}\n.loader-dots div:nth-child(2) {\n    left: 8px;\n    animation: loader-dots2 0.6s infinite;\n}\n.loader-dots div:nth-child(3) {\n    left: 32px;\n    animation: loader-dots2 0.6s infinite;\n}\n.loader-dots div:nth-child(4) {\n    left: 56px;\n    animation: loader-dots3 0.6s infinite;\n}\n@keyframes loader-dots1 {\n    0% {\n        transform: scale(0);\n    }\n    100% {\n        transform: scale(1);\n    }\n}\n@keyframes loader-dots3 {\n    0% {\n        transform: scale(1);\n    }\n    100% {\n        transform: scale(0);\n    }\n}\n@keyframes loader-dots2 {\n    0% {\n        transform: translate(0, 0);\n    }\n    100% {\n        transform: translate(24px, 0);\n    }\n}\n" }} />
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center" style={{background: 'rgba(0, 0, 0, 0.3)'}}>
          <div className="bg-white border py-2 px-5 rounded-lg flex items-center flex-col">
            <div className="loader-dots block relative w-20 h-5 mt-2">
              <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500" />
              <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500" />
              <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500" />
              <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500" />
            </div>
            <div className="text-gray-500 text-xs font-medium mt-2 text-center">
            Executing action, this might take a moment...
            </div>
          </div>
        </div>
      </div>
          
        </>
      ) : null}
    </>
  );
};

export default LoadingModal;