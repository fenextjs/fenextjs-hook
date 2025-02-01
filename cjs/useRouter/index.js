"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRouter = void 0;
const react_1 = require("react");
const fenextjs_functions_1 = require("fenextjs-functions");
const useWindowRouter_1 = require("../useWindowRouter");
const useRouter = () => {
    const [router, setRouter] = (0, react_1.useState)(null);
    const windowRouter = (0, useWindowRouter_1.useWindowRouter)();
    (0, react_1.useEffect)(() => {
        try {
            Promise.resolve().then(() => __importStar(require("next/router"))).then((module) => {
                setRouter(module?.useRouter);
            });
        }
        catch (e) {
            (0, fenextjs_functions_1.env_log)("Next.js router no disponible, usando window.location como fallback");
        }
    }, []);
    return router ?? windowRouter;
};
exports.useRouter = useRouter;
//# sourceMappingURL=index.js.map