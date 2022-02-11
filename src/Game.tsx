import React, { useState } from 'react';
import logo from './logo.svg';
import './Game.css';
import { Navigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function Tile(props: any) {
	return(
		<div>{props.value}</div>
	)
}

function Board(props: any) {
	const iter = Array.from(Array(props.board_size).keys())
	return(
		<Grid container spacing={2}>
			{iter.map((num) => {
				return <Tile value={num}/>
			})}
		</Grid>	
	) 
}

type GameState = { board_size: Number };
class Game extends React.Component<{}, GameState> {
	constructor(props: {string: any}) {
		super(props);
		this.state = {
			board_size: 3
		}
	}

	render() {
		return (
		<div className="Game">
			<h1>
				Cover Tic Tac Toe
			</h1>
			<header className="App-header">					
				<Board board_size={this.state.board_size}></Board>
			</header>
		</div>
	  );
	}
}

export default Game;
