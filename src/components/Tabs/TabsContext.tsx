import { createContext, useContext } from "react";

interface TabsContextType {
	activeTab: number;
	setActiveTab: (index: number) => void;
	tabsId: string;
}

export const TabsContext = createContext<TabsContextType | undefined>(
	undefined,
);

export const useTabsContext = () => {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error("Tabs components must be used within a Tabs component");
	}
	return context;
};
