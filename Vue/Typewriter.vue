<!-- Typewriter by Kurt Grüng. -->

<template>
  <div id="typewriter" class="typewriter" ref="typewriterRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, type CSSProperties } from 'vue';

interface TypewriterProps {
  messages: string[];
  pause: number;
  typingSpeed: number;
  cursorDelay: number;
  cursorSymbol: string;
  wrapperStyle?: CSSProperties;
  textStyle?: CSSProperties;
  cursorStyle?: CSSProperties;
}

const props = defineProps<TypewriterProps>();

const typewriterRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (!props.messages?.length || !typewriterRef.value) return;

  const typewriterDiv = typewriterRef.value;

  const textDiv = document.createElement('div');
  textDiv.setAttribute('id', 'text');
  typewriterDiv.appendChild(textDiv);

  const cursorDiv = document.createElement('div');
  cursorDiv.setAttribute('id', 'cursor');
  typewriterDiv.appendChild(cursorDiv);

  const defaultWrapperStyle: CSSProperties = {
    fontSize: '2em',
    fontFamily: 'arial',
    background: 'black',
    color: 'white',
    borderRadius: '5px',
    width: 'fit-content',
    padding: '5px 20px 5px 20px',
    lineHeight: '1.4em',
    height: '40px',
  };

  const defaultTextStyle: CSSProperties = {
    display: 'inline-block',
  };

  const defaultCursorStyle: CSSProperties = {
    marginLeft: '7px',
    display: 'inline-block',
    color: '#fff',
  };

  Object.assign(typewriterDiv.style, { ...defaultWrapperStyle, ...props.wrapperStyle });
  Object.assign(textDiv.style, { ...defaultTextStyle, ...props.textStyle });
  Object.assign(cursorDiv.style, { ...defaultCursorStyle, ...props.cursorStyle });

  const typingConfig = {
    count: 0,
    current: 0,
    typing: { speed: props.typingSpeed },
    cursor: {
      delay: props.cursorDelay,
      symbol: props.cursorSymbol || '|',
      active: props.cursorSymbol || '|',
    },
  };

  const cursorAnimation = setInterval(() => {
    typingConfig.cursor.active =
      typingConfig.cursor.active === typingConfig.cursor.symbol ? '' : typingConfig.cursor.symbol;
    cursorDiv.innerHTML = typingConfig.cursor.active;
  }, typingConfig.cursor.delay);

  const typing = () => {
    const message = props.messages[typingConfig.current];
    if (typingConfig.count < message.length) {
      textDiv.innerHTML += message.charAt(typingConfig.count);
      typingConfig.count++;
      setTimeout(typing, typingConfig.typing.speed);
    } else {
      setTimeout(() => {
        typingConfig.count = 0;
        backspace();
      }, props.pause * 100);
    }
  };

  const backspace = () => {
    const message = props.messages[typingConfig.current];
    if (typingConfig.count < message.length) {
      textDiv.innerHTML =
        typingConfig.count === 0 ? message : message.slice(0, -typingConfig.count);
      typingConfig.count++;
      if (props.messages.length !== 1) {
        setTimeout(backspace, typingConfig.typing.speed / 10);
      }
    } else {
      textDiv.innerHTML = '';
      typingConfig.current =
        typingConfig.current >= props.messages.length - 1 ? 0 : typingConfig.current + 1;
      setTimeout(() => {
        typingConfig.count = 0;
        typing();
      }, props.pause * 100);
    }
  };

  typing();
});
</script>

<style scoped></style>
