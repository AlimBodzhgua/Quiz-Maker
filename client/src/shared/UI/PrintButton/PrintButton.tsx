import type { FC } from 'react';

import { Button } from '@chakra-ui/react';
import { memo } from 'react';
import PrinterIcon from './assets/printer.svg';

export const PrintButton: FC = memo(() => {
	const onPrint = () => window.print();

	return (
		<Button
			onClick={onPrint}
			size='sm'
			variant='unstyled'
			className='no-printme'
			fill='blackAlpha.800'
			_hover={{ transform: 'scale(1.1)' }}
		>
			<PrinterIcon />
		</Button>
	);
});
