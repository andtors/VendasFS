import { formatReal } from "@/app/api/util/money";
import { ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    columnClasses?: string;
    error?: string;
    formatter?: (value: string) => string;
    currency?: boolean;
    
}

export const Input: React.FC<InputProps> = ({
    label,
    columnClasses,
    id,
    error,
    currency,
    ...inputProps
}: InputProps) => {

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value

        if(value && currency){
            value = formatReal(value)
        }
}

    return (
        <div className={`field column ${columnClasses}` }>
            <label className="label" htmlFor={id}>{label}</label>
            <div className="control">
                <input className="input" 
                    id={id} {...inputProps} />
                {error &&
                    <p className="help is-danger">{ error }</p>
                }
            </div>
        </div>
    )
}