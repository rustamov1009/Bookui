import { Link } from "react-router-dom";
import Icon from "../assets/Frame.svg";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const SingIn = () => {
  const form = useForm();
  const navigate = useNavigate();
  const { data, error, isSuccess, isLoading, mutateAsync } = useLogin();
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
      toast.error(error?.response.data.message);
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
        <div className="w-82.5">
          <h1 className="font-black text-4xl pb-4">Sing in</h1>
          <span className="font-roboto font-normal">
            Already have an account?{" "}
            <Link className="text-blue-400" to={"/sing-up"}>
              Sign up
            </Link>
          </span>
          <form action="" className="flex flex-col gap-4 pt-6.25">
            <Input placeholder={"Email"} />
            <Input placeholder={"Password"} />

            <Button children={"Next step"} className={"w-83 mt-8 text-white"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
