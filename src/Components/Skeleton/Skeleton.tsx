import { FC } from 'react';

const Skeleton: FC<{ className?: string; times: number }> = ({
	className,
	times,
}) => {
	return (
		<div>
			{Array.from({ length: times }).map((_, i) => (
				<div
					key={i}
					className={`animate-pulse bg-gray-300 rounded my-2 ${className}`}
				/>
			))}
		</div>
	);
};

export default Skeleton;
