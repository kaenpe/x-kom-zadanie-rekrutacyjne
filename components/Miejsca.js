import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ChoiceContext } from "../context/ChoiceContext";
import { SlotsContext } from "../context/SlotsContext";
import useDimension from "../hooks/useDimension";

const SeatsContainer = styled.main`
	display: grid;
	grid-template-rows: repeat(11, 7vh);
	grid-template-columns: ${({ height }) => `repeat(15, ${height}px)`};
	place-items: center;
	padding-top: 2px;
	grid-gap: 5px;
	.legend {
		width: 100%;
		height: 100%;
		margin-top: 4rem;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-column: 1/16;
		grid-row: 11;
		.square {
			width: ${({ height }) => `${height}px`};
			height: ${({ height }) => `${height}px`};
			background-color: ${({ type }) =>
				type === "free" ? "white" : type === "reserved" ? "#474747" : "orange"};
			border: 1px solid black;
		}
	}
`;

const Square = styled.div.attrs(({ height, x, y, reserved, choice }) => ({
	style: {
		width: `${height}px`,
		gridColumn: y + 1,
		gridRow: x + 1,
	},
}))`
	height: 100%;
	border: 1px solid black;
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
	const ref = useRef(null);
	const { height, setHeight } = useDimension(ref);
	const [floorHeight, setFloorHeight] = useState(0);
	useEffect(() => {
		setFloorHeight(Math.floor(height));
	}, [height]);
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
			.map((el, id) =>
				seats.filter(
					(elem) =>
						el.cords.x === elem.cords.x &&
						elem.cords.y <= el.cords.y + slots &&
						elem.cords.y >= el.cords.y &&
						elem.cords.y + slots >= el.cords.y
				)
			)
			.map((el) => el.filter((ele) => !ele.reserved))
			.filter((el) => el.length === slots)
			.filter((el, id) => id < 1);
		nextTo
			? setChoice(
					seats.filter(
						(el) =>
							el.cords.x === filteredReservedNextTo[0][0].cords.x &&
							el.cords.y >= filteredReservedNextTo[0][0].cords.y &&
							el.cords.y <= filteredReservedNextTo[0][0].cords.y + slots - 1
					)
			  )
			: setChoice(filteredReservedNoNextTo);
	}, []);
	//

	//functions
	const addChoiceCords = (x, y, id) => {
		setChoice((prevState) => [...prevState, { cords: { x: x, y: y }, id: id }]);
		console.log(choice);
	};

	const removeChoiceCords = (id) => {
		setChoice((prevState) => prevState.filter((el) => el.id !== id));
	};

	//
	return (
		<>
			{" "}
			<SeatsContainer height={floorHeight}>
				{seats.map((el) => {
					return (
						<Square
							height={floorHeight}
							key={el.id}
							id={el.id}
							ref={ref}
							onClick={() =>
								choice.find((ele) => ele.id === el.id)
									? removeChoiceCords(el.id)
									: addChoiceCords(el.cords.x, el.cords.y, el.id)
							}
							x={el.cords.x}
							y={el.cords.y}
							disabled={el.reserved}
							choice={choice}
							reserved={el.reserved}
						></Square>
					);
				})}
				<div className="legend">
					<div className="square" type="free">
						{floorHeight}
					</div>
					<div className="square" type="reserved"></div>
					<div className="square" type="choice"></div>
				</div>
			</SeatsContainer>
		</>
	);
};

export default Miejsca;
