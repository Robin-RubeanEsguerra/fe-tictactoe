type LabelProps = {
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "custom";
};

export const Label = ({ children, className = "", variant = "primary" }: LabelProps) => {
  const baseStyles = "text-center text-shadow-stroke ";

  const variantClasses = {
    primary: "text-ttt-orange  text-shadow-ttt-dark-orange",
    secondary: "text-ttt-pink  text-shadow-ttt-dark-pink",
    custom: "",
  };

  const finalClassName = `${baseStyles} ${variantClasses[variant]} ${className}`;

  return (
    <label className={finalClassName}>
      {children}
    </label>
  );
};
