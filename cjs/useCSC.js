"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCountryStateCity = exports.useCSC = void 0;
const index_1 = require("country-state-city-nextjs/cjs/index");
const react_1 = require("react");
const useData_1 = require("./useData");
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
const useCSC = ({ defaultValue = {}, defaultValueString = {}, onChangeDataAfter, onChangeDataMemoAfter, ifLoadImgCountry = false, }) => {
    /**
     * Indicates whether the hook is currently loading data.
     */
    const [load, setLoad] = (0, react_1.useState)(false);
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
    /**
     * A memoized version of the `value` property returned by the `useData` hook.
     * The `onChangeData` function returned by the `useData` hook is used to
     * convert the input CSC data to the correct format.
     */
    const { dataMemo: value, onChangeData: onChangeCSC, setData, } = (0, useData_1.useData)(defaultValue, {
        onMemo: (data) => {
            const country = data.country;
            const state = data.state?.id_country == country?.id ? data.state : undefined;
            const city = data.city?.id_state == state?.id ? data.city : undefined;
            return {
                country,
                state: country ? state : undefined,
                city: state ? city : undefined,
            };
        },
        onChangeDataAfter,
        onChangeDataMemoAfter,
    });
    /**
     * Loads the countries, states and cities asynchronously.
     */
    const onLoad = async () => {
        let countrys = [];
        if (ifLoadImgCountry) {
            countrys = await (0, index_1.loadCountrysWidthImg)();
        }
        else {
            countrys = await (0, index_1.loadCountrys)();
        }
        const states = await (0, index_1.loadStates)();
        const citys = await (0, index_1.loadCitys)();
        setCountrys(countrys);
        setStates(states);
        setCitys(citys);
        if (defaultValueString?.country) {
            const countrysSelect = countrys?.find((e) => e.text == defaultValueString?.country);
            let statesSelect = undefined;
            let citysSelect = undefined;
            if (defaultValueString?.state && countrysSelect) {
                statesSelect = states?.find((e) => e?.id_country == countrysSelect?.id &&
                    e?.text == defaultValueString?.state);
                if (defaultValueString?.city && statesSelect) {
                    citysSelect = citys?.find((e) => e?.id_state == statesSelect?.id &&
                        e?.text == defaultValueString?.city);
                }
            }
            setData({
                country: countrysSelect,
                state: statesSelect,
                city: citysSelect,
            }, {
                useOptionsOnChangeDataAfter: false,
                useSetIsChange: false,
            });
        }
        setLoad(true);
    };
    (0, react_1.useEffect)(() => {
        onLoad();
    }, []);
    /**
     * Returns an array of states that belong to the currently selected country.
     */
    const statesForCountrySelected = (0, react_1.useMemo)(() => {
        if (!load) {
            return [];
        }
        if (value?.country == undefined) {
            return [];
        }
        return states.filter((s) => s.id_country == value?.country?.id);
    }, [load, value?.country]);
    /**
     * Returns an array of cities that belong to the currently selected state.
     */
    const citysForStateSelected = (0, react_1.useMemo)(() => {
        if (!load) {
            return [];
        }
        if (value?.state == undefined) {
            return [];
        }
        return citys.filter((c) => c.id_state == value?.state?.id);
    }, [load, value?.state]);
    return {
        load,
        countrys,
        states,
        citys,
        onChangeCSC,
        value,
        statesForCountrySelected,
        citysForStateSelected,
    };
};
exports.useCSC = useCSC;
exports.useCountryStateCity = exports.useCSC;
const useCSC = (props) => {
    const [countrys, setCountrys] = (0, react_1.useState)([]);
    const [states, setStates] = (0, react_1.useState)([]);
    const [citys, setCitys] = (0, react_1.useState)([]);
    const [countrySelected, setCountrySelected] = (0, react_1.useState)(props?.defaultCountry);
    const [stateSelected, setStateSelected] = (0, react_1.useState)(props?.defaultState);
    const [citySelected, setCitySelected] = (0, react_1.useState)(props?.defaultCity);
    const onLoadCountrys = async () => {
        const countrys = await (0, index_1.loadCountrys)();
        setCountrys(countrys);
        if (props?.defaultCountry) {
            await onLoadStates(props?.defaultCountry);
            if (props?.defaultState) {
                await onLoadCitys(props?.defaultCountry, props?.defaultState);
            }
        }
    };
    const onLoadStates = async (country) => {
        setStates([]);
        setCitys([]);
        const states = await loadStatesByCountry(country);
        setStates(states);
    };
    const onLoadCitys = async (country, state) => {
        setCitys([]);
        const citys = await loadCitysByStateAndCountry(country, state);
        setCitys(citys);
    };
    const onChangeCSC = {
        country: (country) => {
            setCountrySelected(country);
            setStateSelected(undefined);
            setCitySelected(undefined);
            if (country) {
                onLoadStates(country);
            }
        },
        state: (state) => {
            if (countrySelected == undefined) {
                return;
            }
            setStateSelected(state);
            setCitySelected(undefined);
            if (state) {
                onLoadCitys(countrySelected, state);
            }
        },
        city: (city) => {
            if (stateSelected == undefined) {
                return;
            }
            setCitySelected(city);
        },
    };
    (0, react_1.useEffect)(() => {
        onLoadCountrys();
    }, []);
    return {
        countrys,
        states,
        citys,
        countrySelected,
        stateSelected,
        citySelected,
        onChangeCSC,
    };
};
exports.useCSC = useCSC;
//# sourceMappingURL=useCSC.js.map