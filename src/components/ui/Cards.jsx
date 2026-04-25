import Kitobcha from "../../assets/kitob.svg";
import Naushnik from "../../assets/naushnik.svg";
const Cards = ({ img, name, year, soni, daqiqa }) => {
  return (
    <div className="flex mt-10 bg-[#212121] rounded-[15px] h-fit pb-6">
      <div className="w-41.25">
        <img src={img} alt="" />
        <div className="flex flex-col items-center w-full text-center leading-snug">
          <p className="text-[#C9AC8C] font-normal text-[20px]">{name}</p>
          <p className="text-[12px] font-normal text-white/60">{year}</p>
          <div className="flex mt-2.5 gap-8.5">
            <div className="flex gap-1.75">
              <img src={Kitobcha} alt="" />
              <span className="font-normal text-[16px] text-white">{soni}</span>
            </div>
            <div className="flex gap-1.75">
              <img src={Naushnik} alt="" />
              <span className="font-normal tetx-[16px] text-white">
                {daqiqa}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
