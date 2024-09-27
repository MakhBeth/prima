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
			aria-selected={activeTab === index ? "true" : "false"}
			aria-controls={`tabpanel-${tabsId}-${index}`}
			id={`tab-${tabsId}-${index}`}
			onClick={() => setActiveTab(index)}
			className={`tabs-button ${activeTab === index ? "active" : ""}`}
			style={{ "anchor-name": `--tab-${index}` } as React.CSSProperties}
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
