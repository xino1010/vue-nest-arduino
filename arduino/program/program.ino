#include <ArduinoJson.h>
#include "DHT.h"

#define DHTPIN 2
#define LED 3
#define WATER_SENSOR A0
#define HIGROMETER_SENSOR A1
#define DHTTYPE DHT22
#define BAUDRATE 115200
#define INTERVAL_DHT 2000
#define INTERVAL_WATER_LEVEL 1000
#define MAX_VALUE_WATER_LEVEL 625
#define INTERVAL_HIGROMETER 1000
#define MAX_VALUE_HIGROMETER 1023

bool light = false;
DHT dht(DHTPIN, DHTTYPE);
float h = 0;
float t = 0;
float waterLevel = 0;
float higrometer = 0;
unsigned long lastDhtRead;
unsigned long lastWaterLevelRead;
unsigned long lastHigrometerRead;

void setup() {
  Serial.begin(BAUDRATE);
  while (!Serial) {
    continue;
  }
  pinMode(LED, OUTPUT);
  digitalWrite(LED, light);
  dht.begin();
  lastDhtRead = millis();
  lastWaterLevelRead = millis();
  lastHigrometerRead = millis();
}

void loop() {
  // Wait a few seconds between measurements.
  delay(500);

  if (Serial.available() > 0) {
    DynamicJsonBuffer dynamicJsonBuffer(200);
    String userEntry = Serial.readString();
    JsonObject& json = dynamicJsonBuffer.parseObject(userEntry);
    if (!json.success()) {
      JsonObject& errorJson = dynamicJsonBuffer.createObject();
      errorJson["error"] = true;
      errorJson["message"] = "Failed to parse Serial data";
      imprimeJson(errorJson);
      dynamicJsonBuffer.clear();
      while (1) {};
    }
    if (json["action"] == "light") {
      light = !light;
      digitalWrite(LED, light);
    }
    dynamicJsonBuffer.clear();
  }

  readDht();
  readWaterLevel();
  readHigrometer();
  float higrometer = 0;

  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& json = jsonBuffer.createObject();
  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)) {
    json["error"] = true;
    json["message"] = "Failed to read from DHT sensor!";
    return;
  }

  json["error"] = false;
  JsonObject& data = json.createNestedObject("data");
  data["humidity"] = h;
  data["temperature"] = t;
  data["light"] = light;
  data["higrometer"] = higrometer;
  data["waterLevel"] = waterLevel;
  
  imprimeJson(json);
  jsonBuffer.clear();
}

void imprimeJson(JsonObject& root) {
  int len = root.measureLength() + 1;
  char rootstr[len];
  root.printTo(rootstr, len);
  Serial.println(rootstr);
}

void readDht() {
  if (millis() - lastDhtRead >= INTERVAL_DHT) {
    h = dht.readHumidity();
    t = dht.readTemperature(); 
    lastDhtRead = millis();
  }
}

void readWaterLevel() {
  if (millis() - lastWaterLevelRead >= INTERVAL_WATER_LEVEL) {
    float value = analogRead(WATER_SENSOR);
    if (value > MAX_VALUE_WATER_LEVEL) {
      value = MAX_VALUE_WATER_LEVEL;    
    }
    waterLevel = (value * 100) / (float) MAX_VALUE_WATER_LEVEL;
    lastWaterLevelRead = millis();
  }
}

void readHigrometer() {
  if (millis() - lastHigrometerRead >= INTERVAL_HIGROMETER) {
    float value = analogRead(HIGROMETER_SENSOR);
    higrometer = (value * 100) / (float) MAX_VALUE_HIGROMETER;
    lastHigrometerRead = millis();
  }
}
