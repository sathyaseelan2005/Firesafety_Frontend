import { useEffect } from 'react';
import { gsap } from 'gsap';

interface BounceCardsProps<T> {
    className?: string;
    items?: T[];
    containerWidth?: number;
    containerHeight?: number;
    animationDelay?: number;
    animationStagger?: number;
    easeType?: string;
    transformStyles?: string[];
    enableHover?: boolean;
    renderItem?: (item: T, index: number) => React.ReactNode;
}

export default function BounceCards<T>({
    className = '',
    items = [],
    containerWidth = 400,
    containerHeight = 400,
    animationDelay = 0.5,
    animationStagger = 0.06,
    easeType = 'elastic.out(1, 0.8)',
    transformStyles = [
        'rotate(10deg) translate(-170px)',
        'rotate(5deg) translate(-85px)',
        'rotate(-3deg)',
        'rotate(-10deg) translate(85px)',
        'rotate(2deg) translate(170px)'
    ],
    enableHover = false,
    renderItem
}: BounceCardsProps<T>) {
    useEffect(() => {
        gsap.fromTo(
            '.bounce-card',
            { scale: 0 },
            {
                scale: 1,
                stagger: animationStagger,
                ease: easeType,
                delay: animationDelay
            }
        );
    }, [animationDelay, animationStagger, easeType]);

    const getNoRotationTransform = (transformStr: string): string => {
        const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
        if (hasRotate) {
            return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
        } else if (transformStr === 'none') {
            return 'rotate(0deg)';
        } else {
            return `${transformStr} rotate(0deg)`;
        }
    };

    const getPushedTransform = (baseTransform: string, offsetX: number): string => {
        const translateRegex = /translate\(([-0-9.]+)px\)/;
        const match = baseTransform.match(translateRegex);
        if (match) {
            const currentX = parseFloat(match[1]);
            const newX = currentX + offsetX;
            return baseTransform.replace(translateRegex, `translate(${newX}px)`);
        } else {
            return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
        }
    };

    const pushSiblings = (hoveredIdx: number) => {
        if (!enableHover) return;

        items.forEach((_, i) => {
            const selector = `.bounce-card-${i}`;
            gsap.killTweensOf(selector);

            const baseTransform = transformStyles[i] || 'none';

            if (i === hoveredIdx) {
                const noRotation = getNoRotationTransform(baseTransform);
                gsap.to(selector, {
                    transform: noRotation,
                    duration: 0.4,
                    ease: 'back.out(1.4)',
                    overwrite: 'auto',
                    zIndex: 10 // Bring to front
                });
            } else {
                const offsetX = i < hoveredIdx ? -160 : 160;
                const pushedTransform = getPushedTransform(baseTransform, offsetX);

                const distance = Math.abs(hoveredIdx - i);
                const delay = distance * 0.05;

                gsap.to(selector, {
                    transform: pushedTransform,
                    duration: 0.4,
                    ease: 'back.out(1.4)',
                    delay,
                    overwrite: 'auto',
                    zIndex: 1
                });
            }
        });
    };

    const resetSiblings = () => {
        if (!enableHover) return;

        items.forEach((_, i) => {
            const selector = `.bounce-card-${i}`;
            gsap.killTweensOf(selector);

            const baseTransform = transformStyles[i] || 'none';
            gsap.to(selector, {
                transform: baseTransform,
                duration: 0.4,
                ease: 'back.out(1.4)',
                overwrite: 'auto',
                zIndex: i + 1 // Restore natural stacking
            });
        });
    };

    return (
        <div
            className={`relative flex items-center justify-center mx-auto ${className}`}
            style={{
                width: containerWidth,
                height: containerHeight
            }}
        >
            {items.map((item, idx) => (
                <div
                    key={idx}
                    className={`bounce-card bounce-card-${idx} absolute w-full max-w-[280px] aspect-[4/5] border border-white/20 rounded-xl overflow-hidden shadow-2xl bg-gray-900 cursor-pointer transition-shadow hover:shadow-theme-accent/50`}
                    style={{
                        transform: transformStyles[idx] || 'none',
                        zIndex: idx + 1
                    }}
                    onMouseEnter={() => pushSiblings(idx)}
                    onMouseLeave={resetSiblings}
                >
                    {renderItem ? renderItem(item, idx) : null}
                </div>
            ))}
        </div>
    );
}
