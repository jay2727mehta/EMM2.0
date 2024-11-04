// const { Client } = require('ssh2');

// // Configuration
// const remoteHost = '10.2.0.4'; // Replace with the hostname or IP address of the remote server
// const remotePort = 22; // SSH port (default is 22)
// const username = 'root@suryalog'; // Your username on the remote server
// const privateKeyPath = 'server/src/DL/solar/solarsshkey.txt'; // Path to your SSH private key file

// // Read the private key
// // const privateKey = require('fs').readFileSync(privateKeyPath);
// const privateKey='AAAAB3NzaC1yc2EAAAADAQABAAABAQCo+60RkeAc0DtAtgkA0vIKGCceb6Mnspkf3VK/QOhyCbAASKWYfgyCuTRz7X3NYXm6E9GKJ7VsE+OPWZB9P1xf6u7443axdQhLHXa+tatWhIVmst6wlLZdUsQEQRHf9D1CB3pNq8ZEa5RSakRHuYe0vI6XYgTRT+rhJ4zkBBdidnfGjw/jkgbrzP3sNYbaCm8uvup8Qanb3Et7Oy7Bnze2UE+ywViuEOmVpJQN5H9/fU5ggkUlKNsskjKonZ/NoQ1xjxnornxOvNDFK96Uoy3yceoLvQ8ycHK342L1cQfgxt0FPHxgtGf0CE2izc1OC/mczRrhJh7KcGOVg1R1UBS9'
// // Create SSH client
// const sshClient = new Client();

// sshClient.on('ready', () => {
//     console.log('SSH connection established');

//     // Execute command to fetch data
//     sshClient.exec('your_command_here', (err, stream) => {
//         if (err) {
//             console.error('Error executing command:', err);
//             sshClient.end();
//             return;
//         }

//         let data = '';

//         stream.on('data', (chunk) => {
//             data += chunk.toString();
//         });

//         stream.on('close', (code, signal) => {
//             console.log('Command execution completed');
//             console.log('Data:', data);

//             // Handle the retrieved data here
//             // You can parse/process the data as needed

//             sshClient.end();
//         });
//     });
// });

// sshClient.on('error', (err) => {
//     console.error('SSH connection error:', err);
// });

// sshClient.on('end', () => {
//     console.log('SSH connection closed');
// });

// // Connect to the server
// sshClient.connect({
//     host: remoteHost,
//     port: remotePort,
//     username: username,
//     privateKey: privateKey,
// });
