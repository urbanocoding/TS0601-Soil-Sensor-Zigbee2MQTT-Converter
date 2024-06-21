# TS0601 SOIL SENSOR (_TZE284_g2e6cpnw manufacturer)
Tuya Smart Soil Sensor converter based on zigbee-herdsman-converters library for Zigbee2MQTT

![alt Tuya Smart Soil Sensor](https://github.com/urbanocoding/Zigbee2MQTT-Converters/blob/main/Tuya%20TS0601%20Soil%20Sensor/_TZE284_g2e6cpnw_soilsensor.jpg?raw=true)

## Notice

External converters are just temporal solutions while Zigbee2MQTT implements official support for devices. 

Once supported by the application, you are encouraged to remove this external converter.

## Install

- Download ts0601_soilsensor.js to Zigbee2MQTT converters directory (i.e. converters/ts0601_soilsensor.js)
  
- Edit configuration.yaml file and add the previous path as an external converter
```
external_converters:
  - converters/ts0601_soilsensor.js
```

- Reload zigbee2MQTT app