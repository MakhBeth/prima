import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Tabs } from "./components/Tabs";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);

root.render(
	<React.StrictMode>
		<Tabs>
			<Tabs.List variant="underline">
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
	</React.StrictMode>,
);
