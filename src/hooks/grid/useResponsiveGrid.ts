import { useEffect, useRef, useState } from 'react';

const useResponsiveGrid = () => {
	const [count, setCount] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const update = () => {
			if (!containerRef.current) return;

			const width = containerRef.current.offsetWidth;

			let nextCount: number;

			if (width < 640) nextCount = 2;
			else if (width < 768) nextCount = 3;
			else if (width < 1024) nextCount = 4;
			else if (width < 1280) nextCount = 5;
			else nextCount = 6;

			setCount(nextCount);
		};

		const observer = new ResizeObserver(update);
		observer.observe(containerRef.current);

		update();

		return () => observer.disconnect();
	}, []);

	return { count, containerRef };
};

export default useResponsiveGrid;
