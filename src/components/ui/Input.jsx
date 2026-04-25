const Input = ({ placeholder, name, type, className = "", form }) => {
  return (
    <input
      {...(form?.register && name ? form.register(name) : {})}
      type={type}
      placeholder={placeholder}
      className={`p-[16px_0px_9px_29px] rounded-[10px] border border-[#B4B4BB] ${className}`}
    />
  );
};

export default Input;
