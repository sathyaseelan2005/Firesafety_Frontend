import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
}

const SplitText: React.FC<SplitTextProps> = ({
    text = '',
    className = '',
    delay = 50,
    textAlign = 'left'
}) => {
    const letters = text.split("");
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const containerStyle = {
        textAlign: textAlign
    };

    return (
        <p
            ref={ref}
            className={`${className} inline-block`}
            style={containerStyle}
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        delay: index * (delay / 1000),
                        type: "spring",
                        damping: 15,
                        stiffness: 400
                    }}
                    className="inline-block min-w-[0.2em]"
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </p>
    );
};

export default SplitText;
