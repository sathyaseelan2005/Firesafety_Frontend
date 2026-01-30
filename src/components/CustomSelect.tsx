import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
    className?: string;
    icon?: React.ReactNode;
}

export const CustomSelect = ({ value, onChange, options, placeholder = 'Select...', className = '', icon }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <button
                type="button"
                className={`w-full flex items-center justify-between py-3 bg-theme-bg border border-theme-surface-hover rounded-lg text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-accent transition-all text-left appearance-none ${icon ? 'pl-10 pr-4' : 'pl-4 pr-4'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {icon && (
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        {icon}
                    </span>
                )}
                <span className={`block truncate ${!selectedOption ? 'text-theme-text-muted' : ''}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className={`w-5 h-5 text-theme-text-muted transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-theme-bg border border-theme-surface-hover rounded-lg shadow-xl max-h-60 overflow-auto py-1">
                    {options.map((option) => {
                        const isSelected = option.value === value;
                        return (
                            <div
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={`
                                    relative cursor-pointer select-none py-2.5 pl-4 pr-9 
                                    transition-colors duration-150
                                    ${isSelected ? 'bg-theme-accent text-white font-medium' : 'text-theme-text hover:bg-theme-accent/10 hover:text-theme-text'}
                                `}
                            >
                                <span className="block truncate">
                                    {option.label}
                                </span>
                                {isSelected && (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-white">
                                        <Check className="h-5 w-5" />
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
