import React, { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { ChoiceContext } from "../context/ChoiceContext";
import { SlotsContext } from "../context/SlotsContext";

const Container = styled.main`
	display: grid;
	grid-template-columns: repeat(15, 1fr);
	place-items: center;
	padding: 10px;
	grid-gap: 2px;
`;
const Square = styled.div`
	width: 3rem;
	height: 3rem;
	border: 1px solid black;
	grid-column: ${({ y }) => y + 1};
	grid-row: ${({ x }) => x + 1};
	background-color: ${({ reserved, id, choice }) => {
		const isTaken = () => {
			return choice.filter((el) => el.id === id).length > 0 ? true : false;
		};
		return reserved ? "#474747" : isTaken() ? "orange" : "inherit";
	}};
`;

const Miejsca = ({ seats }) => {
	//hooks
	const { slots, nextTo } = useContext(SlotsContext);
	const { choice, setChoice } = useContext(ChoiceContext);
	//

	//functions
	const addChoiceCords = (id) => {
		setChoice((prevState) => [...prevState, { x: x, y: y, id: id }]);
		console.log(choice);
	};

	const removeChoiceCords = (id) => {
		setChoice((prevState) => prevState.filter((el) => el.id !== id));
		console.log(choice);
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
							choice.filter((ele) => ele.id === el.id).length > 0
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
