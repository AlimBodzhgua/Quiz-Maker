import { FC, memo, useCallback, useEffect, useState } from 'react';
import { CheckIcon } from '@chakra-ui/icons';
import {
	Button,
	Collapse,
	Flex,
	FormControl,
	FormLabel,
	Select,
	Switch,
} from '@chakra-ui/react';
import { getQueryParam } from 'shared/utils';
import type { Quiz } from 'entities/Quiz';
import { QuizService } from '../../api/QuizService';

interface TimerSettingProps {
	onUpdate: (quiz: Partial<Quiz>) => Promise<Quiz>;
}

export const TimerSettings: FC<TimerSettingProps> = memo(({ onUpdate }) => {
	const [isTimerEnabled, setIsTimerEnabled] = useState<boolean>(false);
	const [showLimit, setShowLimit] = useState<boolean>(false);
	const [minutes, setMinutes] = useState<number>(1);
	const [seconds, setSeconds] = useState<number>(0);
	const [isDataChanged, setIsDataChanged] = useState<boolean>(false);

	const initQuizTimerData = useCallback(async(quizId: string) => {
		const data = await QuizService.getQuiz(quizId);

		if (data.withTimer) {
			setIsTimerEnabled(true);
		}

		if (data.timerLimit) {
			setShowLimit(true);
			if (data.timerLimit.minutes) {
				setMinutes(data.timerLimit.minutes);
			}
			if (data.timerLimit.seconds) {
				setSeconds(data.timerLimit.seconds);
			}
		}
	}, []);

	useEffect(() => {
		const quizId = getQueryParam('id');
		initQuizTimerData(quizId);
	}, [initQuizTimerData]);

	const onToggleTimerEnable = () => {
		setIsTimerEnabled((prev) => !prev);
		setIsDataChanged(true);
		setShowLimit(false);
	};

	const onToggleShowLimit = () => {
		setShowLimit((prev) => !prev);
		setIsDataChanged(true);
	};
	
	const onChangeMinutes = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setMinutes(Number(e.target.value));
		setIsDataChanged(true);
	};

	const onChangeSeconds = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const seconds = Number(e.target.value);

		if (seconds === 60) {
			setMinutes((prev) => prev + 1);
			setSeconds(0);
		} else {
			setSeconds(seconds);
		}

		setIsDataChanged(true);
	};

	const onSave = async () => {
		const quizTimerData = {
			withTimer: isTimerEnabled,
			...((minutes !== 0  && showLimit) || (seconds !== 0 && showLimit)) && {
				timerLimit: {
					minutes: minutes,
					seconds: seconds,
				},
			},
		};

		await onUpdate({
			withTimer: quizTimerData.withTimer,
			timerLimit: quizTimerData.timerLimit,
		})

		setIsDataChanged(false);
	};

	return (
		<>
			<FormControl display='flex' alignItems='center' mb='5px'>
				<Flex justifyContent='space-between' w='100%'>
					<Flex alignItems='center'>
						<FormLabel htmlFor='quiz-timer'>
							Enable quiz timer
						</FormLabel>
						<Switch
							id='quiz-timer'
							isChecked={isTimerEnabled}
							onChange={onToggleTimerEnable}
						/>
					</Flex>
					<Button
						size='xs'
						variant='outline'
						borderRadius='initial'
						justifySelf='flex-end'
						onClick={onSave}
						disabled={!isDataChanged}
					>
						<CheckIcon/>
					</Button>
				</Flex>
			</FormControl>
			{isTimerEnabled &&
				<Flex>
					<Button
						onClick={onToggleShowLimit}
						size='sm'
						variant='outline'
						m='0 10px 10px 0'
					>
						Set limit
					</Button>
					<Collapse in={showLimit} animateOpacity>
						<Flex>
							<Select
								value={minutes}
								onChange={onChangeMinutes}
								size='sm'
								w='115px'
							>
								{Array(21).fill(0).map((_, index) => (
									<option value={index} key={index}>{index} minutes</option>
								))}
							</Select>
							<Select
								value={seconds}
								onChange={onChangeSeconds}
								size='sm'
								w='115px'
							>
								{Array(61).fill(0).map((_, index) => (
									<option value={index} key={index}>{index} seconds</option>
								))}
							</Select>
						</Flex>
					</Collapse>
				</Flex>
			}
		</>
	)
});