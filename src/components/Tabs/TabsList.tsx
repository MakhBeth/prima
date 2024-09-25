import React from "react";
import type { ReactElement } from "react";
import { TabsButton } from "./TabsButton";

interface TabsListProps {
	children: ReactElement<typeof TabsButton> | ReactElement<typeof TabsButton>[];
	variant?: "underline" | "pill";
}

export const TabsList: React.FC<TabsListProps> = ({
	children,
	variant = "underline",
}) => {
	const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
		const tabs = Array.from(
			event.currentTarget.querySelectorAll('button[role="tab"]'),
		);
		const currentIndex = tabs.findIndex(
			(tab) => tab === document.activeElement,
		);
		let nextIndex: number;

		switch (event.key) {
			case "ArrowRight":
			case "ArrowDown":
				nextIndex = (currentIndex + 1) % tabs.length;
				break;
			case "ArrowLeft":
			case "ArrowUp":
				nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
				break;
			case "Home":
				nextIndex = 0;
				break;
			case "End":
				nextIndex = tabs.length - 1;
				break;
			default:
				return;
		}

		(tabs[nextIndex] as HTMLElement).focus();
		event.preventDefault();
	}, []);

	// Validate children
	const validChildren = React.Children.toArray(children).filter(
		(child) => React.isValidElement(child) && child.type === TabsButton,
	);

	if (validChildren.length !== React.Children.count(children)) {
		console.warn(
			"TabsList component can only have TabsButton as direct children.",
		);
	}

	return (
		<div
			className={`tab-list ${variant}`}
			role="tablist"
			onKeyDownCapture={handleKeyDown}
			aria-orientation="horizontal"
		>
			{validChildren}
		</div>
	);
};
