import { useEffect } from "react";
import AuthIcon from "../assets/Auth-icon.svg";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/api/useRegister";
import { useNavigate } from "react-router-dom";
const SingUp = () => {
  const form = useForm();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, mutateAsync, error } = useRegister();
  useEffect(() => {
    document.body.style.background = "none";
  }, []);
  const onSubmit = (values) => {
    mutateAsync(values);
  };
  useEffect(() => {
    if (isSuccess) {
      form.reset();
      toast.success("success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (error) {
      toast.error(error?.response?.data?.message);
    }
  }, [error]);
  return (
    <div className="flex h-screen">
      <div className="w-[50%] bg-[#C9AC8CED]">
        <div className="flex h-full justify-center">
          <img width={500} height={500} src={AuthIcon} alt="" />
        </div>
      </div>
      <div className="w-[50%] p-[75px_134px] ">
        <div className="w-82.5">
          <h1 className="font-black text-4xl pb-4">Sing up</h1>
          <span className="font-roboto font-normal">
            Already have an account?{" "}
            <Link className="text-blue-400" to={"/sing-in"}>
              Sign in
            </Link>
          </span>
          <form
            onSubmit={form.handleSubmit(onSumbit)}
            className="flex flex-col gap-4 pt-6.25"
          >
            <Input name={"firstname"} form={form} placeholder={"First name"} />
            <Input name={"lastname"} form={form} placeholder={"Last name"} />
            <Input name={"phone_number"} form={form} placeholder={"Phone"} />
            <Input name={"email"} form={form} placeholder={"Email"} />
            <Input name={"password"} form={form} placeholder={"Password"} />

            <Button
              type={"sumbit"}
              children={"Next step"}
              className={"w-83 mt-8 text-white"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
