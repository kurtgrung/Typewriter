// Typewriter by Kurt Grüng.

import React, { useEffect, useRef } from 'react';

interface TypewriterProps {
    messages: string[];
    pause: number;
    typingSpeed: number;
    cursorDelay: number;
    cursorSymbol: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
    messages,
    pause,
    typingSpeed,
    cursorDelay,
    cursorSymbol,
}) => {
    const typewriterRef = useRef<HTMLDivElement>(null);
    const hasMounted = useRef(false);

    useEffect(() => {
        const typewriterDiv = typewriterRef.current;

        if (!typewriterDiv || hasMounted.current) return;

        const textDiv = document.createElement('div');
        textDiv.setAttribute('id', 'text');
        typewriterDiv.appendChild(textDiv);

        const cursorDiv = document.createElement('div');
        cursorDiv.setAttribute('id', 'cursor');
        typewriterDiv.appendChild(cursorDiv);

        const typewriterStyle = {
            fontSize: '2em',
            fontFamily: 'arial',
            background: 'black',
            color: 'white',
            borderRadius: '5px',
            width: 'fit-content',
            padding: '5px',
            paddingLeft: '15px',
            paddingRight: '20px',
            lineHeight: '1.4em',
            height: '50px',
        };

        const textStyle = {
            display: 'inline-block',
        };

        const cursorStyle = {
            marginLeft: '7px',
            display: 'inline-block',
        };

        for (let style in typewriterStyle) {
            typewriterDiv.style[style] = typewriterStyle[style];
        }

        for (let style in textStyle) {
            textDiv.style[style] = textStyle[style];
        }

        for (let style in cursorStyle) {
            cursorDiv.style[style] = cursorStyle[style];
        }

        const typingConfig = {
            count: 0,
            current: 0,
            typing: {
                speed: typingSpeed,
            },
            cursor: {
                delay: cursorDelay,
                symbol: cursorSymbol,
            },
        };

        const cursorAnimation = setInterval(() => {
            if (typingConfig.cursor.symbol === '|') {
                typingConfig.cursor.symbol = '';
            } else {
                typingConfig.cursor.symbol = '|';
            }
            cursorDiv.innerHTML = typingConfig.cursor.symbol;
        }, typingConfig.cursor.delay);

        const typing = () => {
            const message = messages[typingConfig.current];
            if (typingConfig.count < message.length) {
                const m = message.charAt(typingConfig.count);
                textDiv.innerHTML += m;
                typingConfig.count++;
                setTimeout(() => typing(), typingConfig.typing.speed);
            } else {
                const waitInterval = setInterval(() => {
                    clearInterval(waitInterval);
                    typingConfig.count = 0;
                    backspace();
                }, pause * 100);
            }
        }

        const backspace = () => {
            const message = messages[typingConfig.current];
            if (typingConfig.count < message.length) {
                let m = '';
                if (typingConfig.count === 0) {
                    m = message;
                } else {
                    m = message.slice(0, -typingConfig.count);
                }
                textDiv.innerHTML = m;
                typingConfig.count++;
                if (messages.length !== 1) {
                    setTimeout(() => backspace(), typingConfig.typing.speed / 10);
                }
            } else {
                textDiv.innerHTML = '';
                if (messages.length) {
                    if (messages.length - 1 === typingConfig.current || typingConfig.current > messages.length - 1) {
                        typingConfig.current = 0;
                    } else {
                        typingConfig.current++;
                    }
                }
                const waitInterval = setInterval(() => {
                    clearInterval(waitInterval);
                    typingConfig.count = 0;
                    typing();
                }, pause * 100);
            }
        };

        typing();

        hasMounted.current = true;

    }, [messages, pause, typingSpeed, cursorDelay, cursorSymbol]);

    return <div id="typewriter" ref={typewriterRef}></div>;
};

export default Typewriter;
