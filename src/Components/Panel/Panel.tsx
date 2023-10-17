import { FC } from 'react';
import ClassNames from 'classnames';

interface PropsI {
	className?: string;
	children: any;
}

const Panel: FC<PropsI> = ({ children, className, ...otherProps }) => {
	const finalClassNames = ClassNames(
		'border rounded p-3 shadow bg-white w-full',
		className
	);
	return (
		<div {...otherProps} className={finalClassNames}>
			{children}
		</div>
	);
};

export default Panel;
