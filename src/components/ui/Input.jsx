const Input = ({ placeholder, name, type, className = "", form, ...props }) => {
  const registerProps =
    form && name ? form.register(name) : {};

  return (
    <input
      {...registerProps}
      type={type}
      placeholder={placeholder}
      className={`p-[16px_0px_9px_29px] rounded-[10px] border border-[#B4B4BB] ${className}`}
      {...props}
    />
  );
};

export default Input;
