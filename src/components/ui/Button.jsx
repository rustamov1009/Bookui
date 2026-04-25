const Botton = ({ children, type, className }) => {
  return (
    <button
      type={type}
      className={`bg-[#152540] font-medium text-[18px] hover:cursor-pointer rounded-[99px] p-4 ${className}`}
    >
      {children}
    </button>
  );
};

export default Botton;
