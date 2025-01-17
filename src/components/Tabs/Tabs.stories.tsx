import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./";
import type { FC, ReactElement, ReactNode } from "react";

const Skeleton: FC<{ children?: ReactNode }> = ({ children }) => (
	<div
		style={{
			background: "light-dark(rgba(0,0,0,0.05), rgba(255,255,255, 0.1))",
			width: "max(300px, 50%)",
			alignContent: "center",
			padding: "1em",
			textAlign: "center",
			minHeight: 60,
			marginBottom: 15,
			borderRadius: 8,
		}}
	>
		{children}
	</div>
);

interface TabsStoryProps {
	variant?: "underline" | "pill";
	buttonLabels?: string[];
	contentLabels?: string[];
}

const meta: Meta<TabsStoryProps> = {
	title: "Components/Tabs",
	argTypes: {
		variant: {
			control: "select",
			options: ["underline", "pill"],
		},
		buttonLabels: {
			control: "object",
		},
		contentLabels: {
			control: "object",
		},
	},
};

export default meta;
type Story = StoryObj<TabsStoryProps>;

export const Default: Story = {
	args: {
		buttonLabels: ["Emails", "Files", "Edits", "Downloads"],
		contentLabels: [
			"Content for Tab 1",
			"Content for Tab 2",
			"Content for Tab 3",
			"Content for Tab 4",
		],
	},
	render: (args) => (
		<Tabs>
			<Tabs.List variant={args.variant}>
				{args.buttonLabels?.map((label, index) => (
					<Tabs.Button key={label} index={index}>
						{label}
					</Tabs.Button>
				))}
			</Tabs.List>
			{
				args.contentLabels?.map((content, index) => (
					<Tabs.Panel key={content} index={index}>
						<Skeleton>{content}</Skeleton>
						<Skeleton />
						<Skeleton />
						<Skeleton />
					</Tabs.Panel>
				)) as ReactElement<FC<unknown>, string>[]
			}
		</Tabs>
	),
};

export const WithBadges: Story = {
	render: (args) => (
		<Tabs>
			<Tabs.List variant={args.variant}>
				<Tabs.Button index={0}>
					Tab 1<Tabs.Badge variant="neutral">neutral</Tabs.Badge>
				</Tabs.Button>
				<Tabs.Button index={1}>
					Tab 2<Tabs.Badge variant="negative">negative</Tabs.Badge>
				</Tabs.Button>
				<Tabs.Button index={2}>
					Tab 3<Tabs.Badge variant="positive">positive</Tabs.Badge>
				</Tabs.Button>
			</Tabs.List>
			<Tabs.Panel index={0}>
				<Skeleton>Content for Tab 1</Skeleton>
				<Skeleton />
				<Skeleton />
				<Skeleton />
			</Tabs.Panel>
			<Tabs.Panel index={1}>
				<Skeleton>Content for Tab 2</Skeleton>
				<Skeleton />
				<Skeleton />
				<Skeleton />
			</Tabs.Panel>
			<Tabs.Panel index={2}>
				<Skeleton>Content for Tab 3</Skeleton>
				<Skeleton />
				<Skeleton />
				<Skeleton />
			</Tabs.Panel>
		</Tabs>
	),
};

export const Scrollable: Story = {
	args: {
		buttonLabels: ["Tab 1 f", "Tab 2", "Tab 3", "Tab 4", "Tab 5", "Tab 6"],
		contentLabels: [
			"Content for Tab 1",
			"Content for Tab 2",
			"Content for Tab 3",
			"Content for Tab 4",
			"Content for Tab 5",
			"Content for Tab 6",
		],
	},
	render: (args) => (
		<div style={{ width: "300px" }}>
			<Tabs>
				<Tabs.List variant={args.variant}>
					{args.buttonLabels?.map((label, index) => (
						<Tabs.Button key={label} index={index}>
							{label}
							{index === 4 ? (
								<Tabs.Badge variant="positive">positive</Tabs.Badge>
							) : null}
							{index === 5 ? (
								<Tabs.Badge variant="negative">negative</Tabs.Badge>
							) : null}
						</Tabs.Button>
					))}
				</Tabs.List>
				{args.contentLabels?.map((content, index) => (
					<Tabs.Panel key={content} index={index}>
						<Skeleton>{content}</Skeleton>
						<Skeleton />
						<Skeleton />
						<Skeleton />
					</Tabs.Panel>
				))}
			</Tabs>
		</div>
	),
};
