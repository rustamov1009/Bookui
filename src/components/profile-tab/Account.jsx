import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ProfileIcon from "../../assets/profile-icon.svg";
import { useGetProfile } from "../../hooks/api/useGetProfile";
import { useUpdateProfile } from "../../hooks/api/useUpdateProfile";
import { useUserStore } from "../../store/user,store";

const fieldClassName =
  "mt-2 h-[46px] w-full rounded-[6px] border border-[#E9EDF3] bg-[#F3F6FB] px-5 text-[18px] text-[#4B5563] outline-none";

const helperClassName = "mt-1 text-sm text-[#C4C9D4]";

const Account = () => {
  const [data, isLoading, isSuccess] = useGetProfile();
  const { mutateAsync, isPending, isSuccess: isUpdated, error } =
    useUpdateProfile();
  const { setUser } = useUserStore();
  const form = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      phone_number: "",
      email: "",
    },
  });

  useEffect(() => {
    const user = data?.data;

    if (isSuccess && user) {
      form.reset({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        phone_number: user.phone_number || "",
        email: user.email || "",
      });
      setUser(user);
    }
  }, [data, form, isSuccess, setUser]);

  useEffect(() => {
    if (isUpdated) {
      toast.success("Profil muvaffaqiyatli yangilandi");
    }
  }, [isUpdated]);

  useEffect(() => {
    if (error) {
      toast.error(
        error?.response?.data?.message || "Profilni saqlashda xatolik yuz berdi",
      );
    }
  }, [error]);

  const onSubmit = async (values) => {
    const response = await mutateAsync(values);
    setUser(response?.data);
  };

  if (isLoading) {
    return (
      <section className="mx-auto max-w-[1160px] px-6 py-14">
        <div className="rounded-[24px] bg-white p-10 text-[#6B7280] shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          Loading profile...
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1160px] px-6 py-12">
      <div className="rounded-[28px] bg-white px-8 py-10 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:gap-18">
          <div className="relative h-fit w-fit">
            <div className="h-[172px] w-[172px] overflow-hidden rounded-full bg-[#F1F5F9]">
              <img
                src={ProfileIcon}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-1 flex h-[48px] w-[48px] items-center justify-center rounded-[12px] border border-[#D7DCE4] bg-white text-[#667085] shadow-[0_8px_18px_rgba(15,23,42,0.15)]"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 4L7.2 6H4C2.9 6 2 6.9 2 8V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H16.8L15 4H9Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1">
            <h2 className="text-[38px] font-semibold tracking-[-0.03em] text-[#111827]">
              My profile
            </h2>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              <div>
                <label className="text-[17px] text-[#374151]">First Name</label>
                <input
                  {...form.register("firstname")}
                  className={fieldClassName}
                  placeholder="First name"
                />
                <p className={helperClassName}>
                  Please enter your first name.
                </p>
              </div>

              <div>
                <label className="text-[17px] text-[#374151]">Last Name</label>
                <input
                  {...form.register("lastname")}
                  className={fieldClassName}
                  placeholder="Last name"
                />
                <p className={helperClassName}>
                  Please enter your last name.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-[17px] text-[#374151]">Phone</label>
                  <input
                    {...form.register("phone_number")}
                    className={fieldClassName}
                    placeholder="+998 90 123 45 67"
                  />
                  <p className={helperClassName}>
                    Please enter your phone number.
                  </p>
                </div>

                <div>
                  <label className="text-[17px] text-[#374151]">Email</label>
                  <input
                    {...form.register("email")}
                    className={fieldClassName}
                    placeholder="Email address"
                  />
                  <p className={helperClassName}>
                    Please enter your email address.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#EEF2F7] pt-10">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-[8px] bg-[#16213E] px-8 py-4 text-[17px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isPending ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
