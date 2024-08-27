type Props = {}

interface InputProps {
    onChange?: (value: string) => void;
    label: string;
    columnClasses?: string;
    ForAndId: string;
    value: string | undefined;
    placeholder?: string;
    disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({ onChange, label, columnClasses, ForAndId, value, placeholder, disabled  }: InputProps) => {
    return (
        <div className={`field column ${columnClasses}`}>
            <label className='label' htmlFor={`input${ForAndId}`}>{label}</label>
            <div className="control"></div>
                <input className='input'
                    id={`input${ForAndId}`}
                    value={value}
                    onChange={e => {
                        if (onChange) {
                            onChange(e.target.value)
                        }
                    }}
                    placeholder={placeholder}
                    disabled = {disabled}
                     />
            </div>
    )
}