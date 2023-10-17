import { FC, ReactNode, useState } from 'react';
import { GoArrowDown, GoArrowRight } from 'react-icons/go';
import Button from '../Button/Button.tsx';

type TAlbumListProps = {
	header: ReactNode;
	children: ReactNode;
};

const ExpandablePanel: FC<TAlbumListProps> = ({ header, children }) => {
	const [show, setShow] = useState(false);
	return (
		<div className={'w-1/2 mx-auto border-2 mb-2'}>
			<div className={'flex justify-between items-center'}>
				<div className={'mb-2 rounded flex items-center'}>{header}</div>
				<Button
					outlined
					type={'info'}
					className={
						'border-0 hover:border-2 hover:bg-blue-200 hover:text-white text-2xl'
					}
					onClick={() => setShow((show) => !show)}>
					{show ? <GoArrowDown /> : <GoArrowRight />}
				</Button>
			</div>
			{show && <div>{children}</div>}
		</div>
	);
};

export default ExpandablePanel;
