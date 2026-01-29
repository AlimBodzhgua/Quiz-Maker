import type { FC, ReactNode } from 'react';

interface NoPrintProps {
	children: ReactNode;
}

export const NoPrint: FC<NoPrintProps> = ({ children }) => {
	return (
		<div className='no-printme'>{children}</div>
	);
};
