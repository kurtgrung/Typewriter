// Typewriter by Kurt Grüng.

class Typewriter {

    constructor(div, messages, config) {

        if (!div) return;

        const typewriterDiv = div;

        config.cursor.symbol = config.cursor.symbol || "|";
        config.cursor.active = config.cursor.symbol;

        const textDiv = document.createElement('div');
        textDiv.setAttribute("id", "text");
        document.getElementById('typewriter').appendChild(textDiv);

        const cursorDiv = document.createElement('div');
        cursorDiv.setAttribute("id", "cursor");
        document.getElementById('typewriter').appendChild(cursorDiv);

        const typewriterStyle = {
            fontSize: "2em",
            fontFamily: "arial",
            background: "black",
            color: "white",
            borderRadius: "5px",
            width: "fit-content",
            padding: "5px",
            paddingLeft: "15px",
            paddingRight: "20px",
            lineHeight: "1.4em",
            height: "50px",
        }

        const textStyle = {
            display: "inline-block"
        }

        const cursorStyle = {
            marginLeft: "7px",
            display: "inline-block",
        }

        for (let style in typewriterStyle) {
            typewriterDiv.style[style] = typewriterStyle[style];
        }

        for (let style in textStyle) {
            textDiv.style[style] = textStyle[style];
        }

        for (let style in cursorStyle) {
            cursorDiv.style[style] = cursorStyle[style];
        }

        this.messages = messages;
        this.config = config;
        this.cursor = cursorDiv;
        this.text = textDiv;
        this.cursorSymbol = this.config.cursor.symbol ? this.config.cursor.symbol : "|";
        this.cursorAnimation = setInterval(() => {
            if (this.config.cursor.active === this.config.cursor.symbol) {
                this.config.cursor.active = '';
            } else {
                this.config.cursor.active = this.config.cursor.symbol;
            }
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
            let m = "";
            if (this.config.count === 0) {
                m = message;
            } else {
                m = message.slice(0, -this.config.count);
            }
            this.text.innerHTML = m;
            this.config.count++;
            if (this.messages.length !== 1) {
                setTimeout(() => this.backspace(), this.config.typing.speed / 10);
            }
        } else {
            this.text.innerHTML = "";
            if (this.messages.length) {
                if (this.messages.length - 1 === this.config.current || this.config.current > this.messages.length - 1) {
                    this.config.current = 0;
                } else {
                    this.config.current++;
                }
            }
            const waitInterval = setInterval(() => {
                clearInterval(waitInterval);
                this.config.count = 0;
                this.typing();
            }, this.config.pause * 100);
        }
    }
}