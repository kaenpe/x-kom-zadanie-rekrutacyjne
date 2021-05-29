import React, { createContext, useState } from "react";
export const ChoiceContext = createContext();
export const ChoiceContextProvider = ({ children }) => {
	const [choice, setChoice] = useState([]);
	const value = { choice, setChoice };
	return (
		<ChoiceContext.Provider value={value}>{children}</ChoiceContext.Provider>
	);
};
