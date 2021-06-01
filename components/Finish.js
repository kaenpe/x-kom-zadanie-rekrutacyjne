import styled from "styled-components";
import React, { useContext } from "react";
import { ChoiceContext } from "../context/ChoiceContext";

const FinishContainer = styled.main`
	color: #333333;
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
		li {
			font-size: 1.5rem;
		}
	}
	h2 {
		margin: 0;
	}
	.thanks {
		margin-top: 3rem;
	}
`;
const Finish = () => {
	const { choice } = useContext(ChoiceContext);
	return (
		<FinishContainer>
			<h1>Twoja rezerwacja przebiegła pomyślnie!</h1>
			<h2>Wybrałeś miejsca:</h2>
			<ul>
				{choice.map(({ id, cords: { y, x } }) => (
					<li>
						-rząd x{x}, miejsce y{y} &#40;id
						{id
							.split("")
							.filter((el) => el !== "s")
							.join("")}
						&#41;
					</li>
				))}
			</ul>
			<h2 className="thanks">
				Dziękujemy! W razie problemów prosimy o kontakt z działem administracji
			</h2>
		</FinishContainer>
	);
};

export default Finish;
