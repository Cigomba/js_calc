import "./App.css";
import { useEffect, useRef, useState } from "react";
import { create, all } from "mathjs";

function App() {
	const math = create(all);

	const [state, setState] = useState({
		ans: 0,
		input: "",
		output: "0",
		clearOnNext: false
	});

	const input = useRef();
	const calculator = useRef(null);

	useEffect(() => {
		// input listener
		const inputEl = input.current;
		if (input.current) {
			document.addEventListener("keydown", ({ key }) => {
				input.current.focus();
				switchIt(key);
			});
		}

		// button listeners
		if (calculator.current) {
			const buttons = document.querySelectorAll("button");
			console.log("runs only once");
			buttons.forEach(btn => {
				btn.addEventListener("click", e => {
					switchIt(e.target.textContent);
				});
			});
		}
	}, []);

	function resolveInput(input) {
		return input
			.replace(/^[0]/g, "")
			.replace(/[.][.]/g, ".")
			.replace(/\//g, "÷");
	}

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
				setState(state => {
					if (state.clearOnNext) {
						return Object.assign({}, state, {
							input: x, output: state.output + x, clearOnNext: false
						});
					}
					return Object.assign({}, state, {
						input: x, output: resolveInput(state.output.includes(".") && x === "." ? state.output : state.output + x),
						clearOnNext: false
					});
				});

				break;
			case "+":
			case "-":
			case "÷":
			case "/":
			case "x":
			case "*":
				setState(state => {
					if (state.output === "") {
						return state;
					}

					if (state.clearOnNext) {
						return Object.assign({}, state, {
							input: x, output: state.ans + x, clearOnNext: false
						});
					}

					let y = state.output[state.output.length - 1];

					if (state.output.length > 0 && (y === "x" || y === "*" || y === "+" || y === '-' || y === "/" || y === "÷")) {
						if (x === '-') {
							return Object.assign({}, state, {
								input: x, output: state.output + x
							});
						}
						return Object.assign({}, state, {
							input: x, output: state.output.slice(0, state.output.length - 1) + x
						});
					}
					return Object.assign({}, state, {
						input: x, output: state.output + x
					});
				});
				break;
			case "Delete":
			case "Backspace":
				setState(state =>
					Object.assign({}, state, {
						input: "", output: state.output.slice(0, state.output.length - 1)
					})
				);
				break;
			case "AC":
				setState(state => {

					return Object.assign({}, state, { ans: 0, input: "0", output: "", clearOnNext: false });
				});

				break;
			case "=":
			case "Enter":
				try {
					setState(state => {
						let y = state.output[state.output.length - 1];
						if (state.output.length > 0 && (y === "x" || y === "*" || y === "+" || y === '-' || y === "/" || y === "÷")) {
							return state;
						}
						return Object.assign({}, state, {
							ans: math.evaluate(state.output.replace(/x/g, "*").replace(/÷/g, "/")),
							clearOnNext: true
						});
					});
				} catch (error) {
					console.error(error);
				}
				setState(state =>
					Object.assign({}, state, {
						input: state.ans + "",
						output: state.output + " = " + state.ans,
						clearOnNext: true
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
			<div className="Calculator" ref={calculator}>
				<div id="input">
					<input id="display" style={{ textAlign: "right" }} onChange={() => { }} ref={input} value={state.input} />
					<span id="output">{state.output}</span>
				</div>
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
