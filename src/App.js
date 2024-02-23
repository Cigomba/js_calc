import "./App.css";
import { useEffect, useRef, useState } from "react";
import { create, all } from "mathjs";

function App() {
	const math = create(all);

	const [state, setState] = useState({
		ans: 0,
		input: ""
	});
	const input = useRef();

	useEffect(() => {
		// button listeners
		const buttons = document.querySelectorAll("button");
		buttons.forEach(btn => {
			btn.addEventListener("click", e => {
				e.preventDefault();
				switchIt(e.target.textContent);
			});
		});

		// input listener
		const inputEl = input.current;
		inputEl.addEventListener("keydown", ({ key }) => {
			switchIt(key);
		});
	});

	function switchIt(e) {
		const x = e;
		switch (x) {
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
			case ".":
				setState(state =>
					Object.assign({}, state, {
						input: state.input.replace(/^[0]/g, "") + x
					})
				);

				break;
			case "+":
			case "-":
			case "÷":
			case "/":
				setState(state =>
					Object.assign({}, state, {
						input: state.input.replace(/^[0]/g, "") + x.replace(/\//g, "÷")
					})
				);
				break;
			case "x":
			case "*":
				setState(state =>
					Object.assign({}, state, {
						input: state.input.replace(/^[0]/g, "") + x
					})
				);
				break;
			case "Delete":
				setState(state =>
					Object.assign({}, state, {
						input: state.input.slice(0, state.input.length - 1)
					})
				);
				break;
			case "AC":
				setState(state => Object.assign({}, state, { ans: 0, input: "0" }));
				break;
			case "=":
			case "Enter":
				let answer;

				try {
					answer = math.evaluate(state.input.replace(/x/g, "*").replace(/÷/g, "/"));
					// console.log("answer: " + answer);
				} catch (error) {
					console.error(error);
					answer = "Try again";
				}

				setState(state => {
					return Object.assign({}, state, {
						ans: answer
					});
				});

				setState(state =>
					Object.assign({}, state, {
						input: state.ans + ""
					})
				);
				break;
			default:
				break;
		}
	}

	return (
		<div className="App">
			<h1>Javascript Calculator</h1>
			<div className="Calculator">
				<input id="display" style={{ textAlign: "right" }} ref={input} value={state.input} onChange={e => setState({ input: e.target.value })} />
				<button id="zero">0</button>
				<button id="one">1</button>
				<button id="two">2</button>
				<button id="three">3</button>
				<button id="four">4</button>
				<button id="five">5</button>
				<button id="six">6</button>
				<button id="seven">7</button>
				<button id="eight">8</button>
				<button id="nine">9</button>
				<button id="equals">=</button>
				<button id="add">+</button>
				<button id="subtract">-</button>
				<button id="multiply">x</button>
				<button id="divide">÷</button>
				<button id="decimal">.</button>
				<button id="clear">AC</button>
				<button id="delete">Delete</button>
			</div>
		</div>
	);
}

export default App;
