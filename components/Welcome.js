import styled from "styled-components";
import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SlotsContext } from "../context/SlotsContext";
import { useRouter } from "next/dist/client/router";
import * as Yup from "yup";

const ErrorRow = styled.div`
	margin: ${({ error }) => (error ? "1rem 0" : 0)};
	transition: margin 0.3s ease-out;
	align-items: center;
`;
const StyledContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	form {
		display: flex;
		flex-direction: column;
	}
	input {
		height: 1.5rem;
	}
	label {
		margin-right: 1rem;
	}
	.row {
		margin: 1rem 0;
		display: flex;
		align-items: center;
	}
	.error {
		color: red;
	}
	button {
		width: 100%;
		height: 3rem;
		background-color: white;
		border: 1px solid grey;
		cursor: pointer;
		&:hover {
			transition: all 0.3s;
			background-color: #f2f2f2;
		}
	}
`;

const Welcome = () => {
	const SlotsSchema = Yup.object().shape({
		slots: Yup.number()
			.min(1, "Minimalnie jedno miejsce")
			.max(5, "Maksymalnie pięć miejsc")
			.required("Proszę wprowadzić liczbę"),
	});
	const { setSlots, setNextTo } = useContext(SlotsContext);
	const router = useRouter();

	const handleSubmit = (slots, nextTo) => {
		setSlots(slots);
		setNextTo(nextTo);
	};
	return (
		<StyledContainer>
			{" "}
			<Formik
				validationSchema={SlotsSchema}
				initialValues={{ slots: 0, nextTo: false }}
				onSubmit={(values, { setSubmitting }) => {
					handleSubmit(values.slots, values.nextTo);
					setTimeout(() => {
						setSubmitting(false);
						router.push("/miejsca");
					}, 500);
				}}
			>
				{({ isSubmitting, errors }) => (
					<Form className="form">
						<div className="row">
							<label htmlFor="slots">Liczba miejsc:</label>
							<Field type="number" name="slots" />
						</div>
						<ErrorRow error={errors.slots}>
							<ErrorMessage className="error" name="slots" component="div" />
						</ErrorRow>
						<div className="row">
							<Field type="checkbox" name="nextTo" />
							<label htmlFor="nextTo">Czy miejsca mają być obok siebie?</label>
						</div>
						<div className="row">
							{" "}
							<button type="submit" disabled={isSubmitting}>
								Wybierz miejsca
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</StyledContainer>
	);
};

export default Welcome;
