import {
    countryProps as CountryProps,
    stateProps as StateProps,
    cityProps as CityProps,
    getDataStatesByCountry,
    getDataCitysByStateAndCountry,
    getDataCountrys,
    getRuteCountryImg,
} from "country-state-city-nextjs";
import { useEffect, useState } from "react";
import { useData } from "./useData";
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
     * onChangeDataAfter value for the CSC object.
     */
    onChange?: (data: CSCProps) => void;
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
export const useCSC = ({ defaultValue = {}, onChange }: useCSCProps) => {
    /**
     * An array of countries loaded by the hook.
     */
    const [countrys, setCountrys] = useState<CountryProps[]>([]);
    const [loadCountrys, setLoadCountrys] = useState(false);
    /**
     * An array of states loaded by the hook.
     */
    const [states, setStates] = useState<StateProps[]>([]);
    const [loadStates, setLoadStates] = useState(false);
    /**
     * An array of cities loaded by the hook.
     */
    const [citys, setCitys] = useState<CityProps[]>([]);
    const [loadCitys, setLoadCitys] = useState(false);

    const onLoadCountrys = async () => {
        setLoadCountrys(false);
        const countrys: CountryProps[] = await getDataCountrys();

        setCountrys(
            countrys.map((e) => {
                return {
                    ...e,
                    img: `${getRuteCountryImg(e)}`,
                };
            }),
        );
        setLoadCountrys(true);
        if (defaultValue?.country) {
            await onLoadStates(defaultValue?.country);
            if (defaultValue?.state) {
                await onLoadCitys(defaultValue?.country, defaultValue?.state);
            }
        }
    };
    const onLoadStates = async (country?: { text: string; id: number }) => {
        setStates([]);
        setCitys([]);
        if (country) {
            setLoadStates(false);
            const states: StateProps[] = await getDataStatesByCountry(country);
            setStates(states);
        }
        setLoadStates(true);
    };
    const onLoadCitys = async (
        country?: { text: string; id: number },
        state?: {
            text: string;
            id: number;
        },
    ) => {
        setCitys([]);
        if (country && state) {
            setLoadCitys(false);
            const citys: CityProps[] = await getDataCitysByStateAndCountry(
                country,
                state,
            );
            setCitys(citys);
        }
        setLoadCitys(true);
    };

    /**
     * A memoized version of the `value` property returned by the `useData` hook.
     * The `onChangeData` function returned by the `useData` hook is used to
     * convert the input CSC data to the correct format.
     */
    const {
        data: value,
        onConcatData,
        setDataFunction,
    } = useData<CSCProps, CSCProps>(
        {
            ...defaultValue,
            ...(defaultValue?.country
                ? {
                      ...defaultValue?.country,
                      img: `${getRuteCountryImg(defaultValue?.country)}`,
                  }
                : {}),
        },
        {
            onChangeDataAfter: onChange,
        },
    );
    const onChangeCSC =
        (id: keyof CSCProps) =>
        (value: CountryProps | StateProps | CityProps | undefined) => {
            if (id == "country") {
                onConcatData({
                    country: value as CountryProps,
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
                            state: value as StateProps,
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
                            city: value as CityProps,
                        };
                    }
                    return old;
                });
            }
        };
    /**
     * Loads the countries, states and cities asynchronously.
     */
    useEffect(() => {
        onLoadCountrys();
    }, []);

    return {
        countrys,
        states,
        citys,
        onChangeCSC,
        value,
        loadCountrys,
        loadStates,
        loadCitys,
    };
};
export const useCountryStateCity = useCSC;
