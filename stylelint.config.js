const { readGitignoreFiles } = require("eslint-gitignore");

module.exports = {
	extends: ["stylelint-config-standard", "stylelint-config-prettier"],
	plugins: ["stylelint-order", "stylelint-scss"],
	ignorePatterns: readGitignoreFiles({ cwd: __dirname }),
	// add your custom config here
	// https://stylelint.io/user-guide/configuration
	rules: {
		"at-rule-no-unknown": null,
		"scss/at-rule-no-unknown": true,
	},
};
