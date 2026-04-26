import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#root'));

class App extends React.Component {
	state = {
		counter: 0,
	};

	render() {
		console.log('render');

		return <h1>{this.state.counter}</h1>;
	}

	componentDidMount() {
		console.log('componentDidMount');

		this.intervalId = setInterval(() => {
			const { counter } = this.state;
			this.setState(prev => ({ counter: prev.counter + 1 }));
		}, 5000);
	}

	componentDidUpdate() {
		console.log('componentDidUpdate');
	}

	componentWillUnmount() {
		console.log('componentWillUnmount');

		clearInterval(this.intervalId);
	}
}

root.render(<App />);
