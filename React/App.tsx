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
        cursorDelay={400}
        cursorSymbol="|"
        style={{
          wrapper: {
            background: '#111',
            color: '#fff',
            borderRadius: '10px',
          },
          cursor: {
            color: '#0f0',
            fontWeight: 'bold',
          },
        }}
      />
    </div>
  );
};

export default App;
