import { getStrapiMedia } from "utils/media"
import Image from "next/image"
import PropTypes from "prop-types"
import { mediaPropTypes } from "utils/types"

const NextImage = ({ media, ...props }) => {
  const { url, alternativeText, width, height } = media.data.attributes  

  const loader = ({ src, width, quality }) => {
    return getStrapiMedia(src, width, quality)
   
  }

  const myLoader = ({ src, width, quality }) => {
    return `http://localhost:1381${src}?w=${width}&q=${quality || 75}`
  }
 //console.log( media.data.attributes )
  // The image has a fixed width and height
  if (props.width && props.height) {
    return (
      <Image 
      loader={loader}
      unoptimized 
      src={url} 
      alt={alternativeText || ""} 
      {...props} 
      
      />
    )
  }

  // The image is responsive
  return (
    <div className="relative z-10 md:text-center lg:text-left"> 
    
    <Image
      loader={loader}     
      width={width || "100%"}
      height={height || "100%"}
      priority     
      src={url}
      alt={alternativeText || ""}

     
    />

</div>
  )
}

Image.propTypes = {
  media: mediaPropTypes,
  className: PropTypes.string,
}

export default NextImage
