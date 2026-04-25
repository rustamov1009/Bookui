import Author from "../assets/author.svg";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const AddAuthor = () => {
  return (
    <div className="flex gap-6 h-screen">
      <div className="flex flex-col items-center w-[50%] bg-[#F3F3F3ED] pt-31.5">
        <img className="" src={Author} alt="" />
        <p className="font-black text-[24px] pt-5.5">Ulugbek hazinasi</p>
        <Button children={"Upload image"} className={"text-white w-82 mt-9"} />
      </div>
      <div className="w-[50%]">
        <div className="flex flex-col pl-27 pt-7.75 w-full gap-4.25">
          <p className="font-black text-[36px] ">Add author</p>
          <Input
            placeholder={"First name"}
            type={"text"}
            className={" w-82.5 border border-[#B4B4BB]"}
          />
          <Input
            placeholder={"Last name"}
            type={"text"}
            className={" w-82.5 border border-[#B4B4BB]"}
          />
          <Input
            placeholder={"Date of birth"}
            type={"text"}
            className={" w-82.5 border border-[#B4B4BB]"}
          />
          <Input
            placeholder={"Date of death"}
            type={"text"}
            className={" w-82.5 border border-[#B4B4BB]"}
          />
          <Input placeholder={"Country"} type={"text"} className={" w-82.5 "} />
          <Input
            placeholder={"Bio"}
            type={"text"}
            className={" w-82.5 h-20.5 border border-[#B4B4BB]"}
          />
          <Button children={"Create"} className={"text-white w-82 mt-11.25"} />
        </div>
      </div>
    </div>
  );
};

export default AddAuthor;
