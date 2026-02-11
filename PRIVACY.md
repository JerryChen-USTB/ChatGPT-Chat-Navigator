# Privacy Policy for ChatGPT Chat Navigator

**Effective Date:** February 06, 2026

ChatGPT Chat Navigator ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use the ChatGPT Chat Navigator Chrome extension (the "Extension").

## 1. Data Collection and Usage

**We do not collect or sell your personal data.**

The Extension operates primarily locally on your device. It interacts with the ChatGPT website (`https://chatgpt.com`) to generate a table of contents for your current conversation.

### Local Storage
The Extension uses your browser's local storage capabilities (`chrome.storage.local`) to store the custom names you assign to items in the table of contents. This data is stored locally on your device and is never transmitted externally.

### AI Summary Feature
The Extension provides an optional AI Summary feature. When you **explicitly click** the AI Summary button on a conversation item, a truncated text excerpt (max 1,000 characters) of that conversation turn is sent to our backend server (`https://jerrystudio.top`) to generate a short headline summary via an AI model. **This feature is never triggered automatically.**

- The server acts as a **stateless proxy** — it does not log, store, or retain any submitted text.
- The only data returned is the generated summary text, which is saved locally on your device.
- No conversation content is stored on the server beyond the duration of the request.

## 2. Third-Party Services

The Extension does not integrate with any analytics tools (such as Google Analytics) or advertising networks. The only external service used is our own backend server for the AI Summary feature as described above.

## 3. Data Security

Since all data is stored locally on your device, the security of your data relies on the security of your browser and computer. We do not have access to your data.

## 4. Changes to This Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.

## 5. Contact Us

If you have any questions about this Privacy Policy, please contact us via the support section on the Chrome Web Store.
