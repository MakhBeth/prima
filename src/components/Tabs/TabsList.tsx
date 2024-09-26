import React from "react";
import type { ReactElement } from "react";
import { TabsButton } from "./TabsButton";
import { useTabsContext } from "./TabsContext";

interface TabsListProps {
	children: ReactElement<typeof TabsButton> | ReactElement<typeof TabsButton>[];
	variant?: "underline" | "pill";
}

export const TabsList: React.FC<TabsListProps> = ({
	children,
	variant = "underline",
}) => {
	const { setActiveTab } = useTabsContext();
	const handleKeyDown = React.useCallback(
		(event: React.KeyboardEvent) => {
			const tabs = Array.from(
				event.currentTarget.querySelectorAll('button[role="tab"]'),
			);
			const currentIndex = tabs.findIndex(
				(tab) =>
					tab ===
					(event.currentTarget.getRootNode() as ShadowRoot).activeElement,
			);
			let nextIndex: number;

			switch (event.key) {
				case "ArrowRight":
					nextIndex = (currentIndex + 1) % tabs.length;
					break;
				case "ArrowDown":
					nextIndex = (currentIndex + 1) % tabs.length;
					setActiveTab(nextIndex);
					break;
				case "ArrowLeft":
					nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
					break;
				case "ArrowUp":
					nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
					setActiveTab(nextIndex);
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
		},
		[setActiveTab],
	);

	// Validate children
	const validChildren = React.Children.toArray(children).filter(
		(child): child is ReactElement<typeof TabsButton> =>
			React.isValidElement(child) && child.type === TabsButton,
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
