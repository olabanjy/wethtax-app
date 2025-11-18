import { LucideMoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3">
      <button className="cursor-pointer" onClick={() => navigate(-1)}>
        <LucideMoveLeft size={24} color="#748684" />
      </button>

      <p className="font-[500] text-xl leading-[30px] text-[#121212]">
        {title}
      </p>
    </div>
  );
};

export default BackButton;
