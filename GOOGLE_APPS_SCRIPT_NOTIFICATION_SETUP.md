# 4MyIPTV Service Notification Setup Guide

## Purpose

This update keeps the website stable and adds order notifications safely through Google Apps Script. The website should not contain the Telegram bot token.

## What this package adds

- Telegram-ready notification patch file: `google-apps-script-notifications-v2.gs`
- Live alert monitor inside `admin-orders.html`
- Email backup notification function
- Summer Special / 48-hour trial tracking fields
- Referral source tracking on the service request form

## Critical safety rule

Do **not** paste the Telegram bot token into any public HTML file or GitHub file. Store it in Google Apps Script Properties only.

## Before production

The current bot token was shared in chat during setup. For best security, revoke it in BotFather and generate a fresh token before the live notification system is used.

## Telegram values

- Chat ID already confirmed: `8567638320`
- Bot token: use a new token generated from BotFather before production

## Apps Script implementation steps

1. Open the existing Google Apps Script connected to the current endpoint.
2. Make a copy of the Apps Script project first.
3. Add a new script file named `notifications-v2.gs`.
4. Paste the full contents of `google-apps-script-notifications-v2.gs`.
5. Replace the placeholder token inside `setupNotificationSecretsOnce()` with the new BotFather token.
6. Run `setupNotificationSecretsOnce()` one time.
7. Run `testOrderNotifications()` manually.
8. Confirm Telegram and email alerts are received.
9. In the existing order-save logic, after the order is successfully written to the sheet, add:

```javascript
notifyNewOrder_(payload, { rowNumber: newRowNumber });
```

If your existing variable is not named `payload`, use the object that contains the submitted order data. If your row number variable has a different name, use that instead.

## Safe deployment logic

The order must save first. Notification should run second. If Telegram fails, the customer order should still remain saved.

## Testing plan

1. Keep the live site as-is.
2. Test the Apps Script patch manually with `testOrderNotifications()`.
3. Submit one test order from the updated `request-service.html`.
4. Confirm the order appears in Admin Orders.
5. Confirm Telegram notification is received.
6. Confirm email backup is received.
7. Only then deploy the updated files to GitHub.

## Rollback

If anything unexpected happens, redeploy the previous GitHub ZIP and remove or comment out only the single `notifyNewOrder_()` call from the Apps Script order-save logic.
