import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { themes } from "@storybook/theming";

const preview: Preview = {
	parameters: {
		docs: {
			theme: themes.dark,
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		withThemeByClassName({
			themes: {
				light: "light-theme",
				dark: "dark-theme",
			},
			defaultTheme: "light",
			parentSelector: "body",
		}),
	],
};

export default preview;
