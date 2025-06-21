// Typewriter by Kurt Grüng.

class Typewriter {
  constructor(messages, config) {
    const typewriterDiv = document.getElementById('typewriter');

    const textDiv = document.createElement('div');
    textDiv.setAttribute('id', 'text');
    typewriterDiv.appendChild(textDiv);

    const cursorDiv = document.createElement('div');
    cursorDiv.setAttribute('id', 'cursor');
    typewriterDiv.appendChild(cursorDiv);

    const defaultStyles = {
      wrapper: {
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
      },
      text: {
        display: 'inline-block',
      },
      cursor: {
        marginLeft: '7px',
        display: 'inline-block',
      },
    };

    const styleConfig = config.style || {};
    const mergedStyles = {
      wrapper: { ...defaultStyles.wrapper, ...(styleConfig.wrapper || {}) },
      text: { ...defaultStyles.text, ...(styleConfig.text || {}) },
      cursor: { ...defaultStyles.cursor, ...(styleConfig.cursor || {}) },
    };

    Object.assign(typewriterDiv.style, mergedStyles.wrapper);
    Object.assign(textDiv.style, mergedStyles.text);
    Object.assign(cursorDiv.style, mergedStyles.cursor);

    this.messages = messages;
    this.config = config;
    this.cursor = cursorDiv;
    this.text = textDiv;

    this.cursorSymbol = config.cursor.symbol || '|';

    this.cursorAnimation = setInterval(() => {
      this.config.cursor.symbol = this.config.cursor.symbol === '|' ? '' : '|';
      this.cursor.innerHTML = this.config.cursor.symbol;
    }, config.cursor.delay);

    this.typing();
  }

  typing() {
    const message = this.messages[this.config.current];

    if (this.config.count < message.length) {
      const m = message.charAt(this.config.count);
      this.text.innerHTML += m;
      this.config.count++;
      setTimeout(() => this.typing(), this.config.typing.speed);
    } else {
      const waitInterval = setInterval(() => {
        clearInterval(waitInterval);
        this.config.count = 0;
        this.backspace();
      }, this.config.pause * 100);
    }
  }

  backspace() {
    const message = this.messages[this.config.current];

    if (this.config.count < message.length) {
      let m = this.config.count === 0 ? message : message.slice(0, -this.config.count);
      this.text.innerHTML = m;
      this.config.count++;

      if (this.messages.length !== 1) {
        setTimeout(() => this.backspace(), this.config.typing.speed / 10);
      }
    } else {
      this.text.innerHTML = '';
      if (this.messages.length) {
        this.config.current =
          this.config.current >= this.messages.length - 1 ? 0 : this.config.current + 1;
      }

      const waitInterval = setInterval(() => {
        clearInterval(waitInterval);
        this.config.count = 0;
        this.typing();
      }, this.config.pause * 100);
    }
  }
}
