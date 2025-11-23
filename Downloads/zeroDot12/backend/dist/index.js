"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const codeGeneration_1 = __importDefault(require("./routes/codeGeneration"));
const polkadot_1 = __importDefault(require("./routes/polkadot"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Replace with your frontend URL
    credentials: true,
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/api/generate', codeGeneration_1.default);
app.use('/api/polkadot', polkadot_1.default);
app.listen(8000, () => {
    console.log('Server running on port 8000');
});
