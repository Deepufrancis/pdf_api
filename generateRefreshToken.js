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
const googleapis_1 = require("googleapis");
const readline_1 = __importDefault(require("readline"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const oAuth2Client = new googleapis_1.google.auth.OAuth2("91647960545-6eqkjhunti8sv8un85773dpo2aktqob6.apps.googleusercontent.com", "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");
const SCOPES = ["https://mail.google.com/"];
const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
});
console.log("Visit this URL in your browser:\n", authUrl);
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question("Enter the code from the page here: ", (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tokens } = yield oAuth2Client.getToken(code);
        console.log("Refresh Token (save this in your .env):", tokens.refresh_token);
    }
    catch (err) {
        console.error("Error retrieving access token", err);
    }
    finally {
        rl.close();
    }
}));
