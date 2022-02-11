import React, { useState } from 'react';
import dot from './assets/record.png';
import circle from './assets/circle.png';
import cross from './assets/x.png';
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
import { useDrag, useDrop } from 'react-dnd';

export function SymbolPool(props: { type: string }) {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: props.type,
		item: { name: props.type },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	}))
	return(
		<div
		ref={drag}
		style={{
			opacity: isDragging ? 0.5 : 1,
			fontSize: 25,
			fontWeight: 'bold',
			cursor: 'move',
		}}
		>
			<Symbol type={props.type}/>
		</div>
	)
}

type SymbolProp = { type: string };
export function Symbol(props: SymbolProp) {
	return(
		<>
			{props.type == "dot" ? <img src={dot} width="100px" height="100px"/> : null}
			{props.type == "circle" ? <img src={circle} width="100px" height="100px"/>: null}
			{props.type == "cross" ? <img src={cross} width="100px" height="100px"/>: null}
		</>
	);
}

type TileProp = { value: number, children?: any }
export function Tile(props: TileProp) {
	const [{ isOver }, drop] = useDrop(
	  () => ({
		accept: ["dot", "circle"],
		drop: (item: {name: string}) => {
			eventEmitter.dispatch(Events.SET_TILE, {symbol:item.name , pos: props.value});
		console.log(item);
		},
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
		}),
	  }),
	  [props.value]
	)
	return(
		<div className="tile-item"
		ref={drop}
		>
			{props.children}
			<div className="num">
				{props.value + 1}
			</div>
		</div>
	)
}

export enum Events {
	SET_TILE = 'set_tile'
}

export const eventEmitter = {
	_events: {} as {[key: string]: Function[]},
	dispatch(event: Events, data: any) {
		if (!(event in this._events)) return;
		this._events[event].forEach((callback: Function) => callback(data))
	},
	subscribe(event: Events, callback: (data: any) => any) {
		if (!this._events[event]) this._events[event] = [];
		this._events[event].push(callback);
	},
	unsubscribe(event: Events) {
		if (!this._events[event]) return;
		delete this._events[event];
	}
}

type PiecesProp = {[key:string]: number[]};
export function Board(props: { board_size:number, pieces: PiecesProp }) {
	const iter = Array.from(Array(props.board_size ** 2).keys())
	return(
		<div className="grid">
			{iter.map((num) => {
				var child = null
				if (props.pieces.cross.includes(num)) {
					child = <Symbol type="cross"/>
				} else if (props.pieces.circle.includes(num)) {
					child = <Symbol type="circle"/>
				} else if (props.pieces.dot.includes(num)) {
					child = <Symbol type="dot"/>
				}
				return <Tile key={num} value={num}>{child}</Tile>
			})}
		</div>	
	) 
}

type GameState = { board_size: Number, pieces: PiecesProp };
class Game extends React.Component<{}, GameState> {
	constructor(props: {string: any}) {
		super(props);
		this.state = {
			board_size: 3 as number,
			pieces: {dot: [], circle: [], cross: []} as PiecesProp
		}
		eventEmitter.subscribe(Events.SET_TILE, (data) => {console.log(data);this.updatePieces(data)})
	}


	updatePieces(data: {symbol: string, pos: number}) {
		var temp = this.state.pieces[data.symbol].concat(data.pos)
		var new_pieces = this.state.pieces
		new_pieces[data.symbol] = temp;
		this.setState({ pieces: new_pieces})
	}

	render() {
		return (
		<div className="Game">
			<h1>
				Cover Tic Tac Toe
			</h1>
			<header className="App-header">					
				<Board board_size={this.state.board_size as number} pieces={this.state.pieces}></Board>
			</header>
			<div>
				<div>3</div>
				<SymbolPool type="dot"/>
			</div>
		</div>
	  );
	}
}

export default Game;
