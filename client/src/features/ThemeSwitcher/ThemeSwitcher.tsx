import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, useColorMode } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

export const ThemeSwitcher = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const sunIconRef = useRef<SVGSVGElement | null>(null);
	const moonIconRef = useRef<SVGSVGElement | null>(null);
	const isDark = colorMode === 'dark';

	useEffect(() => {
		if (isDark && sunIconRef.current) {
			sunIconRef.current.style.transform = 'scale(1)';
		} else if (!isDark && moonIconRef.current) {
			moonIconRef.current.style.transform = 'scale(1)';
		}
	}, []);

	const handleToggleColorMode = () => {
		if (isAnimating) return;

		setIsAnimating(true);

		if (sunIconRef.current && moonIconRef.current) {
			const hideIcon = isDark ? sunIconRef.current : moonIconRef.current;
			const showIcon = isDark ? moonIconRef.current : sunIconRef.current;

			hideIcon.style.transform = 'scale(0)';
			showIcon.style.transform = 'scale(1)';
		}

		setTimeout(() => {
			toggleColorMode();
			setIsAnimating(false);
		}, 300);
	};

	return (
		<Button
			className='group'
			display='flex'
			justifyContent='center'
			alignItems='center'
			bgColor='bg.secondary'
			position='relative'
			onClick={handleToggleColorMode}
			_hover={{ bgColor: 'bg.secondary' }}
		>
			<SunIcon
				ref={sunIconRef}
				color='orange.500'
				position='absolute'
				transform='scale(0)'
				transition='transform .2s'
				_groupHover={{ color: 'orange.300' }}
			/>
			<MoonIcon
				ref={moonIconRef}
				color='blue.300'
				transition='transform .2s'
				position='absolute'
				transform='scale(0)'
				_groupHover={{ color: 'blue.600' }}
			/>
		</Button>
	);
};
