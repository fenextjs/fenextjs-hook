import "module-alias/register";
import {
    loadCountrysWidthImg,
    loadCountrys,
    loadStates,
    loadCitys,
    countryProps as CountryProps,
    stateProps as StateProps,
    cityProps as CityProps,
} from "country-state-city-nextjs/cjs/index";
import { useEffect, useMemo, useState } from "react";
import { useData } from "@/useData";
import { CSCProps } from "fenextjs-interface/cjs/CSC";

/**
 * Represents the properties for the useCSC hook.
 */
export interface useCSCProps {
    /**
     * The default value for the CSC object.
     */
    defaultValue?: CSCProps;
    /**
     * The default value for the CSC object.
     */
    defaultValueString?: {
        [id in keyof CSCProps]: string;
    };

    /**
     * onChangeDataAfter value for the CSC object.
     */
    onChangeDataAfter?: (data: CSCProps) => void;
    /**
     * onChangeDataMemoAfter value for the CSC object.
     */
    onChangeDataMemoAfter?: (data: CSCProps) => void;
    /**
     * The ifLoadImgCountry.
     */
    ifLoadImgCountry?: boolean;
}
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
export const useCSC = ({
    defaultValue = {},
    defaultValueString = {},
    onChangeDataAfter,
    onChangeDataMemoAfter,
    ifLoadImgCountry = false,
}: useCSCProps) => {
    /**
     * Indicates whether the hook is currently loading data.
     */
    const [load, setLoad] = useState(false);
    /**
     * An array of countries loaded by the hook.
     */
    const [countrys, setCountrys] = useState<CountryProps[]>([]);
    /**
     * An array of states loaded by the hook.
     */
    const [states, setStates] = useState<StateProps[]>([]);
    /**
     * An array of cities loaded by the hook.
     */
    const [citys, setCitys] = useState<CityProps[]>([]);
    /**
     * A memoized version of the `value` property returned by the `useData` hook.
     * The `onChangeData` function returned by the `useData` hook is used to
     * convert the input CSC data to the correct format.
     */
    const {
        dataMemo: value,
        onChangeData: onChangeCSC,
        setData,
    } = useData<CSCProps, CSCProps>(defaultValue, {
        onMemo: (data: CSCProps) => {
            const country = data.country;
            const state =
                data.state?.id_country == country?.id ? data.state : undefined;
            const city =
                data.city?.id_state == state?.id ? data.city : undefined;
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
        let countrys: CountryProps[] = [];
        if (ifLoadImgCountry) {
            countrys = await loadCountrysWidthImg();
        } else {
            countrys = await loadCountrys();
        }
        const states: StateProps[] = await loadStates();
        const citys: CityProps[] = await loadCitys();
        setCountrys(countrys);
        setStates(states);
        setCitys(citys);

        if (defaultValueString?.country) {
            const countrysSelect = countrys?.find(
                (e) => e.text == defaultValueString?.country,
            );
            let statesSelect: StateProps | undefined = undefined;
            let citysSelect: CityProps | undefined = undefined;
            if (defaultValueString?.state && countrysSelect) {
                statesSelect = states?.find(
                    (e) =>
                        e?.id_country == countrysSelect?.id &&
                        e?.text == defaultValueString?.state,
                );
                if (defaultValueString?.city && statesSelect) {
                    citysSelect = citys?.find(
                        (e) =>
                            e?.id_state == statesSelect?.id &&
                            e?.text == defaultValueString?.city,
                    );
                }
            }
            setData(
                {
                    country: countrysSelect,
                    state: statesSelect,
                    city: citysSelect,
                },
                {
                    useOptionsOnChangeDataAfter: false,
                    useSetIsChange: false,
                },
            );
        }

        setLoad(true);
    };
    useEffect(() => {
        onLoad();
    }, []);

    /**
     * Returns an array of states that belong to the currently selected country.
     */
    const statesForCountrySelected = useMemo(() => {
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
    const citysForStateSelected = useMemo(() => {
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
export const useCountryStateCity = useCSC;
