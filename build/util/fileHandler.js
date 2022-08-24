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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var sharp_image_processing_1 = __importDefault(require("./sharp-image-processing"));
var fileHandler = /** @class */ (function () {
    function fileHandler() {
    }
    /**
      @param {imageparams} params
      @param {string} [params.filename]
      @param {number} [params.width]
      @param {number} [params.height]
      @return {null|string}
     */
    fileHandler.imagePath = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!params.filename) {
                            return [2 /*return*/, null];
                        }
                        filePath = params.width && params.height
                            ? path_1.default.resolve(fileHandler.imagesThumbsPath, "".concat(params.filename, "-").concat(params.width, "x").concat(params.height, ".jpg"))
                            : path_1.default.resolve(fileHandler.imagesOriginalPath, "".concat(params.filename, ".jpg"));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs_1.promises.access(filePath)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, filePath];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
      @param {string} [filename='']
      @return {boolean}
     */
    fileHandler.checkAvailableImages = function (filename) {
        if (filename === void 0) { filename = ' '; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!filename) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, fileHandler.getAvailableImages()];
                    case 1: return [2 /*return*/, (_a.sent()).includes(filename)];
                }
            });
        });
    };
    /**
     * @return {string[]}
     */
    fileHandler.getAvailableImages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.promises.readdir(fileHandler.imagesOriginalPath)];
                    case 1: return [2 /*return*/, (_b.sent()).map(function (filename) { return filename.split('.')[0]; })];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
      @param {imageparams} params
      @param {string} [params.filename]
      @param {number} [params.width]
      @param {number} [params.height]
      @return {boolean}
     */
    fileHandler.checkThumbAvailable = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!params.filename || !params.width || !params.height) {
                            return [2 /*return*/, false];
                        }
                        filePath = path_1.default.resolve(fileHandler.imagesThumbsPath, "".concat(params.filename, "-").concat(params.width, "x").concat(params.height, ".jpg"));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs_1.promises.access(filePath)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    fileHandler.createImagePath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.promises.access(fileHandler.imagesThumbsPath)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        fs_1.promises.mkdir(fileHandler.imagesThumbsPath);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
      @param {imageparams} params
      @param {string} [params.filename]
      @param {string} [params.width]
      @param {string} [params.height]
      @return {null|string}
     */
    fileHandler.createImage = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var fullImagePath, thumbImagePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!params.filename || !params.width || !params.height) {
                            return [2 /*return*/, null];
                        }
                        fullImagePath = path_1.default.resolve(fileHandler.imagesOriginalPath, "".concat(params.filename, ".jpg"));
                        thumbImagePath = path_1.default.resolve(fileHandler.imagesThumbsPath, "".concat(params.filename, "-").concat(params.width, "x").concat(params.height, ".jpg"));
                        console.log("creating new thumb now ".concat(thumbImagePath));
                        return [4 /*yield*/, (0, sharp_image_processing_1.default)({
                                imagePath: fullImagePath,
                                target: thumbImagePath,
                                width: parseInt(params.width),
                                height: parseInt(params.height)
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    fileHandler.imagesOriginalPath = path_1.default.resolve(__dirname, '../../assets/original');
    fileHandler.imagesThumbsPath = path_1.default.resolve(__dirname, '../../assets/thumbs');
    return fileHandler;
}());
exports.default = fileHandler;
