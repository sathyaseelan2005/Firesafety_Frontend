import { motion } from 'motion/react';

interface MarqueeProps {
    items: any[];
    speed?: number;
    className?: string;
    renderItem: (item: any) => React.ReactNode;
}

const Marquee = ({ items, speed = 30, className = "", renderItem }: MarqueeProps) => {
    return (
        <div className={`flex items-center overflow-hidden ${className}`}>
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                className="flex flex-shrink-0"
            >
                {items.map((item, index) => (
                    <div key={index} className="flex-shrink-0 mx-4">
                        {renderItem(item)}
                    </div>
                ))}
                {items.map((item, index) => (
                    <div key={`dup-${index}`} className="flex-shrink-0 mx-4">
                        {renderItem(item)}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
