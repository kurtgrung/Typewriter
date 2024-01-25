<template>
    <div id="typewriter" class="typewriter" ref="typewriterRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface TypewriterStyle {
    [key: string]: string | undefined;
    fontSize?: string;
    fontFamily?: string;
    background?: string;
    color?: string;
    borderRadius?: string;
    width?: string;
    padding?: string;
    paddingLeft?: string;
    paddingRight?: string;
    lineHeight?: string;
    height?: string;
    display?: string;
    marginLeft?: string;
}

interface TypewriterProps {
    messages: string[];
    pause: number;
    typingSpeed: number;
    cursorDelay: number;
    cursorSymbol: string;
}

const props = defineProps({
    messages: Array,
    pause: Number,
    typingSpeed: Number,
    cursorDelay: Number,
    cursorSymbol: String,
});

const typewriterRef = ref<HTMLDivElement | null>(null);

onMounted(() => {

    if (!props.messages) return;

    const messages = props.messages as string[];
    const pause = props.pause as number;
    const typingSpeed = props.typingSpeed as number;
    const cursorDelay = props.cursorDelay as number;
    const cursorSymbol = props.cursorSymbol as string;

    Typewriter({
        messages,
        pause,
        typingSpeed,
        cursorDelay,
        cursorSymbol
    });
});

const Typewriter = (props: TypewriterProps) => {

    const typewriterDiv = typewriterRef.value as HTMLElement;
    if (!typewriterDiv) return;

    const textDiv = document.createElement('div');
    textDiv.setAttribute('id', 'text');
    typewriterDiv.appendChild(textDiv);

    const cursorDiv = document.createElement('div');
    cursorDiv.setAttribute('id', 'cursor');
    typewriterDiv.appendChild(cursorDiv);

    const typewriterStyle: TypewriterStyle = {
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

    const textStyle: TypewriterStyle = {
        display: 'inline-block',
    };

    const cursorStyle: TypewriterStyle = {
        marginLeft: '7px',
        display: 'inline-block',
    };

    if (typewriterDiv) {
        Object.assign(typewriterDiv.style, typewriterStyle);
    }

    if (textDiv) {
        Object.assign(textDiv.style, textStyle);
    }

    if (cursorDiv) {
        Object.assign(cursorDiv.style, cursorStyle);
    }

    const typingConfig = {
        count: 0,
        current: 0,
        typing: {
            speed: props.typingSpeed,
        },
        cursor: {
            delay: props.cursorDelay,
            symbol: props.cursorSymbol,
            active: props.cursorSymbol,
        },
    };

    const cursorAnimation = setInterval(() => {
        if (typingConfig.cursor.active === typingConfig.cursor.symbol) {
            typingConfig.cursor.active = '';
        } else {
            typingConfig.cursor.active = typingConfig.cursor.symbol;
        }
        cursorDiv.innerHTML = typingConfig.cursor.active;
    }, typingConfig.cursor.delay);

    const typing = () => {
        const message = props.messages[typingConfig.current] as string;
        if (typingConfig.count < message.length) {
            const m = message.charAt(typingConfig.count);
            textDiv.innerHTML += m;
            typingConfig.count++;
            setTimeout(typing, typingConfig.typing.speed);
        } else {
            const waitInterval = setInterval(() => {
                clearInterval(waitInterval);
                typingConfig.count = 0;
                backspace();
            }, props.pause * 100);
        }
    };

    const backspace = () => {
        const message = props.messages[typingConfig.current] as string;
        if (typingConfig.count <= message.length) {
            let m = '';
            if (typingConfig.count === 0) {
                m = message;
            } else {
                m = message.slice(0, -typingConfig.count);
            }
            textDiv.innerHTML = m;
            typingConfig.count++;
            if (props.messages.length !== 1) {
                setTimeout(backspace, typingConfig.typing.speed / 10);
            }
        } else {
            textDiv.innerHTML = '';
            if (props.messages.length) {
                if (props.messages.length - 1 === typingConfig.current || typingConfig.current > props.messages.length - 1) {
                    typingConfig.current = 0;
                } else {
                    typingConfig.current++;
                }
            }
            const waitInterval = setInterval(() => {
                clearInterval(waitInterval);
                typingConfig.count = 0;
                typing();
            }, props.pause * 100);
        }
    };

    cursorAnimation;
    typing();
};

</script>
  
<style scoped></style>
  