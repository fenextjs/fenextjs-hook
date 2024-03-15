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
exports.useCountryStateCity = exports.useCSC = exports.loadCitysByStateAndCountry = exports.loadStatesByCountry = void 0;
const index_1 = require("country-state-city-nextjs/cjs/index");
const react_1 = require("react");
const useData_1 = require("./useData");
const loadStatesByCountry = async (country) => {
    const { states } = await Promise.resolve(`${`${(0, index_1.getRuteStatesByCountry)(country)}`}`).then(s => __importStar(require(s)));
    return states;
};
exports.loadStatesByCountry = loadStatesByCountry;
const loadCitysByStateAndCountry = async (country, state) => {
    const { citys } = await Promise.resolve(`${`${(0, index_1.getRuteCitysByStateAndCountry)(country, state)}`}`).then(s => __importStar(require(s)));
    return citys;
};
exports.loadCitysByStateAndCountry = loadCitysByStateAndCountry;
/**
 * Hook that provides a CSC (Country, State, City) selector functionality.
 *
 * @param {Object} useCSCProps - Object containing optional `defaultValue` prop.
 * @param {Object} useCSCProps.defaultValue - Optional object containing default CSC values.
 * @param {Object} CSCProps - Object containing optional `country`, `state`, and `city` props.
 * @param {Object} CSCProps.country - Optional object containing country data.
 * @param {Object} CSCProps.state - Optional object containing state data.
 * @param {Object} CSCProps.city - Optional object containing city data.
 *
 * @returns {Object} An object with the following properties:
 * @returns {Boolean} load - Indicates whether the CSC data has been loaded.
 * @returns {Array} countrys - Array containing all loaded country objects.
 * @returns {Array} states - Array containing all loaded state objects.
 * @returns {Array} citys - Array containing all loaded city objects.
 * @returns {Function} onChangeCSC - Function to update the CSC data.
 * @returns {Object} value - Object containing the currently selected CSC data.
 * @returns {Array} statesForCountrySelected - Array containing all loaded state objects that belong to the currently selected country.
 * @returns {Array} citysForStateSelected - Array containing all loaded city objects that belong to the currently selected state.
 */
const useCSC = ({ defaultValue = {}, onChange, ifLoadImgCountry = false, }) => {
    /**
     * An array of countries loaded by the hook.
     */
    const [countrys, setCountrys] = (0, react_1.useState)([]);
    /**
     * An array of states loaded by the hook.
     */
    const [states, setStates] = (0, react_1.useState)([]);
    /**
     * An array of cities loaded by the hook.
     */
    const [citys, setCitys] = (0, react_1.useState)([]);
    const onLoadCountrys = async () => {
        const countrys = await (ifLoadImgCountry ? index_1.loadCountrysWidthImg : index_1.loadCountrys)();
        setCountrys(countrys);
        if (defaultValue?.country) {
            await onLoadStates(defaultValue?.country);
            if (defaultValue?.state) {
                await onLoadCitys(defaultValue?.country, defaultValue?.state);
            }
        }
    };
    const onLoadStates = async (country) => {
        setStates([]);
        setCitys([]);
        if (country) {
            const states = await (0, exports.loadStatesByCountry)(country);
            setStates(states);
        }
    };
    const onLoadCitys = async (country, state) => {
        setCitys([]);
        if (country && state) {
            const citys = await (0, exports.loadCitysByStateAndCountry)(country, state);
            setCitys(citys);
        }
    };
    /**
     * A memoized version of the `value` property returned by the `useData` hook.
     * The `onChangeData` function returned by the `useData` hook is used to
     * convert the input CSC data to the correct format.
     */
    const { data: value, onConcatData, setDataFunction, } = (0, useData_1.useData)(defaultValue, {
        onChangeDataAfter: onChange,
    });
    const onChangeCSC = (id) => (value) => {
        if (id == "country") {
            onConcatData({
                country: value,
                state: undefined,
                city: undefined,
            });
            onLoadStates(value);
        }
        if (id == "state") {
            setDataFunction((old) => {
                if (old?.country) {
                    onLoadCitys(old?.country, value);
                    return {
                        ...old,
                        state: value,
                        city: undefined,
                    };
                }
                return old;
            });
        }
        if (id == "city") {
            setDataFunction((old) => {
                if (old?.country && old?.state) {
                    return {
                        ...old,
                        city: value,
                    };
                }
                return old;
            });
        }
    };
    /**
     * Loads the countries, states and cities asynchronously.
     */
    (0, react_1.useEffect)(() => {
        onLoadCountrys();
    }, []);
    return {
        countrys,
        states,
        citys,
        onChangeCSC,
        value,
    };
};
exports.useCSC = useCSC;
exports.useCountryStateCity = exports.useCSC;
//# sourceMappingURL=useCSC.js.map