import { countryProps as CountryProps, stateProps as StateProps, cityProps as CityProps } from "country-state-city-nextjs/cjs/index";
import { CSCProps } from "fenextjs-interface/cjs/CSC";
export declare const loadStatesByCountry: (country: {
    text: string;
    id: number;
}) => Promise<StateProps[]>;
export declare const loadCitysByStateAndCountry: (country: {
    text: string;
    id: number;
}, state: {
    text: string;
    id: number;
}) => Promise<CityProps[]>;
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
export declare const useCSC: ({ defaultValue, onChange, ifLoadImgCountry, }: useCSCProps) => {
    countrys: CountryProps[];
    states: StateProps[];
    citys: CityProps[];
    onChangeCSC: (id: keyof CSCProps) => (value: CountryProps | StateProps | CityProps | undefined) => void;
    value: CSCProps;
};
export declare const useCountryStateCity: ({ defaultValue, onChange, ifLoadImgCountry, }: useCSCProps) => {
    countrys: CountryProps[];
    states: StateProps[];
    citys: CityProps[];
    onChangeCSC: (id: keyof CSCProps) => (value: CountryProps | StateProps | CityProps | undefined) => void;
    value: CSCProps;
};
