interface inputProps {
    type: string,
    id?: string,
    name?: string,
    placeholder?: string;
    autoComplete?: string;
    value?: any;
    classNames?: string,
    onChange?: (event: any) => any,
}

const Input = ({
     type, 
     id, 
     name, 
     placeholder = "Enter text", 
     autoComplete = "off", 
     value, 
     classNames, 
     onChange = () => {}
}: inputProps) => {
    
return (
        <input
            type={type}
            id={id} 
            name={name} 
            placeholder={placeholder} 
            autoComplete={autoComplete} 
            value={value} 
            onChange={onChange} 
            className={`${classNames} bg-bg-primary p-3 border-2 rounded-lg border-border outline-none focus:ring-2 focus:ring-accent-primary`} />
    )
}


export default Input;