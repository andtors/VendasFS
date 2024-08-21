type Props = {}

interface InputProps {
    onChange?: (value: string) => void;
    label: string;
    columnClasses?: string;
    ForAndId: string;
    value: string;
}

export const Input: React.FC<InputProps> = ({ onChange, label, columnClasses, ForAndId, value }: InputProps) => {
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
                    placeholder='Digite o nome do produto' />
            </div>
    )
}