import React from "react";
import { useTabsContext } from "./TabsContext";
import { TabsBadge } from "./TabsBadge";

interface TabsButtonProps {
	children: React.ReactNode;
	index: number;
}

export const TabsButton: React.FC<TabsButtonProps> = ({ children, index }) => {
	const { activeTab, setActiveTab, tabsId } = useTabsContext();

	return (
		<button
			type="button"
			role="tab"
			aria-selected={activeTab === index}
			aria-controls={`tabpanel-${tabsId}-${index}`}
			id={`tab-${tabsId}-${index}`}
			onClick={() => setActiveTab(index)}
		>
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child) && child.type === TabsBadge) {
					return child;
				}
				return <span>{child}</span>;
			})}
		</button>
	);
};
