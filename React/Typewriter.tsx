import React, { useEffect, useRef, useState } from 'react';

interface TypewriterStyle {
  [key: string]: string | undefined;
}

interface StyleConfig {
  wrapper?: TypewriterStyle;
  text?: TypewriterStyle;
  cursor?: TypewriterStyle;
}

interface TypewriterProps {
  messages: string[];
  pause: number;
  typingSpeed: number;
  cursorDelay: number;
  cursorSymbol: string;
  style?: StyleConfig;
}

const Typewriter: React.FC<TypewriterProps> = ({
  messages,
  pause,
  typingSpeed,
  cursorDelay,
  cursorSymbol,
  style = {},
}) => {
  const [text, setText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  const state = useRef({
    currentMessageIndex: 0,
    charIndex: 0,
    isTyping: true,
    timeout: null as ReturnType<typeof setTimeout> | null,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, cursorDelay);

    return () => clearInterval(interval);
  }, [cursorDelay]);

  useEffect(() => {
    const localState = state.current;

    const step = () => {
      const currentMessage = messages[localState.currentMessageIndex];

      if (localState.isTyping) {
        if (localState.charIndex < currentMessage.length) {
          setText(currentMessage.slice(0, localState.charIndex + 1));
          localState.charIndex++;
          localState.timeout = setTimeout(step, typingSpeed);
        } else {
          localState.isTyping = false;
          localState.timeout = setTimeout(step, pause * 100);
        }
      } else {
        if (localState.charIndex > 0) {
          setText(currentMessage.slice(0, localState.charIndex - 1));
          localState.charIndex--;
          localState.timeout = setTimeout(step, typingSpeed / 4);
        } else {
          localState.isTyping = true;
          localState.currentMessageIndex =
            (localState.currentMessageIndex + 1) % messages.length;
          localState.timeout = setTimeout(step, pause * 100);
        }
      }
    };

    step();

    return () => {
      if (localState.timeout) clearTimeout(localState.timeout);
    };
  }, [messages, pause, typingSpeed]);

  const defaultStyles: StyleConfig = {
    wrapper: {
      fontSize: '2em',
      fontFamily: 'arial',
      background: 'black',
      color: 'white',
      borderRadius: '5px',
      width: 'fit-content',
      padding: '5px 20px 5px 15px',
      lineHeight: '1.4em',
    },
    text: {
      display: 'inline-block',
    },
    cursor: {
      display: 'inline-block',
      marginLeft: '7px',
    },
  };

  const mergedStyle = {
    wrapper: { ...defaultStyles.wrapper, ...style.wrapper },
    text: { ...defaultStyles.text, ...style.text },
    cursor: { ...defaultStyles.cursor, ...style.cursor },
  };

  return (
    <div style={mergedStyle.wrapper}>
      <div style={mergedStyle.text}>{text}</div>
      <div style={mergedStyle.cursor}>{cursorVisible ? cursorSymbol : ''}</div>
    </div>
  );
};

export default Typewriter;
