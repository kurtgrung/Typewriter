// Typewriter by Kurt Grüng.

class Typewriter {
    constructor(div, messages, config) {
        if (!div) return;

        const typewriterDiv = div;

        config.cursor.symbol = config.cursor.symbol || '|';
        config.cursor.active = config.cursor.symbol;

        const textDiv = document.createElement('div');
        textDiv.setAttribute('id', 'text');
        typewriterDiv.appendChild(textDiv);

        const cursorDiv = document.createElement('div');
        cursorDiv.setAttribute('id', 'cursor');
        typewriterDiv.appendChild(cursorDiv);

        const defaultTypewriterStyle = {
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

        const defaultTextStyle = {
            display: 'inline-block',
        };

        const defaultCursorStyle = {
            marginLeft: '7px',
            display: 'inline-block',
            color: config.cursor.color || 'white',
        };

        const typewriterStyle = { ...defaultTypewriterStyle, ...(config.style || {}) };

        for (let style in typewriterStyle) {
            typewriterDiv.style[style] = typewriterStyle[style];
        }

        for (let style in defaultTextStyle) {
            textDiv.style[style] = defaultTextStyle[style];
        }

        for (let style in defaultCursorStyle) {
            cursorDiv.style[style] = defaultCursorStyle[style];
        }

        this.messages = messages;
        this.config = config;
        this.cursor = cursorDiv;
        this.text = textDiv;
        this.cursorSymbol = config.cursor.symbol;

        this.cursorAnimation = setInterval(() => {
            this.config.cursor.active =
                this.config.cursor.active === this.config.cursor.symbol ? '' : this.config.cursor.symbol;
            this.cursor.innerHTML = this.config.cursor.active;
        }, this.config.cursor.delay);

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
            setTimeout(() => {
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
            this.config.current =
                this.config.current >= this.messages.length - 1 ? 0 : this.config.current + 1;
            setTimeout(() => {
                this.config.count = 0;
                this.typing();
            }, this.config.pause * 100);
        }
    }
}
