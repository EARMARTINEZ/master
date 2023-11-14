import Markdown from "react-markdown"
import classNames from "classnames"
import { MdClose } from "react-icons/md"



const NotificationDash = ({ data: { text, type }, closeSelf }) => {
  return (
    <div
      className={classNames(
        // Common classes
        "text-white px-1 py-1",
        {
          // Apply theme based on notification type
          "bg-green-100 rounded-lg py-2 px-6 mb-4 text-base text-green-700 mb-3 ": type === "info",
          "bg-orange-600": type === "warning",
          "bg-red-600": type === "alert",
        }
      )}
    >
      <div className="container flex flex-row justify-between items-center hover:transition-all duration-1000">
        <div className="rich-text-banner flex-1 duration-1000">
          <Markdown>{text}</Markdown>
        </div>
        <button onClick={closeSelf} className="px-1 py-1 flex-shrink-0 duration-1000">
          <MdClose className="h-6 w-auto" color="#fff" />
        </button>
      </div>
    </div>
  )
}

export default NotificationDash
