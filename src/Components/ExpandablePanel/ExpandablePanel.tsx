import { FC, ReactNode, useState } from 'react';
import { GoArrowDown, GoArrowRight } from 'react-icons/go';
import Button from '../Button/Button.tsx';

type TAlbumListProps = {
	header: ReactNode;
	children: ReactNode;
	className?: string;
};

const ExpandablePanel: FC<TAlbumListProps> = ({
	header,
	children,
	className,
}) => {
	const [show, setShow] = useState(false);
	return (
		<div className={`border-b-4  ${className}`}>
			<div className={'flex justify-between items-center'}>
				<div className={'rounded flex items-center'}>{header}</div>
				<Button
					outlined
					className={
						'border-0 text-gray-100 hover:border-2 hover:bg-gray-200 hover:text-black text-2xl transition-all'
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
