import { useEffect } from "react";
import AuthIcon from "../assets/Auth-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/api/useRegister";
import Loader from "../components/ui/Loader";
import { toast } from "react-toastify";

const SingUp = () => {
  const form = useForm();
  const navigate = useNavigate();
  const { isLoading, mutateAsync, error } = useRegister();

  useEffect(() => {
    document.body.style.background = "none";
  }, []);

  const onSubmit = async (values) => {
    try {
      await mutateAsync(values);
      form.reset();
      toast.success("success");
      navigate("/", { replace: true });
    } catch (submitError) {
      return submitError;
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(
        error?.response?.data?.message || "Ro'yxatdan o'tishda xatolik",
      );
    }
  }, [error]);
  return (
    <div className="flex h-screen">
      <div className="w-[50%] bg-[#C9AC8CED]">
        <div className="flex h-full justify-center">
          <img width={500} height={500} src={AuthIcon} alt="" />
        </div>
      </div>
      <div className="w-[50%] p-[75px_134px]">
        <div className="w-[330px]">
          <h1 className="font-black text-4xl pb-4">Sing up</h1>
          <span className="font-normal">
            Already have an account?{" "}
            <Link className="text-blue-400" to={"/sing-in"}>
              Sign in
            </Link>
          </span>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 pt-[25px]"
          >
            <Input name={"firstname"} form={form} placeholder={"First name"} />
            <Input name={"lastname"} form={form} placeholder={"Last name"} />
            <Input name={"phone_number"} form={form} placeholder={"Phone"} />
            <Input name={"email"} form={form} placeholder={"Email"} />
            <Input
              name={"password"}
              type={"password"}
              form={form}
              placeholder={"Password"}
            />

            <Button
              type={"submit"}
              children={"Next step"}
              className={"w-[332px] mt-8 text-white"}
            >
              {isLoading ? <Loader /> : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
