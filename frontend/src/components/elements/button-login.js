import classNames from "classnames"
import PropTypes from "prop-types"
import { buttonLinkPropTypes } from "utils/types"
import Loader from "./loader"

const ButtonLogin = ({
  button,
  appearance,
  compact = false,
  handleClick,
  loading = false,
  type,
}) => {
  return (
    <button 
    link={button} 
    onClick={handleClick} 
    type={type} 
    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue" 
    >
      
        {loading && <Loader />}
        {button.text}
      
    </button>
  )
}

ButtonLogin.propTypes = {
  button: buttonLinkPropTypes,
  appearance: PropTypes.oneOf([
    "dark",
    "white-outline",
    "white",
    "dark-outline",
  ]),
  compact: PropTypes.bool,
}

export default ButtonLogin
