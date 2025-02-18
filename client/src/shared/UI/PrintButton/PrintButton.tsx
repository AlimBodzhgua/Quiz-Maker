import { Button } from '@chakra-ui/react';
import { FC, memo } from 'react';
import PrinterIcon from './assets/printer.svg';

export const PrintButton: FC = memo(() => {

	const onPrint = () => window.print();

	return (
		<Button
			onClick={onPrint}
			size='sm'
			variant='unstyled'
			className='no-printme'
			_hover={{ fill: 'gray.600', transform: 'scale(1.1)'}}
		>
			<PrinterIcon />
		</Button>
	);
});