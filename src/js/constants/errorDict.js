export const errorDict = {
	DEFAULT: {
		header: "Something went wrong!",
		text:
			"We are uncertain what exactly happened, so please check your internet connectionb and try again. If the bug repeats, please let me know at illustrova@gmail.com or submit an issue on Github.",
	},
	JSONPARSE: {
		header: "Your JSON seems to be invalid",
		text:
			"An error happened when we tried to parse JSON. Please validate your file and try again.",
	},
	INVALID_SCHEMA: {
		header: "Your file is not valid",
		text: `There was a problem with variable names in your file. Please check it after "%KEY%" and below`,
	},
	INVALID_FILE: {
		header: "Your file is not valid",
		text: `There is a problem occured parsing your file, please validate it and try again.`,
	},
	WRONGEXT: {
		header: "You are trying to import unsupported file",
		text: `.%EXT% files cannot be imported. We currently support importing files with the following extensions: %FORMATS%.`,
	},
	EMPTY_PALETTE: {
		header: "Nothing to export :(",
		text: "Your palette is empty. Choose some colors first!",
	},
	EMPTY_SCHEMA: {
		header: "Nothing to import :(",
		text: "We didn't find any variables that can be imported in your file",
	},
	FILENOTREADABLE: {
		header: "Can't read your file :(",
		text: "Something is wrong with your file. Please check it and try again.",
	},
	NOT_A_COLOR: {
		header: "Unexpected color value",
		text:
			'A string "%COLOR%" doesn\'t look like a valid color. Please check and edit your file',
	},
};
