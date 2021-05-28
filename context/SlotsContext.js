import React, { createContext, useState } from "react";
export const SlotsContext = createContext();
export const SlotsContextProvider = ({ children }) => {
	const [slots, setSlots] = useState(0);
	const [nextTo, setNextTo] = useState(false);
	const value = { slots, setSlots, nextTo, setNextTo };
	return (
		<SlotsContext.Provider value={value}>{children}</SlotsContext.Provider>
	);
};

export default SlotsContextProvider;
