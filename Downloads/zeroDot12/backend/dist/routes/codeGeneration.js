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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const xai_1 = require("@ai-sdk/xai");
const ai_1 = require("ai");
const zod_1 = require("zod");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
// Load knowledge base
function loadKnowledgeBase(language) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path_1.default.join(process.cwd(), `knowledge-base/${language}_contracts.json`);
        const data = yield promises_1.default.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    });
}
// Define the code generation tool
const codeGenerationTool = (language) => (0, ai_1.tool)({
    description: `A tool for generating ${language.toUpperCase()} smart contract code.`,
    parameters: zod_1.z.object({
        prompt: zod_1.z.string().describe('You are a highly specialized blockchain developer agent with comprehensive expertise in smart contract development using Ink (for Substrate/Polkadot ecosystem) and Move language (utilized in Sui and Aptos blockchains). Your core mission is to deliver sophisticated, secure, and efficient smart contract solutions that meet the most demanding technical requirements. Your technical capabilities span a deep understanding of WebAssembly compilation, intricate knowledge of blockchain-specific programming paradigms, and advanced skills in developing complex contracts with robust security considerations. When engaging with development projects, you will systematically analyze requirements, recommend the most appropriate blockchain platform, and architect solutions that prioritize scalability, gas efficiency, and code modularity. Your approach emphasizes clear communication of technical decisions, providing multiple implementation strategies, and offering comprehensive documentation that explains architectural choices and potential security implications. You possess advanced programming skills in both Ink and Move languages, understanding their unique type systems, resource-oriented programming models, and specific ecosystem constraints. Your workflow involves thorough requirement analysis, platform selection, contract architecture design, detailed implementation, rigorous security assessment, and meticulous documentation. Throughout the development process, you will prioritize code quality, security best practices, and elegant architectural design, ensuring that each smart contract solution is not just functional, but optimized for performance, security, and long-term maintainability. Your expertise covers the entire spectrum of smart contract development, from initial concept to final deployment, with a keen eye for technical precision and innovative problem-solving.'),
    }),
    execute: (_a) => __awaiter(void 0, [_a], void 0, function* ({ prompt }) {
        const knowledgeBase = yield loadKnowledgeBase(language);
        return { context: knowledgeBase, prompt };
    }),
});
//@ts-ignore
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    try {
        const { language, prompt, stream } = req.body;
        if (!language || !prompt) {
            return res.status(400).json({ error: 'Missing language or prompt' });
        }
        if (!['ink', 'move'].includes(language)) {
            return res.status(400).json({ error: 'Invalid language' });
        }
        const model = (0, xai_1.xai)('grok-beta');
        if (stream) {
            const knowledgeBase = yield loadKnowledgeBase(language);
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            const textStream = (0, ai_1.streamText)({
                model,
                maxSteps: 10,
                tools: {
                    generateCode: (0, ai_1.tool)({
                        description: `A tool for generating ${language.toUpperCase()} smart contract code.`,
                        parameters: zod_1.z.object({
                            prompt: zod_1.z.string().describe('You are a highly specialized blockchain developer agent with comprehensive expertise in smart contract development using Ink (for Substrate/Polkadot ecosystem) and Move language (utilized in Sui and Aptos blockchains). Your core mission is to deliver sophisticated, secure, and efficient smart contract solutions that meet the most demanding technical requirements. Your technical capabilities span a deep understanding of WebAssembly compilation, intricate knowledge of blockchain-specific programming paradigms, and advanced skills in developing complex contracts with robust security considerations. When engaging with development projects, you will systematically analyze requirements, recommend the most appropriate blockchain platform, and architect solutions that prioritize scalability, gas efficiency, and code modularity. Your approach emphasizes clear communication of technical decisions, providing multiple implementation strategies, and offering comprehensive documentation that explains architectural choices and potential security implications. You possess advanced programming skills in both Ink and Move languages, understanding their unique type systems, resource-oriented programming models, and specific ecosystem constraints. Your workflow involves thorough requirement analysis, platform selection, contract architecture design, detailed implementation, rigorous security assessment, and meticulous documentation. Throughout the development process, you will prioritize code quality, security best practices, and elegant architectural design, ensuring that each smart contract solution is not just functional, but optimized for performance, security, and long-term maintainability. Your expertise covers the entire spectrum of smart contract development, from initial concept to final deployment, with a keen eye for technical precision and innovative problem-solving.'),
                        }),
                        execute: (_a) => __awaiter(void 0, [_a], void 0, function* ({ prompt }) {
                            return { context: knowledgeBase, prompt };
                        }),
                    }),
                },
                system: `You are an expert ${language.toUpperCase()} smart contract developer. Generate code based on the provided knowledge base. Respond only once with the complete implementation.`,
                prompt: prompt,
            });
            try {
                for (var _d = true, _e = __asyncValues(textStream.textStream), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const chunk = _c;
                    res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            res.write('data: [DONE]\n\n');
            res.end();
        }
        else {
            const { text, steps } = yield (0, ai_1.generateText)({
                model,
                maxSteps: 10,
                tools: {
                    generateCode: codeGenerationTool(language),
                },
                system: `You are an expert ${language.toUpperCase()} smart contract developer. Use the provided knowledge base to generate accurate and efficient code.`,
                prompt: prompt,
                onStepFinish: ({ text, toolCalls, toolResults, finishReason, usage }) => {
                    console.log(`Step finished. Tokens used: ${usage === null || usage === void 0 ? void 0 : usage.totalTokens}`);
                },
            });
            res.json({ code: text, steps });
        }
    }
    catch (error) {
        console.error('Error generating code:', error);
        res.status(500).json({ error: 'Error generating code' });
    }
}));
exports.default = router;
