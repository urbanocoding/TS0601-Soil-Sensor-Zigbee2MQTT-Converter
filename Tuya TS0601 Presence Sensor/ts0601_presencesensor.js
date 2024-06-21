const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require('zigbee-herdsman-converters/lib/tuya');

const definition = {
    // Since a lot of TuYa devices use the same modelID, but use different datapoints
    // it's necessary to provide a fingerprint instead of a zigbeeModel
    fingerprint: [
        {
            // The model ID from: Device with modelID 'TS0601' is not supported
            // You may need to add \u0000 at the end of the name in some cases
            modelID: 'TS0601',
            // The manufacturer name from: Device with modelID 'TS0601' is not supported.
            manufacturerName: '_TZE204_7gclukjs',
        },
    ],
    model: 'TS0601',
    vendor: 'TuYa',
    description: 'RadarTuya',
    fromZigbee: [tuya.fz.datapoints],
    toZigbee: [tuya.tz.datapoints],
    onEvent: tuya.onEventSetTime, // Add this if you are getting no converter for 'commandMcuSyncTime'
    configure: tuya.configureMagicPacket,
        fromZigbee: [tuya.fz.datapoints],
        toZigbee: [tuya.tz.datapoints],
        exposes: [
                                e.enum('state', ea.STATE, ['none', 'Presence', 'Move and presence']).withDescription('state of taget'),
                                e.presence(),
                                exposes.numeric('illuminance_lux', ea.STATE).withDescription('Illuminance').withUnit('lux'),
                                exposes.numeric('current_distance', ea.STATE).withDescription('Distance to target').withUnit('cm'),
                                exposes.numeric('delay', ea.STATE_SET).withValueMin(0).withValueMax(600).withValueStep(1).withDescription('Delay time').withUnit('s'),
                                exposes.numeric('minimum_range', ea.STATE_SET).withValueMin(0).withValueMax(825).withValueStep(75).withDescription('Near Detection').withUnit('cm'),
                                exposes.numeric('maximum_range', ea.STATE_SET).withValueMin(75).withValueMax(900).withValueStep(75).withDescription('Far Detection').withUnit('cm'),
                                exposes.numeric('motion_sensitivity', ea.STATE_SET).withDescription('Motion Sensitivity').withValueMin(0).withValueMax(10).withValueStep(1).withDescription('Motion Sensitivity'),
        ],
        meta: {
            tuyaDatapoints: [
                                [104, 'presence', tuya.valueConverter.trueFalse1],
                                [1, 'state', tuya.valueConverterBasic.lookup({'none': 0, 'Presence': 1, 'Move and presence': 2})],
                                [103, 'illuminance_lux', tuya.valueConverter.raw],
                                [9, 'current_distance', tuya.valueConverter.raw],
                                [105, 'delay', tuya.valueConverter.raw],
                [3, 'minimum_range', tuya.valueConverter.raw],
                [4, 'maximum_range', tuya.valueConverter.raw],
                [2, 'motion_sensitivity', tuya.valueConverter.raw],

            ],
    },
};

module.exports = definition;
~                                   