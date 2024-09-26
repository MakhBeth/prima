import { useTabsContext } from "./TabsContext";

export const TabsPanel: React.FC<{
	children: React.ReactNode;
	index: number;
}> = ({ children, index }) => {
	const { activeTab, tabsId } = useTabsContext();
	return (
		<div
			id={`tabpanel-${tabsId}-${index}`}
			aria-labelledby={`tab-${tabsId}-${index}`}
			hidden={activeTab !== index}
			role="tabpanel"
		>
			{children}
		</div>
	);
};
