import React, { useState, ReactElement } from "react";
import { TabsList } from "./TabsList";
import { TabsButton } from "./TabsButton";
import { TabsPanel } from "./TabsPanel";
import { TabsBadge } from "./TabsBadge";
import { TabsContext } from "./TabsContext";

interface TabsProps {
	children:
		| [ReactElement<typeof TabsList>, ReactElement<typeof TabsPanel>]
		| ReactElement<typeof TabsList | typeof TabsPanel>[];
}

const Tabs: React.FC<TabsProps> & {
	List: typeof TabsList;
	Button: typeof TabsButton;
	Panel: typeof TabsPanel;
	Badge: typeof TabsBadge;
} = ({ children }) => {
	const [activeTab, setActiveTab] = useState(0);

	// Validate children
	const validChildren = React.Children.toArray(children).filter(
		(child) =>
			React.isValidElement(child) &&
			(child.type === TabsList || child.type === TabsPanel),
	);

	if (validChildren.length !== React.Children.count(children)) {
		console.warn(
			"Tabs component can only have TabsList and TabsPanel as direct children.",
		);
	}

	return (
		<TabsContext.Provider value={{ activeTab, setActiveTab }}>
			<div className="tabs">{validChildren}</div>
		</TabsContext.Provider>
	);
};

Tabs.List = TabsList;
Tabs.Button = TabsButton;
Tabs.Panel = TabsPanel;
Tabs.Badge = TabsBadge;

export { Tabs };
