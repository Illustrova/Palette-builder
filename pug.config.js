module.exports = {
	doctype: "html",
	locals: {
		...require("./src/js/constants/classNames.json"),
		...require("./src/js/constants/eventTypes.json"),
		...require("./src/js/constants/common.json"),
		syntax: require("./src/js/constants/syntax.json"),
	},
};
