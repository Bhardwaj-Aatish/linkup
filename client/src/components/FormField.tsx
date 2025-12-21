import Input from './Input'

interface FormFieldProps {
    label: string;
    inputType: any;
    placeholder?: string;
    onChange?: any;
    inputValue?: string;
    inputAutocomplete?: string;

}
const FormField = ({label, inputType, placeholder, onChange, inputValue}: FormFieldProps) => {
    return(
        <div className="form-field flex flex-col text-base text-text-secondary">
            <label htmlFor={label} className="py-1"> {label}</label>
            <Input type={inputType} id={label} name={label} placeholder={placeholder} onChange={onChange} value= {inputValue} />
        </div>
    )
}

export default FormField;