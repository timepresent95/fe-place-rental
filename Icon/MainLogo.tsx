import { MapPin } from "lucide-react";

//TODO: Logo, Logo + service name 으로 파일 분리
//TODO: 배경, 텍스트 색상 변경이 가능하도록 props 받기
function MainLogo() {
  return (
    <div className="flex">
      <div className="w-7 rounded-full h-7 flex justify-center items-center border border-indigo-700 outline outline-white">
        <MapPin className="text-white" size={20} />
      </div>
      <span className="text-lg font-bold ml-2 text-white pb-1">
        place rental
      </span>
    </div>
  );
}

MainLogo.displayName = "MainLogo";

export default MainLogo;
