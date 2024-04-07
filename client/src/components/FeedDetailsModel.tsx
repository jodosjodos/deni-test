import { useState } from "react";
import useFetchComments from "../utils/comments";
import { Feed } from "../utils/feeds";
import { format } from "date-fns";
interface FeedDetailsComponentProps {
    feed: Feed;
    onClose: () => void;
  }
  
const FeedDetailsComponent: React.FC<FeedDetailsComponentProps> = ({ feed, onClose }) => {
    const { comments, loading } = useFetchComments(feed.briefref);
    const [activeItemIndex, setActiveItemIndex] = useState(0); // 0 for media, 1 for details
  
    const handleScroll = (direction: 'up' | 'down') => {
      setActiveItemIndex((prevIndex) => {
        if (direction === 'up' && prevIndex > 0) {
          return prevIndex - 1;
        } else if (direction === 'down' && prevIndex < 1) { // Assuming only two items for simplicity
          return prevIndex + 1;
        }
        return prevIndex;
      });
    };
  
    return (
      <div className="fixed inset-0 z-40 overflow-auto bg-black bg-opacity-80 flex justify-center items-center">
        <div className="relative bg-white w-full max-h-full max-w-4xl mx-2 my-8 rounded-lg overflow-hidden flex">
          {/* Close Button */}
          < img src="/close-dialog.svg" onClick={onClose} className="absolute top-0 left-0 p-4  z-50 inset-0"/>
  
          {/* Left Side Content */}
          <div className="flex-grow overflow-hidden">
            <div className={`flex flex-col h-full transition-transform duration-300 ${activeItemIndex === 1 ? '-translate-y-full' : 'translate-y-0'}`}>
              {/* Media Item */}
              <div className="flex flex-col items-center justify-center h-full bg-black">
                <img src={feed.banner_image} alt="Banner" className="max-h-full max-w-full" />
              </div>
  
              {/* Feed Details Item */}
              <div className="flex flex-col items-center justify-center h-full">
                <img src={feed.brand.logo} alt="Brand" className="mb-4" />
                <h2 className="text-lg font-semibold">{feed.feed_title}</h2>
                <p className="text-center">{format(new Date(feed.starts_on), 'dd MMMM yyyy')}</p>
                <p className="text-center">{feed.banner_text}</p>
                <img src={feed.ad_1_image} alt="Ad 1" className="my-4" />
                <img src={feed.ad_2_image} alt="Ad 2" />
              </div>
            </div>
  
            {/* Navigation Arrows */}
            <img src="/switch-down.svg" className={`absolute top-1/2 right-4 rotate-180 ${activeItemIndex === 0 ? 'invisible' : ''}`} onClick={() => handleScroll('up')}/>
            <img src="/switch-down.svg" className={`absolute top-1/2 right-4 ${activeItemIndex === 1 ? 'invisible' : ''}`} onClick={() => handleScroll('down')}/>
          </div>
  
          {/* Right Side Content: Comments */}
          <div className="w-500px bg-gray-100 overflow-y-auto">
            <div className="p-4">
              <img src={feed.brand.logo} alt="Brand" className="block mx-auto" />
              <h3 className="text-center text-lg font-semibold my-4">{feed.brand.name}</h3>
              <div>
                {loading ? <p>Loading comments...</p> : comments.map((comment) => (
                  <div key={comment.bcommentref} className="my-4 p-2 border-b">
                    <div className="flex items-center space-x-2">
                      <img src={comment.user.avatar} alt={comment.user.name} className="w-10 h-10 rounded-full" />
                      <span className="font-semibold">{comment.user.name}</span>
                    </div>
                    <p className="mt-2">{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default FeedDetailsComponent;