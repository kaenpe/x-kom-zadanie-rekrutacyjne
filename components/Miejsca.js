import React, { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { SlotsContext } from "../context/SlotsContext";

const Container = styled.main`
	display: grid;
	grid-template-columns: repeat(15, 1fr);
	place-items: center;
	padding: 10px;
	grid-gap: 10px;
`;
const Square = styled.div`
	width: 3rem;
	height: 3rem;
	border: 1px solid black;
	grid-column: ${({ y }) => y + 1};
	grid-row: ${({ x }) => x + 1};
	background-color: ${({ reserved, choice, id }) => {
		const result = choice.filter((el) => {
			return el === id;
		});
		return reserved ? "#474747" : result.length > 0 ? "orange" : "inherit";
	}};
`;

const Miejsca = ({ seats }) => {
	const { slots, nextTo } = useContext(SlotsContext);
	const [choice, setChoice] = useState([]);
	return (
		<Container>
			{seats.map((el, id) => {
				return (
					<Square
						key={id}
						onClick={() => {
							if (choice.includes(id) || el.reserved)
								setChoice((prevState) => prevState.filter((el) => el !== id));
							else setChoice((prevState) => [...prevState, id]);
							console.log(choice);
						}}
						id={id}
						choice={choice}
						x={el.cords.x}
						y={el.cords.y}
						reserved={el.reserved}
					></Square>
				);
			})}
		</Container>
	);
};

export default Miejsca;
