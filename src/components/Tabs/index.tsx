import React, { useState, useRef } from "react";
import type { ReactElement } from "react";
import { TabsList } from "./TabsList";
import { TabsButton } from "./TabsButton";
import { TabsPanel } from "./TabsPanel";
import { TabsBadge } from "./TabsBadge";
import { TabsContext } from "./TabsContext";
import styles from "./styles/Tabs.css?inline"; // Import CSS as a string
import root from "react-shadow";

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
	const tabsId = useRef(window.crypto.randomUUID());

	const validChildren = React.Children.toArray(children).filter(
		(child): child is ReactElement<typeof TabsList | typeof TabsPanel> =>
			React.isValidElement(child) &&
			(child.type === TabsList || child.type === TabsPanel),
	);

	if (validChildren.length !== React.Children.count(children)) {
		console.warn(
			"Tabs component can only have TabsList and TabsPanel as direct children.",
		);
	}

	return (
		<TabsContext.Provider
			value={{ activeTab, setActiveTab, tabsId: tabsId.current }}
		>
			<root.div data-testid="shadow-root">
				<div className="tabs">
					{validChildren}
					<style type="text/css">{styles}</style>
				</div>
			</root.div>
		</TabsContext.Provider>
	);
};

Tabs.List = TabsList;
Tabs.Button = TabsButton;
Tabs.Panel = TabsPanel;
Tabs.Badge = TabsBadge;

export { Tabs };
