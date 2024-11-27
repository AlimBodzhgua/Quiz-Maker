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
import { TestService } from '@/services/TestService';
import { useTestsStore } from 'store/tests';
import { TimerLimit } from 'types/timer';
import { getQueryParam } from '@/utils/utils';

export const TimerSettings: FC = memo(() => {
	const [isTimerEnabled, setIsTimerEnabled] = useState<boolean>(false);
	const [showLimit, setShowLimit] = useState<boolean>(false);
	const [minutes, setMinutes] = useState<number>(1);
	const [seconds, setSeconds] = useState<number>(0);
	const updateTest = useTestsStore((state) => state.updateTest);
	const [isDataChanged, setIsDataChanged] = useState<boolean>(false);

	useEffect(() => {
		const testId = getQueryParam('id');
		initTestTimerData(testId);
	}, []);

	const initTestTimerData = useCallback(async(testId: string) => {
		const data = await TestService.getTest(testId);

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
		const testId = getQueryParam('id');

		const testTimerData = {
			withTimer: isTimerEnabled,
			...((minutes !== 0  && showLimit) || (seconds !== 0 && showLimit)) && {
				timerLimit: {
					minutes: minutes,
					seconds: seconds,
				},
			},
		};

		await updateTest(testId, {
			withTimer: testTimerData.withTimer,
			timerLimit: testTimerData.timerLimit as TimerLimit,
		});

		setIsDataChanged(false);
	};

	return (
		<>
			<FormControl display='flex' alignItems='center' mb='5px'>
				<Flex justifyContent='space-between' w='100%'>
					<Flex alignItems='center'>
						<FormLabel htmlFor='test-timer'>
							Enable test timer
						</FormLabel>
						<Switch
							id='test-timer'
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