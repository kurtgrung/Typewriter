<template>
  <Typewriter 
    :messages="messages" 
    :pause="10" 
    :typingSpeed="50" 
    :cursorDelay="200" 
    cursorSymbol="|"
    :wrapperStyle="{ background: '#000', color: 'white', fontSize: '1.5em' }"
    :cursorStyle="{ color: '#0f0', fontWeight: 'bold' }" 
  />
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