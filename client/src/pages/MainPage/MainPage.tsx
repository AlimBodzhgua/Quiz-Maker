import { FC, useState } from 'react';

const MainPage: FC = () => {
	const [count, setCount] = useState(0);

	const onIncrement = () => {
		setCount((prev) => prev + 1);
	};

	const onDecremenet = () => {
		setCount((prev) => prev - 1);
	};
	
	return (
		<div>
			<h1>{count}</h1>
			<button onClick={onIncrement}>increment</button>
			<button onClick={onDecremenet}>decrement</button>
		</div>
	);
}

export default MainPage;