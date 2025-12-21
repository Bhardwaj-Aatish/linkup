interface ButtonProps {
    text: string;
    type?: "submit" | "button";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    buttonType?: "primary" | "secondary" | "tertiary";
    disabled?: boolean;
}

const Button = ({
    text,
    type = "button",
    onClick = () => { },
    className = "",
    buttonType = "primary",
    disabled = false,
}: ButtonProps) => {
    let variantClasses = "";

    if (buttonType === 'primary') {
        variantClasses += "bg-accent-primary text-bg-primary border-accent-primary hover:bg-cyan-400";
    }

    if (buttonType === 'secondary') {
        variantClasses += "bg-bg-primary text-accent-primary border-2 border-accent-primary hover:bg-accent-primary hover:text-bg-primary";
    }

    if (buttonType === 'tertiary') {
        variantClasses += "bg-transparent text-accent-primary border-transparent hover:text-cyan-400 hover:underline";
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${variantClasses} ${className} rounded-md cursor-pointer outline-none p-2 focus:ring-2 focus:ring-accent-primary`}
        >
            {text}
        </button>
    )

};


export default Button;
