
# PlexBot - StreamBoy TV Server Restart Bot

PlexBot is a WhatsApp bot built to restart the StreamBoy TV server. That’s it—no fancy extra features, no unnecessary bloat. It listens to specific WhatsApp group chats for the `/restart` command and runs a server restart, logging everything along the way. If you’re looking for a bot to handle anything else, this ain’t it.

---

## Features
- Listens to designated WhatsApp group chats for the `/restart` command.
- Logs all messages in the group chats it monitors.
- Sends an automated confirmation when the restart is done.
- Includes a `/test` command to check if the bot is running properly.

---

## Prerequisites
1. **Node.js**: Install Node.js (v18 or above).
2. **PM2**: Install PM2 for continuous operation.
   ```bash
   npm install -g pm2
   ```

---

## Installation and Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd PlexBot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Log In with WhatsApp
Run the login script to set up your session:
```bash
node login.js
```

- This opens a browser in non-headless mode. Log in to WhatsApp manually.
- Make sure to select "Remember Me" so your session persists.
- A `user_data` folder will be created to store your session data.

### 4. Configure the Group Chat IDs
Use the bot’s logging feature to identify the group chat IDs. Any messages sent to group chats will be logged in `messages.log` in the following format:
```
GROUP_ID | GROUP_NAME | MESSAGE
```

Add the IDs of the groups you want the bot to monitor in `bot.js`:
```javascript
const targetGroupIds = ['<GROUP_ID_1>', '<GROUP_ID_2>'];
```

---

## Running the Bot

### Start the Bot with PM2
Run the bot as a PM2 task for continuous operation:
```bash
pm2 start bot.js --name plexbot
```

### Monitor Logs
To view real-time logs:
```bash
pm2 logs plexbot
```

### Managing the Bot
- **Restart**:
  ```bash
  pm2 restart plexbot
  ```
- **Stop**:
  ```bash
  pm2 stop plexbot
  ```

---

## File Structure
- `bot.js`: The main script that handles commands, interactions, and logging.
- `login.js`: Sets up the WhatsApp session.
- `messages.log`: Logs all messages from monitored group chats (empty by default).
- `user_data/`: Stores session data for persistent logins. (Excluded from this repository for security reasons.)

---

## Notes on Sensitive Data
- `user_data/`: This folder contains private session data. Do not share or upload it to any repository.
- **Logs**: The `messages.log` file may contain sensitive group messages. Ensure it’s reviewed or excluded before sharing.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.
