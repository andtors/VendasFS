import { formatReal } from "@/app/api/util/money";
import { ChangeEvent } from "react";

interface InputProps {
    onChange?: (value: string) => void;
    label: string;
    columnClasses?: string;
    ForAndId: string;
    value: string | undefined;
    placeholder?: string;
    disabled?: boolean;
    currency?: boolean;
    maxChar?: number;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ onChange, label, columnClasses, ForAndId, value, placeholder, disabled, currency, maxChar, error  }: InputProps) => {
    
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value

            if(value && currency){
                value = formatReal(value)
            }

            if (onChange) {
                onChange(value)
            }
    }
    
    return (
        <div className={`field column ${columnClasses}`}>
            <label className='label' htmlFor={`input${ForAndId}`}>{label}</label>
            <div className="control"></div>
                <input className='input'
                    id={`input${ForAndId}`}
                    value={value}
                    onChange={onInputChange}
                    placeholder={placeholder}
                    disabled = {disabled}
                    maxLength={maxChar}
                     />
                     {error &&
                        <p className="help is-danger">{error}</p>   
                    }
            </div>
    )
}