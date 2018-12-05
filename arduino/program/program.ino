#include <ArduinoJson.h>
#include "DHT.h"

#define DHTPIN 2
#define LED 3
#define DHTTYPE DHT22
#define BAUDRATE 115200
#define INTERVAL_DHT 2000

DHT dht(DHTPIN, DHTTYPE);
float h = 0;
float t = 0;
float higrometer = 0;
bool light = false;
unsigned long lastDhtRead;

void setup() {
  Serial.begin(BAUDRATE);
  while (!Serial) {
    continue;
  }
  pinMode(LED, OUTPUT);
  digitalWrite(LED, light);
  dht.begin();
  lastDhtRead = millis();
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
