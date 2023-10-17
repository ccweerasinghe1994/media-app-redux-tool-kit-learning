import { ReactNode } from 'react';
export type TButtonType =
	| 'primary'
	| 'secondary'
	| 'danger'
	| 'success'
	| 'warning'
	| 'info'
	| 'light'
	| 'dark'
	| 'link'
	| 'none';
export interface ButtonProps {
	children?: ReactNode;
	rounded?: boolean;
	outlined?: boolean;
	type?: TButtonType;
	size?: 'small' | 'medium' | 'large';
	className?: string;
	loading?: boolean;
	onClick?: () => void;
}

export enum ButtonOutlineStyles {
	primary = 'text-blue-800',
	secondary = 'text-blue-500',
	danger = 'text-red-600',
	success = 'text-green-800',
	warning = 'text-yellow-800',
	info = 'text-blue-400',
	light = 'text-gray-400',
	dark = 'text-gray-800',
	link = 'text-slate-900',
	none = '',
}

export enum ButtonTypeStyles {
	primary = 'bg-blue-800 border-blue-800 text-white',
	secondary = 'bg-blue-400 border-blue-500 text-white',
	danger = 'bg-red-600 border-red-800 text-white',
	success = 'bg-green-500 border-green-600 text-white',
	warning = 'bg-yellow-500 border-yellow-600 text-white',
	info = 'bg-blue-400 border-blue-400 text-white',
	light = 'bg-gray-400 border-gray-400 text-white',
	dark = 'bg-gray-800 border-gray-800 text-white',
	link = 'bg-transparent border-2 text-slate-900 underline',
	none = '',
}

export enum ButtonSizes {
	small = 'text-sm px-3 py-2',
	medium = 'text-base px-4 py-2',
	large = 'text-lg px-6 py-3',
}
