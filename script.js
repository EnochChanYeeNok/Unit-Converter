const units = {
    Length: {
        units: {
            'Meters': 1,
            'Kilometers': 0.001,
            'Centimeters': 100,
            'Millimeters': 1000,
            'Miles': 0.000621371,
            'Yards': 1.09361,
            'Feet': 3.28084,
            'Inches': 39.3701,
            'Nautical Miles': 0.000539957,
        }
    },
    Mass: {
        units: {
            'Kilograms': 1,
            'Grams': 1000,
            'Milligrams': 1e+6,
            'Metric Tons': 0.001,
            'Long Tons': 0.000984207,
            'Short Tons': 0.00110231,
            'Pounds': 2.20462,
            'Ounces': 35.274,
        }
    },
    Temperature: {
        units: {
            'Celsius': 'celsius',
            'Fahrenheit': 'fahrenheit',
            'Kelvin': 'kelvin',
        }
    },
    Volume: {
        units: {
            'Liters': 1,
            'Milliliters': 1000,
            'Cubic Meters': 0.001,
            'Cubic Centimeters': 1000,
            'Cubic Inches': 61.0237,
            'Cubic Feet': 0.0353147,
            'Imperial Gallons': 0.219969,
            'US Gallons': 0.264172,
            'Imperial Pints': 1.75975,
            'US Pints': 2.11338,
        }
    },
    Area: {
        units: {
            'Square Meters': 1,
            'Square Kilometers': 0.000001,
            'Square Miles': 3.861e-7,
            'Square Yards': 1.19599,
            'Square Feet': 10.7639,
            'Square Inches': 1550,
            'Hectares': 0.0001,
            'Acres': 0.000247105,
        }
    },
    Speed: {
        units: {
            'Meters/Second': 1,
            'Kilometers/Hour': 3.6,
            'Miles/Hour': 2.23694,
            'Feet/Second': 3.28084,
            'Knots': 1.94384,
        }
    },
    Time: {
        units: {
            'Seconds': 1,
            'Minutes': 1 / 60,
            'Hours': 1 / 3600,
            'Days': 1 / 86400,
            'Weeks': 1 / 604800,
            'Months': 1 / 2.628e+6,
            'Years': 1 / 3.154e+7,
        }
    },
    Data: {
        units: {
            'Bits': 1,
            'Kilobits': 0.001,
            'Kibibits': 0.000976563,
            'Megabits': 1e-6,
            'Mebibits': 9.5367e-7,
            'Gigabits': 1e-9,
            'Gibibits': 9.3132e-10,
            'Bytes': 0.125,
            'Kilobytes': 0.000125,
            'Kibibytes': 0.00012207,
            'Megabytes': 1.25e-7,
            'Mebibytes': 1.1921e-7,
            'Gigabytes': 1.25e-10,
            'Gibibytes': 1.1642e-10,
        }
    },
    Energy: {
        units: {
            'Joules': 1,
            'Kilojoules': 0.001,
            'Gram calories': 0.239006,
            'Kilocalories': 0.000239006,
            'Watt Hours': 0.000277778,
            'Kilowatt Hours': 2.7778e-7,
            'Electronvolts': 6.242e+18,
            'British Thermal Units': 0.000947817,
        }
    },
    Pressure: {
        units: {
            'Pascals': 1,
            'Kilopascals': 0.001,
            'Bar': 1e-5,
            'PSI': 0.000145038,
            'Atmospheres': 9.86923e-6,
            'Torr': 0.00750062,
        }
    },
    Power: {
        units: {
            'Watts': 1,
            'Kilowatts': 0.001,
            'Horsepower': 0.00134102,
            'BTU/Minute': 0.056869,
            'Calories/Second': 0.238846,
        }
    },
    Frequency: {
        units: {
            'Hertz': 1,
            'Kilohertz': 0.001,
            'Megahertz': 1e-6,
            'Gigahertz': 1e-9,
        }
    },
    FuelEconomy: {
        units: {
            'Miles per Gallon (US)': 1,
            'Miles per Gallon (Imp)': 0.832674,
            'Kilometers per Liter': 0.425144,
            'Liters per 100 km': 235.215,
        }
    },
    Angle: {
        units: {
            'Degrees': 1,
            'Radians': 0.0174533,
            'Gradians': 1.11111,
            'Minutes of Arc': 60,
            'Seconds of Arc': 3600,
        }
    },
};

const inputUnit = document.getElementById('inputUnit');
const outputUnit = document.getElementById('outputUnit');

function populateUnits() {
    // Clear existing options
    inputUnit.innerHTML = '';
    outputUnit.innerHTML = '';

    // Add units grouped by category
    for (let category in units) {
        let group = document.createElement('optgroup');
        group.label = category;
        for (let unit in units[category].units) {
            let option = document.createElement('option');
            option.value = unit;
            option.textContent = unit;
            group.appendChild(option);
        }
        inputUnit.appendChild(group.cloneNode(true));
        outputUnit.appendChild(group.cloneNode(true));
    }
}

populateUnits();

function convert() {
    let fromUnit = inputUnit.value;
    let toUnit = outputUnit.value;
    let value = parseFloat(document.getElementById('inputValue').value);

    if (isNaN(value)) {
        alert('Please enter a valid number.');
        return;
    }

    let fromCategory, toCategory;

    // Find categories of selected units
    for (let category in units) {
        if (units[category].units[fromUnit]) {
            fromCategory = category;
        }
        if (units[category].units[toUnit]) {
            toCategory = category;
        }
    }

    if (fromCategory !== toCategory) {
        alert('Please select units from the same category.');
        return;
    }

    let result;

    if (fromCategory === 'Temperature') {
        result = convertTemperature(value, fromUnit, toUnit);
    } else {
        // Convert to base unit
        let baseValue = value / units[fromCategory].units[fromUnit];
        // Convert from base unit to target unit
        result = baseValue * units[fromCategory].units[toUnit];
    }

    document.getElementById('outputValue').value = result;
}

function convertTemperature(value, fromUnit, toUnit) {
    let celsius;

    // Convert from input unit to Celsius
    if (fromUnit === 'Celsius') {
        celsius = value;
    } else if (fromUnit === 'Fahrenheit') {
        celsius = (value - 32) * (5 / 9);
    } else if (fromUnit === 'Kelvin') {
        celsius = value - 273.15;
    }

    // Convert from Celsius to target unit
    if (toUnit === 'Celsius') {
        return celsius;
    } else if (toUnit === 'Fahrenheit') {
        return celsius * (9 / 5) + 32;
    } else if (toUnit === 'Kelvin') {
        return celsius + 273.15;
    }
}