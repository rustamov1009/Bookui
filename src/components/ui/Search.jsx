import Input from "./Input";
import Button from "./Button";
import Lupa from "../../assets/Search.svg";
import Qidirish from "../../assets/Qidirish.svg";
const Search = () => {
  return (
    <div className="flex flex-col w-278.5 bg-[#191919] rounded-[15px] absolute left-1/2 top-[115%] -translate-x-1/2 -translate-y-1/2 shadow-[0_12px_32px_rgba(0,0,0,0.25)]">
      <div className="flex justify-center mt-9.75">
        <img src={Qidirish} alt="" />
      </div>
      <div className="flex m-auto mb-8.5 mt-3.25">
        <Input
          placeholder={"Adiblar, kitoblar, audiolar, maqolalar..."}
          type={"text"}
          className={
            " text-white placeholder:text-white/30 p-[9px_6px_19px_0px] rounded-[15px] border border-none w-177.25 bg-[#404040]"
          }
        />
        <Button
          className={
            "bg-[#C9AC8C] w-40 flex items-center ml-3.5 text-[#3C2710] hover:cursor-pointer"
          }
        >
          <div className="flex ml-3.5 gap-1.75">
            <img src={Lupa} alt="#" />
            Izlash
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Search;
