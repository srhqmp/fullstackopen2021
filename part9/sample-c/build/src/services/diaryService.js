"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diaries_json_1 = __importDefault(require("../../data/diaries.json"));
const getEntries = () => {
    return diaries_json_1.default;
};
const addEntry = () => {
    return null;
};
exports.default = {
    getEntries,
    addEntry
};
