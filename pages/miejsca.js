import React from "react";
import Miejsca from "../components/Miejsca";

export const getStaticProps = async (ctx) => {
	const res = await fetch("http://localhost:3004/seats");
	const seats = await res.json();
	return {
		props: {
			seats: seats,
		},
	};
};
const miejsca = ({ seats }) => {
	return <Miejsca seats={seats}></Miejsca>;
};

export default miejsca;
