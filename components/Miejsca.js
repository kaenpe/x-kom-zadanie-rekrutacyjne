import React, { useContext } from "react";
import { SlotsContext } from "../context/SlotsContext";

const Miejsca = () => {
	const { slots, nextTo } = useContext(SlotsContext);
	return (
		<div>
			<p>{slots}</p>
			<p>{nextTo ? "Obok" : "Nie obok"}</p>
		</div>
	);
};

export default Miejsca;
