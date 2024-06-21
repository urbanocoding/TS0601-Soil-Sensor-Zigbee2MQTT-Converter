const exposes = require('zigbee-herdsman-converters/lib/exposes');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require('zigbee-herdsman-converters/lib/tuya');

const definition = {
    fingerprint: [
        {
            modelID: 'TS0601',
            manufacturerName: '_TZE284_g2e6cpnw',
        },
    ],
    model: 'TS0601',
    vendor: 'TuYa',
    description: 'Smart Soil Sensor',
    fromZigbee: [tuya.fz.datapoints],
    toZigbee: [tuya.tz.datapoints],
    onEvent: tuya.onEventSetTime,
    configure: tuya.configureMagicPacket,
    fromZigbee: [tuya.fz.datapoints],
    toZigbee: [tuya.tz.datapoints],
    exposes: [
        e.soil_moisture(),
        e.temperature(),
        exposes.numeric('temperature_farenheit', ea.STATE).withDescription('Temperature').withUnit('ºF'),
        tuya.exposes.batteryState(),   
        e.battery(),
    ],
    meta: {
        tuyaDatapoints: [
            [3, 'soil_moisture', tuya.valueConverter.raw],
            [5, 'temperature', tuya.valueConverter.divideBy10FromOnly],
            [110, 'temperature_farenheit', tuya.valueConverter.divideBy10FromOnly],
            [14, 'battery_state', tuya.valueConverter.batteryState],
            [15, 'battery', tuya.valueConverter.divideBy10]
        ],
    },
    whiteLabel: [
        tuya.whitelabel('Tuya', 'TS0601', 'Smart soil sensor', ['_TZE284_g2e6cpnw']),
    ],
};

module.exports = definition;