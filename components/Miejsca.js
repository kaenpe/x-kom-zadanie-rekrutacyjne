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
	background-color: ${({ reserved, id, choice }) => {
		const isTaken = () => {
			return choice.filter((el) => el.id === id).length > 0 ? true : false;
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
		const filteredReserved = seats
			.filter((el) => el.reserved === false)
			.filter((el, id) => id < slots);

		nextTo ? null : setChoice(filteredReserved);
	}, []);
	//

	//functions
	const addChoiceCords = (x, y, id) => {
		setChoice((prevState) => [...prevState, { x: x, y: y, id: id }]);
	};

	const removeChoiceCords = (id) => {
		setChoice((prevState) => prevState.filter((el) => el.id !== id));
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
								: choice.filter((ele) => ele.id === el.id).length > 0
								? removeChoiceCords(el.id)
								: addChoiceCords(el.cords.x, el.cords.y, el.id)
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
