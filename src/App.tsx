import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Slider from 'react-input-slider';
import cpu from './assets/monitor.png';
import player from './assets/player.png';
import { useNavigate } from 'react-router-dom';

function App() {
  const [state, setState] = useState({ x: 10, b1Color: 'gray', b2Color: 'gray'});
  const navigate = useNavigate();
  return (
    <div className="App">
        <h1>
			Cover Tic Tac Toe
        </h1>
      <header className="App-header">					
	<div>
		Choose range of pieces
		  ({state.x})
	</div>
	<div>
      <Slider
        axis="x"
        x={state.x}
		xmax={9}
        onChange={({ x }) => setState(state => ({ ...state, x }))}
		styles={{
			track: {
			  backgroundColor: 'grey',
			  width: 500
			},
			active: {
			  backgroundColor: 'blue'
			},
			thumb: {
			  width: 20,
			  height: 20
			},
			disabled: {
			  opacity: 0.5
			}
	  }}
      />
    </div>
	<div >
		<div style={{display: 'inline-block', margin: 20}}>
			<button style={{backgroundColor: state.b1Color}} onClick={() => {
				setState(state => ({...state, b1Color: 'darkkhaki', b2Color: 'gray'}))
			}}>
			<img src={cpu}/>
			<div>
				Against AI
			</div>
			</button>
		</div>
		<div style={{display: 'inline-block'}}>
			<button style={{backgroundColor: state.b2Color}} onClick={() => {
				setState(state => ({...state, b1Color: 'gray', b2Color: 'darkkhaki'}))
			}}>
			<img src={player}/>
			<div>
				Against Player
			</div>
			</button>
		</div>
	</div>
		<button onClick={() => navigate("/game")}>
			Play
		</button>
      </header>
    </div>
  );
}

export default App;
