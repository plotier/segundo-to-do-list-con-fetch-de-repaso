import React, { useState, useEffect } from "react";

export const ToDoList = () => {
	const [input, setInput] = useState("");
	const [tasks, setTasks] = useState([]);
	const url = "https://assets.breatheco.de/apis/fake/todos/user/plotier2";

	useEffect(() => {
		fetch(url)
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then(function(responseAsJson) {
				// Do stuff with the JSON
				setTasks(responseAsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	useEffect(
		() => {
			fetch(url, {
				method: "PUT", // or 'POST'
				body: JSON.stringify(tasks), // data can be `string` or {object}!
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(res => res.json())
				.then(response => console.log("Success:", JSON.stringify(response)))
				.catch(error => console.error("Error:", error));
		},
		[tasks]
	);
	const todoItems = tasks.map((todo, index) => <li key={index}>{todo}</li>);
	return (
		<div>
			<input type="text" onChange={e => setInput(e.target.value)} value={input} />
			<button onClick={() => setTasks([...tasks, input])}>Agregar task</button>
			<ul className="list-group">{todoItems}</ul>
		</div>
	);
};
