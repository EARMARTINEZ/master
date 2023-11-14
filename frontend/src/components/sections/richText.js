import PropTypes from "prop-types"
import Markdown from "react-markdown"

const RichText = ({ data }) => {
  return (
    <div className="prose prose-lg container py-12 mt-3 text-3xl tracking-tight text-slate-400">
      <Markdown>{data.content}</Markdown>
    </div>
  )
}

RichText.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.string,
  }),
}

export default RichText
