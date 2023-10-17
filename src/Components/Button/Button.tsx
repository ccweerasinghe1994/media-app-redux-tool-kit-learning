import { FC } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { GoSync } from 'react-icons/go';
import {
	ButtonOutlineStyles,
	ButtonProps,
	ButtonSizes,
	ButtonTypeStyles,
} from './types.ts';

const Button: FC<ButtonProps> = ({
	children,
	rounded = false,
	outlined,
	type = 'none',
	size = 'medium',
	className,
	loading,
	onClick,
	...props
}) => {
	const classes = classNames(
		'border font-semibold flex items-center gap-2 h-8',
		ButtonTypeStyles[type],
		ButtonSizes[size],
		outlined && ButtonOutlineStyles[type],
		outlined && 'bg-transparent font-bold',
		rounded && 'rounded-full',
		loading && 'cursor-not-allowed opacity-50',
		className,
	);
	return (
		<button onClick={onClick} {...props} className={twMerge(classes)}>
			{loading ? <GoSync className={'animate-spin'} /> : children}
		</button>
	);
};

export default Button;
