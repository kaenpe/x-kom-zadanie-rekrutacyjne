import React, { useContext, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { ChoiceContext } from "../context/ChoiceContext";
import { SlotsContext } from "../context/SlotsContext";

const Container = styled.main`
	display: grid;
	grid-template-rows: repeat(10, 8vh);
	grid-template-columns: repeat(15, 4vw);
	place-items: center;
	padding-top: 2px;
	grid-gap: 5px;
`;
const Square = styled.div`
	height: 100%;
	width: 100%;
	border: 1px solid black;
	grid-column: ${({ y }) => y + 1};
	grid-row: ${({ x }) => x + 1};
	background-color: ${({ reserved, x, y, choice }) => {
		const isTaken = () => {
			return choice.find((el) => el.cords.y === y && el.cords.x === x)
				? true
				: false;
		};
		return reserved ? "#474747" : isTaken() ? "orange" : "inherit";
	}};
	&:hover {
		background-color: ${({ reserved }) => (reserved ? "#474747" : "#f2f2f2")};
		cursor: ${({ reserved }) => (reserved ? "default" : "pointer")};
	}
`;

const Miejsca = ({ seats }) => {
	//hooks
	const { slots, nextTo } = useContext(SlotsContext);
	const { choice, setChoice } = useContext(ChoiceContext);
	useEffect(() => {
		const filteredReservedNoNextTo = seats
			.filter((el) => el.reserved === false)
			.filter((el, id) => id < slots);
		const filteredReservedNextTo = seats
			.map((el, id) => {
				if (seats[id + slots - 1])
					return seats[id + slots - 1].cords.y === el.cords.y + slots - 1
						? el
						: false;
				else return null;
			})
			.filter((el) => el !== false && el !== null)
			.filter((el, id) => id < 1);
		nextTo
			? setChoice(
					seats.filter(
						(el) =>
							el.cords.x === filteredReservedNextTo[0].cords.x &&
							el.cords.y >= filteredReservedNextTo[0].cords.y &&
							el.cords.y <= filteredReservedNextTo[0].cords.y + slots - 1
					)
			  )
			: setChoice(filteredReservedNoNextTo);
	}, []);
	//

	//functions
	const addChoiceCords = (x, y) => {
		setChoice((prevState) => [...prevState, { cords: { x: x, y: y } }]);
		console.log(choice);
	};

	const removeChoiceCords = (x, y) => {
		setChoice((prevState) =>
			prevState.filter((el) => el.cords.x !== x && el.cords.y !== y)
		);
	};

	//
	return (
		<Container>
			{seats.map((el) => {
				return (
					<Square
						key={el.id}
						id={el.id}
						onClick={() =>
							el.reserved
								? null
								: choice.find(
										(ele) =>
											ele.cords.x === el.cords.x && ele.cords.y === el.cords.y
								  )
								? removeChoiceCords(el.cords.x, el.cords.y)
								: addChoiceCords(el.cords.x, el.cords.y)
						}
						x={el.cords.x}
						y={el.cords.y}
						choice={choice}
						reserved={el.reserved}
					></Square>
				);
			})}
		</Container>
	);
};

export default Miejsca;
