import { useTabsContext } from "./TabsContext";

export const TabsPanel: React.FC<{
	children: React.ReactNode;
	index: number;
}> = ({ children, index }) => {
	const { activeTab } = useTabsContext();
	return (
		<div
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			hidden={activeTab !== index}
			role="tabpanel"
		>
			{children}
		</div>
	);
};
