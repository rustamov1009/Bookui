import Button from "../components/ui/Button";
import Ulugbek from "../assets/ulugbek.svg";
import Input from "../components/ui/Input";

const AddBook = () => {
  return (
    <div className="flex gap-6 h-screen">
      <div className="flex flex-col items-center w-[50%] bg-[#F3F3F3ED] pt-15.75">
        <img className="" src={Ulugbek} alt="" />
        <p className="font-black text-[24px] pt-3.25">Ulugbek hazinasi</p>
        <Button
          children={"Upload cover"}
          className={"mt-4.25 text-white w-82"}
        />
      </div>
      <div className="w-[50%]">
        <div className="flex flex-col pl-27 pt-7.75 w-full gap-4.25">
          <p className="font-black text-[36px] ">Add book</p>
          <Input placeholder={"Title"} type={"text"} className={" w-82.5"} />
          <Input placeholder={"Pages"} type={"text"} className={" w-82.5"} />
          <Input placeholder={"Year"} type={"text"} className={" w-82.5"} />
          <Input placeholder={"Price"} type={"text"} className={" w-82.5"} />
          <Input placeholder={"Country"} type={"text"} className={" w-82.5"} />
          <Input placeholder={"Author"} type={"text"} className={" w-82.5 "} />
          <textarea
            placeholder="Description"
            className="w-82.5 h-20.5 rounded-[10px] border border-[#B4B4BB] p-[16px_29px] resize-none outline-none"
          />
          <Button children={"Create"} className={"text-white w-82"} />
        </div>
      </div>
    </div>
  );
};

export default AddBook;
