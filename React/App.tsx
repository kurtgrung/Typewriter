import Typewriter from './Typewriter';

const App = () => {

    const messages = [
        'Typewriter :)',
        'hello',
        'this is a message :)',
        '...and another message!',
    ];

    return (
        <div>
            <Typewriter
                messages={messages}
                pause={10}
                typingSpeed={50}
                cursorDelay={200}
                cursorSymbol="|"
            />
        </div>
    );
};

export default App;
