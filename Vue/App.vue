<template>
    <div>
        <Typewriter :messages="messages" :pause="10" :typingSpeed="50" :cursorDelay="200" cursorSymbol="|" />
    </div>
</template>

<script setup lang="ts">

import Typewriter from './Typewriter.vue';

const messages = [
    'Typewriter :)',
    'hello',
    'this is a message :)',
    '...and another message!',
];

</script>