"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileInkFile = exports.writeInkFile = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const writeInkFile = (code) => __awaiter(void 0, void 0, void 0, function* () {
    let inkFile = path_1.default.join(__dirname, "polkadot", "lib.rs");
    yield promises_1.default.writeFile(inkFile, code);
});
exports.writeInkFile = writeInkFile;
const compileInkFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const { exec } = require('child_process');
    return new Promise((resolve, reject) => {
        exec('pop build', { cwd: path_1.default.join(__dirname, 'polkadot') }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
});
exports.compileInkFile = compileInkFile;
