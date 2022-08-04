import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [btns, setBtns] = useState([]);
  const [disp, setDisp] = useState(0);

  useEffect(() => {
    fetch("./BtnData.json")
      .then((response) => response.json())
      .then((res) => {
        setBtns([...res])
      });
  }, []);

  const onClick = (e) => {
    switch (e.target.value) {
      case 'AC':
        setDisp(0);
        break;
      case '.':
        if(!disp.includes('.'))
          setDisp(disp + e.target.value);
        break;
      default:
        if (parseFloat(disp) === 0)
          setDisp(e.target.value);
        else if(e.target.type === 'operation' && disp[disp.length -1])
      	  setDisp(disp.slice(0,disp.length - 2)+e.target.value)
        else
          setDisp(disp + e.target.value);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src='./icons8-math-64.png' width={64} height={64} alt='calculator icon' />
        <p className='title'>Calculator</p>
      </header>

      <div className='board'>
        <div id='display'>
          <p>{disp}</p>
        </div>

        <div className='keypad'>
          {btns.map((btn, idx) => (
            <button
              key={idx}
              id={btn.id}
              onClick={onClick}
              value={btn.value}
              type={btn.type}
              className={btn.type}
            >
              {btn.value}
            </button>
          ))}
        </div>

      </div>

      <footer className="App-footer">
        <p>Icons from&nbsp;</p>
        <a href='https://icons8.com' className='icon-ref'>icons8</a>
      </footer>
    </div>
  );
}

export default App;
