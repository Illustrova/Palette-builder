/* eslint-disable no-unused-vars */
import "../scss/main.scss";
import "../scss/vendors/prism.css";
import * as CN from "./constants/classNames.json";

import Prism from "prismjs";
import createParsers from "./lib/PrismExtend";
createParsers(Prism);

import EventEmitter from "./lib/EventEmitter";
import ActionCreator from "./lib/ActionCreator";
import Importer from "./lib/Importer";
import Exporter from "./lib/Exporter";

import Modal from "./components/Modal";
import ColorPicker from "./components/ColorPicker";
import Palette from "./components/Palette";
import Input from "./components/Input";
import Collapsible from "./components/Collapsible";

const componentSelectors = {
	[CN.MODAL]: Modal,
	[CN.INPUT]: Input,
	[CN.COLLAPSIBLE]: Collapsible,
	[CN.PALETTE]: Palette,
	[CN.COLORPICKER]: ColorPicker,
};

document.addEventListener("DOMContentLoaded", () => {
	const eventEmitter = new EventEmitter();
	const actionCreator = new ActionCreator(
		document.querySelector("body"),
		eventEmitter
	);
	/** Generate components */
	let components = Object.keys(componentSelectors).map((sel) => {
		const elements = document.getElementsByClassName(sel);
		return [...elements].map(
			(el) => new componentSelectors[sel](el, eventEmitter)
		);
	});
	/** Activate import and export functionality */
	const importer = new Importer(eventEmitter, Prism);
	const exporter = new Exporter(eventEmitter);
});
