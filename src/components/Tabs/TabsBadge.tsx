interface TabsBadgeProps {
	children: React.ReactNode;
	variant?: "negative" | "positive" | "neutral";
}

export const TabsBadge: React.FC<TabsBadgeProps> = ({
	children,
	variant = "neutral",
}) => {
	return <span className={`tabs-badge ${variant}`}>{children}</span>;
};
