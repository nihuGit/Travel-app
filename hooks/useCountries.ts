import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  region: country.region,
  latlng: country.latlng,
  flag: country.flag,
}));

const useCountries: any = () => {
  const getAllCountries = () => formattedCountries;
  const getCountry = (value: string) =>
    formattedCountries.find((country) => country.label === value);
  return { getAllCountries, getCountry };
};

export default useCountries;
