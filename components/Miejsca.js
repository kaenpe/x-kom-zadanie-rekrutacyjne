import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ChoiceContext } from "../context/ChoiceContext";
import { SlotsContext } from "../context/SlotsContext";
import useDimension from "../hooks/useDimension";
import Link from "next/link";

const SeatsContainer = styled.main`
	display: grid;
	grid-template-rows: repeat(11, 7vh);
	grid-template-columns: ${({ height }) => `repeat(15, ${height}px)`};
	place-content: center;
	padding-top: 10px;
	grid-gap: 10px;
	.legend {
		width: 100%;
		height: 100%;
		margin-top: 4rem;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-column: 1/16;
		grid-row: 11;
		.reserve-button {
			background-color: white;
			border: 1px solid black;
			&:hover {
				cursor: pointer;
				transition: background-color 0.3s ease-in;
				background-color: #f2f2f2;
			}
		}
	}
	.bottom-panel-wrapper {
		display: flex;
		align-items: center;
		p {
			margin-left: 10px;
		}
	}
`;
const LegendSquare = styled.div`
	width: ${({ height }) => `${height}px`};
	height: ${({ height }) => `${height}px`};
	background-color: ${({ type }) =>
		type === "free" ? "white" : type === "reserved" ? "#474747" : "orange"};
	border: 1px solid black;
`;
const Square = styled.div`
	height: 100%;
	border: 1px solid black;
	background-color: ${({ reserved, x, y, choice }) => {
		const isTaken = () => {
			return choice.find((seat) => seat.cords.y === y && seat.cords.x === x)
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
	const { height } = useDimension(ref);
	const [floorHeight, setFloorHeight] = useState(0);
	useEffect(() => {
		setFloorHeight(Math.floor(height));
	}, [height]);
	useEffect(() => {
		const filteredReservedNoNextTo = seats
			.filter((seat) => seat.reserved === false)
			.filter((el, id) => id < slots);
		const filteredReservedNextTo = seats
			.map((seat, id) => {
				if (seats[id + slots - 1])
					return seats[id + slots - 1].cords.y === seat.cords.y + slots - 1
						? seat
						: false;
				else return null;
			})
			.filter((seat) => seat !== false && seat !== null)
			.map((seat, id) =>
				seats.filter(
					(el) =>
						seat.cords.x === el.cords.x &&
						el.cords.y <= seat.cords.y + slots &&
						el.cords.y >= seat.cords.y &&
						el.cords.y + slots >= seat.cords.y
				)
			)
			.map((seat) => seat.filter((ele) => !ele.reserved))
			.filter((seat) => seat.length === slots)
			.filter((el, id) => id < 1);
		nextTo
			? setChoice(
					seats.filter(
						(seat) =>
							seat.cords.x === filteredReservedNextTo[0][0].cords.x &&
							seat.cords.y >= filteredReservedNextTo[0][0].cords.y &&
							seat.cords.y <= filteredReservedNextTo[0][0].cords.y + slots - 1
					)
			  )
			: setChoice(filteredReservedNoNextTo);
	}, []);
	//

	//functions
	const addChoiceCords = (seat) => {
		setChoice((prevState) => [
			...prevState,
			{ cords: { x: seat.cords.x, y: seat.cords.y }, id: seat.id },
		]);
		console.log(choice);
	};

	const removeChoiceCords = (seat) => {
		setChoice((prevState) => prevState.filter((el) => el.id !== seat.id));
	};

	//
	return (
		<>
			{" "}
			<SeatsContainer height={floorHeight}>
				{seats.map((seat) => {
					return (
						<Square
							style={{
								width: `${height}px`,
								gridColumn: seat.cords.y + 1,
								gridRow: seat.cords.x + 1,
							}}
							height={floorHeight}
							key={seat.id}
							id={seat.id}
							ref={ref}
							onClick={() =>
								choice.find((ele) => ele.id === seat.id)
									? removeChoiceCords(seat)
									: addChoiceCords(seat)
							}
							x={seat.cords.x}
							y={seat.cords.y}
							disabled={seat.reserved}
							choice={choice}
							reserved={seat.reserved}
						></Square>
					);
				})}
				<div className="legend">
					<div className="bottom-panel-wrapper">
						<LegendSquare
							className="square"
							height={height}
							type="free"
						></LegendSquare>
						<p>Miejsca dostępne</p>
					</div>
					<div className="bottom-panel-wrapper">
						{" "}
						<LegendSquare
							className="square"
							type="reserved"
							height={height}
						></LegendSquare>
						<p>Miejsca zarezerwowane</p>
					</div>
					<div className="bottom-panel-wrapper">
						{" "}
						<LegendSquare
							className="square"
							type="choice"
							height={height}
						></LegendSquare>
						<p>Twój wybór</p>
					</div>

					<Link href="/finish">
						<button className="reserve-button">Rezerwuj</button>
					</Link>
				</div>
			</SeatsContainer>
		</>
	);
};

export default Miejsca;
