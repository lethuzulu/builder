export const find_in_array = (array, year, income_quantile) => {
    const item = array.find((element) => {
        if (element.year === year && element.income_quantile === income_quantile) {
            return true;
        } else {
            return false;
        }
    });
    return item;
}

export const update_population = (hh_data,) => {
    const pop_growth_implemented = hh_data.map((row) => {
        if (row.year === 2011) {
            row.population = row.ave_hh_size * row.no_of_households
            return row;
        } else {
            var index_new = hh_data.filter(function (n_index) {
                return n_index.year === row.year - 1 && n_index.income_quantile === row.income_quantile;
            });

            row.population = index_new[0].population * ((100 + index_new[0].population_growth) / 100);
            row.no_of_households = row.population / row.ave_hh_size;
            return row;
        }
    })

    return pop_growth_implemented;
}

export const update_income_quantiles = (pop_growth_implemented) => {
    let elf = 0;
    let tw = 0;
    let de = 0;
    let ve = 0;
    let vy = 0;
    let se = 0;
    let sw = 0;
    let ag = 0;
    let ne = 0;
    let twi = 0;
    let et = 0;
    let tt = 0;
    let dt = 0;
    let vt = 0;
    let vyt = 0;
    let set = 0;
    let swt = 0;
    let agt = 0;
    let nt = 0;
    let der = 0;
    let eder = 0;
    let tder = 0;
    let dder = 0;
    let veder = 0;
    let vyder = 0;
    let seder = 0;
    let swder = 0;
    let agder = 0;
    let neder = 0;
    let ver = 0;
    let ever = 0;
    let tver = 0;
    let dver = 0;
    let vver = 0;
    let vyver = 0;

    let economic_growth_implemented = pop_growth_implemented.map((row, index) => {
        var index_new = pop_growth_implemented.filter(function (n_index) {
            return n_index.year === 2011 && n_index.income_quantile === row.income_quantile;
        });
        row.inc_req =
            index_new[0].ave_income_for_quantile * row.no_of_households;
        if (row.year === 2011) {
            elf = elf + row.inc_req;
        }
        if (row.year === 2012) {
            tw = tw + row.inc_req;
        }
        if (row.year === 2013) {
            de = de + row.inc_req;
        }
        if (row.year === 2014) {
            ve = ve + row.inc_req;
        }
        if (row.year === 2015) {
            vy = vy + row.inc_req;
        }
        if (row.year === 2016) {
            se = se + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2017) {
            sw = sw + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2018) {
            ag = ag + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2019) {
            ne = ne + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2020) {
            twi = twi + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2021) {
            et = et + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2022) {
            tt = tt + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2023) {
            dt = dt + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2024) {
            vt = vt + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2025) {
            vyt = vyt + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2026) {
            set = set + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2027) {
            swt = swt + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2028) {
            agt = agt + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2029) {
            nt = nt + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2030) {
            der = der + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2031) {
            eder = eder + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2032) {
            tder = tder + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2033) {
            dder = dder + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2034) {
            veder = veder + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2035) {
            vyder = vyder + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2036) {
            seder = seder + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2037) {
            swder = swder + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2038) {
            agder = agder + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2039) {
            neder = neder + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2040) {
            ver = ver + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2041) {
            ever = ever + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2042) {
            tver = tver + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2043) {
            dver = dver + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2044) {
            vver = vver + pop_growth_implemented[index].inc_req;
        }
        if (row.year === 2045) {
            vyver = vyver + pop_growth_implemented[index].inc_req;
        }
        return row;
    });

    economic_growth_implemented = economic_growth_implemented.map(
        (row) => {
            if (row.year === 2011) {
                row.inc_req_total_year = elf;
            }
            if (row.year === 2012) {
                row.inc_req_total_year = tw;
            }
            if (row.year === 2013) {
                row.inc_req_total_year = de;
            }
            if (row.year === 2014) {
                row.inc_req_total_year = ve;
            }
            if (row.year === 2015) {
                row.inc_req_total_year = vy;
            }
            if (row.year === 2016) {
                row.inc_req_total_year = se;
            }
            if (row.year === 2017) {
                row.inc_req_total_year = sw;
            }
            if (row.year === 2018) {
                row.inc_req_total_year = ag;
            }
            if (row.year === 2019) {
                row.inc_req_total_year = ne;
            }
            if (row.year === 2020) {
                row.inc_req_total_year = twi;
            }
            if (row.year === 2021) {
                row.inc_req_total_year = et;
            }
            if (row.year === 2022) {
                row.inc_req_total_year = tt;
            }
            if (row.year === 2023) {
                row.inc_req_total_year = dt;
            }
            if (row.year === 2024) {
                row.inc_req_total_year = vt;
            }
            if (row.year === 2025) {
                row.inc_req_total_year = vyt;
            }
            if (row.year === 2026) {
                row.inc_req_total_year = set;
            }
            if (row.year === 2027) {
                row.inc_req_total_year = swt;
            }
            if (row.year === 2028) {
                row.inc_req_total_year = agt;
            }
            if (row.year === 2029) {
                row.inc_req_total_year = nt;
            }
            if (row.year === 2030) {
                row.inc_req_total_year = der;
            }
            if (row.year === 2031) {
                row.inc_req_total_year = eder;
            }
            if (row.year === 2032) {
                row.inc_req_total_year = tder;
            }
            if (row.year === 2033) {
                row.inc_req_total_year = dder;
            }
            if (row.year === 2034) {
                row.inc_req_total_year = veder;
            }
            if (row.year === 2035) {
                row.inc_req_total_year = vyder;
            }
            if (row.year === 2036) {
                row.inc_req_total_year = seder;
            }
            if (row.year === 2037) {
                row.inc_req_total_year = swder;
            }
            if (row.year === 2038) {
                row.inc_req_total_year = agder;
            }
            if (row.year === 2039) {
                row.inc_req_total_year = neder;
            }
            if (row.year === 2040) {
                row.inc_req_total_year = ver;
            }
            if (row.year === 2041) {
                row.inc_req_total_year = ever;
            }
            if (row.year === 2042) {
                row.inc_req_total_year = tver;
            }
            if (row.year === 2043) {
                row.inc_req_total_year = dver;
            }
            if (row.year === 2044) {
                row.inc_req_total_year = vver;
            }
            if (row.year === 2045) {
                row.inc_req_total_year = vyver;
            }
            return row;
        }
    );

    economic_growth_implemented = economic_growth_implemented.map(
        (row) => {
            var index_new = economic_growth_implemented.filter(function (n_index) {
                return n_index.year === row.year - 1 && n_index.income_quantile === row.income_quantile;
            });
            if (row.year === 2011) {
                row.inc_available = row.inc_req_total_year;
            } else
                row.inc_available = index_new[0].inc_available * ((100 + index_new[0].economic_growth) / 100);
            return row;
        }
    );

    economic_growth_implemented = economic_growth_implemented.map(
        (row) => {
            var index_new = pop_growth_implemented.filter(function (n_index) {
                return n_index.year === 2011 && n_index.income_quantile === row.income_quantile;
            });
            row.surplus_deficit =
                row.inc_available -
                row.inc_req_total_year;
            row.surplus_dist =
                row.surplus_deficit *
                index_new[0].breakdown;
            if (row.income_quantile === 0) {
                row.const_up = 25800 - 4800;
                row.const_down = 0;
            }
            if (row.income_quantile === 1) {
                row.const_up = 75000 - 25800;
                row.const_down = 25800 - 4800;
            }
            if (row.income_quantile === 2) {
                row.const_up = 144000 - 75000;
                row.const_down = 75000 - 25800;
            }
            if (row.income_quantile === 3) {
                row.const_up = 243800 - 144000;
                row.const_down = 144000 - 75000;
            }
            if (row.income_quantile === 4) {
                row.const_up = 461000 - 243800;
                row.const_down = 243800 - 144000;
            }
            if (row.income_quantile === 5) {
                row.const_up = 1450000 - 461000;
                row.const_down = 461000 - 243800;
            }
            if (row.income_quantile === 6) {
                row.const_up = 0;
                row.const_down = 1450000 - 461000;
            }

            if (row.year === 2011) {
                row.hhs_up = 0;
            }
            if (row.year === 2011) {
                row.hhs_down = 0;
            }

            if (row.surplus_deficit > 0) {
                row.hhs_down = 0;
                if (row.income_quantile === 6) {
                    row.hhs_up = 0;
                } else {
                    row.hhs_up = row.surplus_dist / row.const_up;
                }
            }

            if (row.surplus_deficit < 0) {
                row.hhs_up = 0;
                if (row.income_quantile === 0) {
                    row.hhs_down = 0;
                } else {
                    row.hhs_down = row.surplus_dist * -1 / row.const_down;
                }
            }
            return row;
        }
    );

    economic_growth_implemented = economic_growth_implemented.map(
        (row) => {
            if (row.income_quantile === 0) {
                row.Net_impact =
                    find_in_array(
                        economic_growth_implemented,
                        row.year,
                        row.income_quantile + 1
                    ).hhs_down - row.hhs_up;

            }
            if (row.income_quantile === 6) {
                row.Net_impact =
                    find_in_array(
                        economic_growth_implemented,
                        row.year,
                        row.income_quantile - 1
                    ).hhs_up - row.hhs_down;
            }
            if (row.income_quantile === 1) {
                row.Net_impact =
                    find_in_array(
                        economic_growth_implemented,
                        row.year,
                        row.income_quantile - 1
                    ).hhs_up -
                    row.hhs_up +
                    find_in_array(
                        economic_growth_implemented,
                        row.year,
                        row.income_quantile + 1
                    ).hhs_down -
                    row.hhs_down;
            }
            if (row.income_quantile === 2) {
                row.Net_impact =
                    find_in_array(
                        economic_growth_implemented,
                        row.year,
                        row.income_quantile - 1
                    ).hhs_up -
                    row.hhs_up +
                    find_in_array(
                        economic_growth_implemented,
                        row.year,
                        row.income_quantile + 1
                    ).hhs_down -
                    row.hhs_down;
            }
            if (row.income_quantile === 3) {
                row.Net_impact =
                    find_in_array(
                        economic_growth_implemented,
                        row.year,
                        row.income_quantile - 1
                    ).hhs_up -
                    row.hhs_up +
                    find_in_array(
                        economic_growth_implemented,
                        row.year,
                        row.income_quantile + 1
                    ).hhs_down -
                    row.hhs_down;
            }
            if (row.income_quantile === 4) {
                row.Net_impact =
                    find_in_array(
                        economic_growth_implemented,
                        row.year,
                        row.income_quantile - 1
                    ).hhs_up -
                    row.hhs_up +
                    find_in_array(
                        economic_growth_implemented,
                        row.year,
                        row.income_quantile + 1
                    ).hhs_down -
                    row.hhs_down;
            }
            if (row.income_quantile === 5) {
                row.Net_impact =
                    find_in_array(
                        economic_growth_implemented,
                        row.year,
                        row.income_quantile - 1
                    ).hhs_up -
                    row.hhs_up +
                    find_in_array(
                        economic_growth_implemented,
                        row.year,
                        row.income_quantile + 1
                    ).hhs_down -
                    row.hhs_down;
            }
            return row;
        }
    );

    economic_growth_implemented = economic_growth_implemented.map(
        (row) => {
            row.Final_no_of_hhs =
                row.no_of_households +
                row.Net_impact;
            return row;
        }
    );

    return economic_growth_implemented;
}

export const pop_race_split = (new_data, raceData) => {
    var raceDataset = []
    new_data.map((row, index) => {
        let basic_index = index * 4
        for (let i = 0; i < 4; i++) {
            const row_edit = JSON.parse(JSON.stringify(row))
            row_edit.race = i + 1
            row_edit.Final_no_of_hhs = raceData[basic_index + i].proportion * new_data[index].Final_no_of_hhs
            raceDataset.push(row_edit)
        }
        return row
    })
    return raceDataset;
}

