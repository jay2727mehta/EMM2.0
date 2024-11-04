// const mqtt = require("mqtt");

// const brokerUrl = "mqtt://10.1.1.177:1883";
// const topic1 = "LED";
// const topic2 = "irrni";
// const testTopic="device"
// const responseTopic="meter"
// const username = "mqtt_user_iiot";
// const password = "Neilsoft@1";

// const mqttOptions = {
//   username,
//   password,
//   reconnectPeriod: 1000,
//   connectTimeout: 30 * 1000,
//   keepalive: 60,
// };

// const client = mqtt.connect(brokerUrl, mqttOptions);

// // MQTT event handlers
// const handleConnect = () => {
//   console.log("Connected to MQTT broker");
//   client.subscribe([topic1, topic2], (err) => {
//     if (err) {
//       console.error("Subscription error:", err);
//     } else {
//       console.log(`Subscribed to topics: ${[topic1, topic2].join(", ")}`);
//     }
//   });
// };

// const handleMessage = (receivedTopic, message) => {
//   const msg = message.toString();
//   console.log(`Message received on topic ${receivedTopic}: ${msg}`);

//   const actions = {
//     off: () => console.log('Received "off" message'),
//     got_data: () => console.log('Received "got_data" message'),
//     on: () => console.log('Received "on" message'),
//     running: () => console.log('Received "running" message'),
//   };

//   (actions[msg] || (() => console.log(`Unknown message: ${msg}`)))();
// };

// const handleError = (error) => {
//   console.error("MQTT Error:", error);
// };

// const handleClose = () => {
//   console.log("Disconnected from MQTT broker");
// };

// const handleReconnect = () => {
//   console.log("Attempting to reconnect to MQTT broker");
// };

// const handleOffline = () => {
//   console.log("MQTT client is offline");
// };

// const handleEnd = () => {
//   console.log("MQTT client has ended the connection");
// };

// const publishMessage = (topic, message) => {
//   if (client.connected) {
//     client.publish(topic, message, { qos: 1 }, (err) => {
//       if (err) {
//         console.error(`Publish error on topic ${topic}:`, err);
//       } else {
//         console.log(`Published message on topic ${topic}: ${message}`);
//       }
//     });
//   } else {
//     console.error("Cannot publish, MQTT client is not connected");
//   }
// };

// // Device control functions
// const turnOffLight = () => publishMessage(topic2, "turnofflt");
// const turnOnLight = () => publishMessage(topic2, "turnonlt");
// const turnOffLightCabin = () => publishMessage(topic1, "on");
// const turnOnLightCabin = () => publishMessage(topic1, "off");
// const turnOnAC = () => publishMessage(topic2, "turnon");
// const turnOffAC = () => publishMessage(topic2, "turnoff");
// const stopRobot = (data) => publishMessage(topic2, JSON.stringify(data));


// // MQTT connection event listeners
// client.on("connect", handleConnect);
// client.on("message", handleMessage);
// client.on("error", handleError);
// client.on("close", handleClose);
// client.on("reconnect", handleReconnect);
// client.on("offline", handleOffline);
// client.on("end", handleEnd);





// const testNodeConnection = () => {
//   return new Promise((resolve, reject) => {
//     // Publish the test message first
//     client.publish(testTopic, "test_message", { qos: 1 }, (err) => {
//       if (err) {
//         return reject(`Publish error: ${err}`);
//       }

//       // Subscribe to the response topic after publishing
//       client.subscribe(responseTopic, (err) => {
//         if (err) {
//           return reject(`Subscription error: ${err}`);
//         }

//         const timeout = setTimeout(() => {
//           client.unsubscribe(responseTopic);
//           resolve(false); // Resolve with false if no response is received within 5 seconds
//         }, 5000);

//         // Listen for a response on the response topic
//         client.on("message", (topic, message) => {
//           if (topic === responseTopic) {
//             clearTimeout(timeout);
//             client.unsubscribe(responseTopic);
//             resolve(true); // Resolve with true if the correct response is received
//           }
//         });
//       });
//     });
//   });
// };


// // Example usage of the testNodeConnection function
// const checkConnection = async () => {
//   try {
//     const isConnected = await testNodeConnection();
//     if (isConnected) {
//       console.log("MQTT node connection is active.");
//     } else {
//       console.log("MQTT node connection failed.");
//     }
//   } catch (error) {
//     console.error(`Error during connection test: ${error}`);
//   }
// };








// // Clean up on exit
// process.on("SIGINT", () => {
//   client.end(() => {
//     console.log("MQTT client disconnected on app termination");
//     process.exit(0);
//   });
// });

// module.exports = {
//   turnOffLight,
//   turnOnLight,
//   turnOffLightCabin,
//   turnOnLightCabin,
//   turnOnAC,
//   turnOffAC,
//   stopRobot,
//   checkConnection
// };
