"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const polkadot_json_1 = __importDefault(require("../polkadot/target/ink/polkadot.json"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    let functions = [];
    for (let message of polkadot_json_1.default.spec.messages) {
        functions.push({
            name: message.label,
            selector: message.selector,
            args: message.args,
            returnType: message.returnType,
        });
    }
    res.json({
        functions,
    });
});
exports.default = router;
