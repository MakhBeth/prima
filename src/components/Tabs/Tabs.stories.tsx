import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./";

interface TabsStoryProps {
	variant?: "underline" | "pill";
}

const meta: Meta<TabsStoryProps> = {
	title: "Components/Tabs",
	argTypes: {
		variant: {
			control: "select",
			options: ["underline", "pill"],
		},
	},
};

export default meta;
type Story = StoryObj<TabsStoryProps>;

export const Default: Story = {
	render: (args) => (
		<Tabs>
			<Tabs.List variant={args.variant}>
				<Tabs.Button index={0}>Tab 1</Tabs.Button>
				<Tabs.Button index={1}>Tab 2</Tabs.Button>
				<Tabs.Button index={2}>Tab 3</Tabs.Button>
			</Tabs.List>
			<Tabs.Panel index={0}>Content for Tab 1</Tabs.Panel>
			<Tabs.Panel index={1}>Content for Tab 2</Tabs.Panel>
			<Tabs.Panel index={2}>Content for Tab 3</Tabs.Panel>
		</Tabs>
	),
};

export const WithBadges: Story = {
	render: (args) => (
		<Tabs>
			<Tabs.List variant={args.variant}>
				<Tabs.Button index={0}>Tab 1</Tabs.Button>
				<Tabs.Button index={1}>Tab 2</Tabs.Button>
				<Tabs.Button index={2}>
					Tab 3<Tabs.Badge variant="positive">positive</Tabs.Badge>
				</Tabs.Button>
			</Tabs.List>
			<Tabs.Panel index={0}>Content for Tab 1</Tabs.Panel>
			<Tabs.Panel index={1}>Content for Tab 2</Tabs.Panel>
			<Tabs.Panel index={2}>Content for Tab 3</Tabs.Panel>
		</Tabs>
	),
};

export const Scrollable: Story = {
	render: (args) => (
		<div style={{ width: "300px", overflow: "auto" }}>
			<Tabs>
				<Tabs.List variant={args.variant}>
					<Tabs.Button index={0}>Tab 1</Tabs.Button>
					<Tabs.Button index={1}>Tab 2</Tabs.Button>
					<Tabs.Button index={2}>Tab 3</Tabs.Button>
					<Tabs.Button index={3}>Tab 4</Tabs.Button>
					<Tabs.Button index={4}>
						Tab 5<Tabs.Badge variant="positive">positive</Tabs.Badge>
					</Tabs.Button>
					<Tabs.Button index={5}>
						Tab 6<Tabs.Badge variant="negative">negative</Tabs.Badge>
					</Tabs.Button>
				</Tabs.List>
				<Tabs.Panel index={0}>Content for Tab 1</Tabs.Panel>
				<Tabs.Panel index={1}>Content for Tab 2</Tabs.Panel>
				<Tabs.Panel index={2}>Content for Tab 3</Tabs.Panel>
				<Tabs.Panel index={3}>Content for Tab 4</Tabs.Panel>
				<Tabs.Panel index={4}>Content for Tab 5</Tabs.Panel>
				<Tabs.Panel index={5}>Content for Tab 6</Tabs.Panel>
			</Tabs>
		</div>
	),
};
