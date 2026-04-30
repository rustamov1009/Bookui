import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../assets/Frame.svg";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/api/useLogin";
import { toast } from "react-toastify";

const SingIn = () => {
  const form = useForm();
  const navigate = useNavigate();
  const { error, mutateAsync } = useLogin();

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
          <img width={500} height={500} src={Icon} alt="" />
        </div>
      </div>
      <div className="w-[50%] p-[75px_134px] flex items-center">
        <div className="w-[330px]">
          <h1 className="font-black text-4xl pb-4">Sing in</h1>
          <span className="font-normal">
            Don&apos;t have an account?{" "}
            <Link className="text-blue-400" to={"/sing-up"}>
              Sign up
            </Link>
          </span>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 pt-[25px]"
          >
            <Input
              name={"email"}
              form={form}
              placeholder={"Email"}
              type={"email"}
            />
            <Input
              name={"password"}
              form={form}
              placeholder={"Password"}
              type={"password"}
            />

            <Button type={"submit"} className={"w-[332px] mt-8 text-white"}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
