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
exports.uploadBlob = uploadBlob;
exports.downloadBlob = downloadBlob;
const axios_1 = __importDefault(require("axios"));
const ADDRESS = '127.0.0.1:31415';
const EPOCHS = '5';
/**
 * Helper function to upload a blob to the Walrus service
 */
function uploadBlob(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storeUrl = `http://${ADDRESS}/v1/store?epochs=${EPOCHS}`;
            const response = yield axios_1.default.put(storeUrl, data);
            if (response.status !== 200) {
                throw new Error(`Failed to upload blob: ${response.statusText}`);
            }
            const blobId = response.data.newlyCreated.blobObject.blobId;
            return blobId;
        }
        catch (error) {
            throw new Error(`Error uploading blob: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    });
}
/**
 * Helper function to download a blob from the Walrus service
 */
function downloadBlob(blobId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const readUrl = `http://${ADDRESS}/v1/${blobId}`;
            const response = yield axios_1.default.get(readUrl, {
                responseType: 'arraybuffer'
            });
            if (response.status !== 200) {
                throw new Error(`Failed to download blob: ${response.statusText}`);
            }
            return Buffer.from(response.data);
        }
        catch (error) {
            throw new Error(`Error downloading blob: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    });
}
