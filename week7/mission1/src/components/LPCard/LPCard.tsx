import { useNavigate } from "react-router-dom";
import type { Likes, Tag } from "../../types/lp";
import { AiOutlineLike } from "react-icons/ai";

interface LPCardProps {
  id: number;
  thumbnail: string;
  title: string;
  tags: Tag[];
  likes: Likes[];
  content: string;
}

const LPCard = ({ id, thumbnail, title, tags, likes, content }: LPCardProps) => {

  const navigate = useNavigate();
  
  return (
    <div
      onClick={()=> navigate(`/lp/${id}`)}
      key={id}
      className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 cursor-pointer group"
    >
      <div className="w-full aspect-square bg-gray-700 relative overflow-hidden">
        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-90 transition-opacity flex flex-col justify-between p-4">
          <section>
            <h4 className="text-white font-bold text-lg truncate">{title}</h4>
            <p className="text-gray-300 text-sm mt-1 line-clamp-2">{content}</p>
          </section>
          <p className="text-gray-400 text-xs flex flex-row justify-end">
            좋아요 <span> <AiOutlineLike /> </span> {likes.length} 
          </p>
        </div>
      </div>
    </div>
  );
};

export default LPCard;