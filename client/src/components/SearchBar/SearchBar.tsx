import { FC, memo, useEffect, useRef, useState } from 'react';
import { Input, InputGroup, InputLeftElement, InputRightElement, Kbd } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useDebounce } from '@/hooks/useDebounce';
import { useQuizzesStore } from 'store/quizzes';

export const SearchBar: FC = memo(() => {
	const [value, setValue] = useState<string>('');
	const inputRef = useRef<HTMLInputElement | null>(null);
	const quizzes = useQuizzesStore((state) => state.quizzes);
	const debouncedValue = useDebounce(value);
	const setSortedAndFilteredQuizzes = useQuizzesStore((state) => state.setSortedAndFilteredQuizzes);

	useEffect(() => {
		window.addEventListener('keydown', onHotkeyPress);

		return () => window.removeEventListener('keydown', onHotkeyPress);
	}, []);

	useEffect(() => {
		const result = quizzes.filter((quiz) =>
			quiz.title.toLocaleLowerCase().includes(debouncedValue.toLocaleLowerCase()),
		);
		setSortedAndFilteredQuizzes(result);
	}, [debouncedValue]);

	const onHotkeyPress = (e: KeyboardEvent) => {
		if (e.altKey === true && e.key === 'Enter') {
			if (document.activeElement === inputRef.current) {
				return inputRef.current?.blur();
			}
			return inputRef.current?.focus();
		}
		if (document.activeElement === inputRef.current && e.key === 'Escape') {
			return inputRef.current?.blur();
		}
	};

	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};


	return (
		<InputGroup>
			<InputLeftElement>
				<SearchIcon />
			</InputLeftElement>
			<Input
				placeholder='Search'
				ref={inputRef}
				value={value}
				onChange={onChangeValue}
				disabled={quizzes.length <= 1}
			/>
			<InputRightElement display='flex' textAlign='center' gap='5px' pr='60px'>
				<Kbd borderRadius='none'>alt</Kbd>+<Kbd borderRadius='none'>enter</Kbd>
			</InputRightElement>
		</InputGroup>
	)
})