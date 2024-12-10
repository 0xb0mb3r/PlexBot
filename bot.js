const venom = require('venom-bot');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Log file path
const logFilePath = path.join(__dirname, 'messages.log');

// Group IDs to monitor
const targetGroupIds = ['*GROUPCHATID1*', '*GROUPCHATID2*'];

venom
    .create({
        session: 'whatsapp-bot', // Session name
        multidevice: true, // Required for Venom multidevice
    })
    .then((client) => start(client))
    .catch((error) => {
        console.error('Error initializing Venom:', error);
    });

function start(client) {
    console.log(`WhatsApp bot is online and monitoring the following groups:`);
    targetGroupIds.forEach((groupId) => console.log(`- ${groupId}`));

    client.onMessage(async (message) => {
        try {
            // Ensure the message is from one of the target groups
            if (message.isGroupMsg && targetGroupIds.includes(message.from)) {
                // Log the message
                const logEntry = `${message.from} | ${message.chat.name} | ${message.body}\n`;
                fs.appendFileSync(logFilePath, logEntry, 'utf8');
                console.log(`Message logged: ${logEntry.trim()}`);

                // Handle the /restart command
                if (message.body.trim() === '/restart') {
                    console.log('Restart command received.');

                    // Send acknowledgment to the group chat
                    await client.sendText(
                        message.from,
                        'AUTOMATED MESSAGE: Server restart initiated. Please wait...'
                    );

                    exec('node restart.js', (error, stdout, stderr) => {
                        const timestamp = new Date().toLocaleString(); // Get the current time

                        if (error) {
                            console.error(`Error executing restart.js: ${error.message}`);
                            client.sendText(
                                message.from,
                                `AUTOMATED MESSAGE: Error restarting the server. Check logs for details. (Occurred at ${timestamp})`
                            );
                            return;
                        }
                        if (stderr) {
                            console.error(`stderr: ${stderr}`);
                        }
                        console.log(`stdout: ${stdout}`);

                        // Notify the group that the restart was successful
                        client.sendText(
                            message.from,
                            `AUTOMATED MESSAGE: Server restart completed successfully at ${timestamp}.`
                        );
                    });
                }

                // Handle the /test command
                if (message.body.trim() === '/test') {
                    console.log('Test command received.');

                    // Send a confirmation message
                    await client.sendText(
                        message.from,
                        'AUTOMATED MESSAGE: Bot is working and listening for Commands!'
                    );

                    // Log the test confirmation
                    const testLogEntry = `Test command executed in group: ${message.chat.name} (${message.from})\n`;
                    fs.appendFileSync(logFilePath, testLogEntry, 'utf8');
                    console.log(`Test command logged: ${testLogEntry.trim()}`);
                }
            }
        } catch (err) {
            console.error('Error processing message:', err);
        }
    });
}
