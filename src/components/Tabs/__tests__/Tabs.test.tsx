import { render, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tabs } from "../index";

const getShadowRoot = (): HTMLElement | null => {
	const shadowHost = document.querySelector('div[data-testid="shadow-root"]');
	return shadowHost ? (shadowHost.shadowRoot as unknown as HTMLElement) : null;
};

describe("Tabs Component", () => {
	const renderTabs = () => (
		<Tabs>
			<Tabs.List>
				<Tabs.Button index={0}>Tab 1</Tabs.Button>
				<Tabs.Button index={1}>Tab 2</Tabs.Button>
				<Tabs.Button index={2}>Tab 3</Tabs.Button>
			</Tabs.List>
			<Tabs.Panel index={0}>Content 1</Tabs.Panel>
			<Tabs.Panel index={1}>Content 2</Tabs.Panel>
			<Tabs.Panel index={2}>Content 3</Tabs.Panel>
		</Tabs>
	);

	it("renders all tab labels", () => {
		render(renderTabs());
		const shadowRoot = getShadowRoot();
		expect(shadowRoot).not.toBeNull();
		if (!shadowRoot) return;

		const { getByText } = within(shadowRoot);
		expect(getByText("Tab 1")).toBeInTheDocument();
		expect(getByText("Tab 2")).toBeInTheDocument();
		expect(getByText("Tab 3")).toBeInTheDocument();
	});

	it("displays the first tab content by default and hides others", () => {
		render(renderTabs());
		const shadowRoot = getShadowRoot();
		expect(shadowRoot).not.toBeNull();
		if (!shadowRoot) return;

		const { getByText } = within(shadowRoot);
		const content1 = getByText("Content 1");
		const content2 = getByText("Content 2");
		const content3 = getByText("Content 3");

		expect(content1).toBeInTheDocument();
		expect(content1).not.toHaveAttribute("hidden");
		expect(content2).toBeInTheDocument();
		expect(content2).toHaveAttribute("hidden");
		expect(content3).toBeInTheDocument();
		expect(content3).toHaveAttribute("hidden");
	});

	it("switches content when clicking on a different tab", () => {
		render(renderTabs());
		const shadowRoot = getShadowRoot();
		expect(shadowRoot).not.toBeNull();
		if (!shadowRoot) return;

		const { getByText } = within(shadowRoot);

		const content1 = getByText("Content 1");
		const content2 = getByText("Content 2");
		const content3 = getByText("Content 3");

		fireEvent.click(getByText("Tab 2"));
		expect(content1).toHaveAttribute("hidden");
		expect(content2).not.toHaveAttribute("hidden");
		expect(content3).toHaveAttribute("hidden");

		fireEvent.click(getByText("Tab 3"));
		expect(content1).toHaveAttribute("hidden");
		expect(content2).toHaveAttribute("hidden");
		expect(content3).not.toHaveAttribute("hidden");
	});

	it("applies aria-selected attribute to the selected tab", () => {
		render(renderTabs());
		const shadowRoot = getShadowRoot();
		expect(shadowRoot).not.toBeNull();
		if (!shadowRoot) return;

		const { getAllByRole } = within(shadowRoot);

		const tabs = getAllByRole("tab");

		expect(tabs[0]).toHaveAttribute("aria-selected", "true");
		expect(tabs[1]).toHaveAttribute("aria-selected", "false");
		expect(tabs[2]).toHaveAttribute("aria-selected", "false");

		fireEvent.click(tabs[1]);

		expect(tabs[0]).toHaveAttribute("aria-selected", "false");
		expect(tabs[1]).toHaveAttribute("aria-selected", "true");
		expect(tabs[2]).toHaveAttribute("aria-selected", "false");
	});

	it("sets correct aria attributes for accessibility", () => {
		render(renderTabs());
		const shadowRoot = getShadowRoot();
		expect(shadowRoot).not.toBeNull();
		if (!shadowRoot) return;

		const { getByRole, getAllByRole } = within(shadowRoot);

		const tabList = getByRole("tablist");
		expect(tabList).toBeInTheDocument();
		expect(tabList).toHaveAttribute("aria-orientation", "horizontal");

		const tabs = getAllByRole("tab");
		expect(tabs.length).toBe(3);

		const panels = getAllByRole("tabpanel");
		expect(panels.length).toBe(1);

		tabs.forEach((tab, index) => {
			expect(tab).toHaveAttribute(
				"aria-controls",
				expect.stringContaining("tabpanel-"),
			);
			if (index === 0) {
				expect(panels[index]).toHaveAttribute("aria-labelledby", tab.id);
			}
		});
	});
});
