/**
 * 4MyIPTV Service - Notification Patch v2
 * Purpose: send Telegram + owner email alerts when a new order/request is saved.
 * Safe design: this code stores secrets in Script Properties and should run server-side only.
 * Do NOT place your bot token inside any public HTML file or GitHub Pages file.
 */

const NOTIFICATION_OWNER_EMAIL = 'tgarrett@fedex.com'; // Change if you want alerts sent somewhere else.
const ADMIN_DASHBOARD_URL = 'https://tgarrett1.github.io/4myIPTVservice-device-app-center-main/admin-orders.html'; // Update only if your live URL changes.

/**
 * Run this one time from Apps Script after replacing the placeholder values.
 * After it runs successfully, delete the token/chat values from this function or leave only placeholders.
 */
function setupNotificationSecretsOnce() {
  PropertiesService.getScriptProperties().setProperties({
    TELEGRAM_BOT_TOKEN: 'PASTE_NEW_REVOKED_AND_REGENERATED_BOT_TOKEN_HERE',
    TELEGRAM_CHAT_ID: '8567638320',
    OWNER_EMAIL: NOTIFICATION_OWNER_EMAIL
  }, true);
}

/**
 * Optional test. Run manually inside Apps Script to confirm Telegram + email delivery.
 */
function testOrderNotifications() {
  const sampleOrder = {
    action: 'createOrder',
    createdAt: new Date().toISOString(),
    customerName: 'Test Customer',
    fullName: 'Test Customer',
    phoneNumber: '631-555-1234',
    phone: '631-555-1234',
    emailAddress: 'test@example.com',
    email: 'test@example.com',
    orderType: '48-Hour Free Trial Request',
    planInterest: '48-Hour Free Trial - Free',
    deviceSelected: 'Customer device',
    preferredContact: 'Text Message',
    preferredReplyTime: 'Evening',
    fulfillmentType: 'Quote Request',
    paymentStatus: 'QUOTE PENDING',
    orderStatus: 'NEW',
    campaignSource: '48-Hour Free Trial',
    referralSource: 'Test',
    friendTrial: 'Yes - test notification',
    notes: 'This is a test notification only.'
  };

  notifyNewOrder_(sampleOrder, { rowNumber: 'TEST' });
}

/**
 * Add this call after your existing code successfully saves a NEW order:
 *
 *   notifyNewOrder_(payload, { rowNumber: newRowNumber });
 *
 * Do not place it before the order save. Notification should happen only after the order is recorded.
 */
function notifyNewOrder_(orderData, saveResult) {
  try {
    sendTelegramOrderNotification_(orderData, saveResult || {});
  } catch (err) {
    console.error('Telegram notification failed: ' + err);
  }

  try {
    sendOwnerEmailNotification_(orderData, saveResult || {});
  } catch (err) {
    console.error('Owner email notification failed: ' + err);
  }
}

function sendTelegramOrderNotification_(orderData, saveResult) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('TELEGRAM_BOT_TOKEN');
  const chatId = props.getProperty('TELEGRAM_CHAT_ID');

  if (!token || !chatId) {
    throw new Error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in Script Properties.');
  }

  const message = buildTelegramOrderMessage_(orderData, saveResult || {});
  const url = 'https://api.telegram.org/bot' + token + '/sendMessage';

  const response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    muteHttpExceptions: true,
    payload: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    })
  });

  const responseCode = response.getResponseCode();
  if (responseCode < 200 || responseCode >= 300) {
    throw new Error('Telegram API returned HTTP ' + responseCode + ': ' + response.getContentText());
  }
}

function sendOwnerEmailNotification_(orderData, saveResult) {
  const props = PropertiesService.getScriptProperties();
  const ownerEmail = props.getProperty('OWNER_EMAIL') || NOTIFICATION_OWNER_EMAIL;
  const customerName = getOrderField_(orderData, ['customerName', 'fullName', 'name'], 'New customer');
  const subject = 'New IPTV Order / Request - ' + customerName;

  const body = [
    'NEW IPTV ORDER / REQUEST',
    '',
    'Customer: ' + customerName,
    'Phone: ' + getOrderField_(orderData, ['phoneNumber', 'phone'], ''),
    'Email: ' + getOrderField_(orderData, ['emailAddress', 'email'], ''),
    'Order Type: ' + getOrderField_(orderData, ['orderType', 'serviceType'], ''),
    'Plan Interest: ' + getOrderField_(orderData, ['planInterest', 'planName'], ''),
    'Device: ' + getOrderField_(orderData, ['deviceSelected', 'deviceType'], ''),
    'Payment Status: ' + getOrderField_(orderData, ['paymentStatus'], ''),
    'Order Status: ' + getOrderField_(orderData, ['orderStatus', 'status'], ''),
    'Campaign Source: ' + getOrderField_(orderData, ['campaignSource'], ''),
    'Referral Source: ' + getOrderField_(orderData, ['referralSource'], ''),
    'Friend Trial: ' + getOrderField_(orderData, ['friendTrial'], ''),
    'Row: ' + (saveResult.rowNumber || ''),
    'Submitted: ' + getOrderField_(orderData, ['createdAt', 'timestamp'], new Date().toISOString()),
    '',
    'Notes:',
    getOrderField_(orderData, ['notes'], ''),
    '',
    'Admin Orders:',
    ADMIN_DASHBOARD_URL
  ].join('\n');

  MailApp.sendEmail(ownerEmail, subject, body);
}

function buildTelegramOrderMessage_(orderData, saveResult) {
  const customerName = escapeTelegramHtml_(getOrderField_(orderData, ['customerName', 'fullName', 'name'], 'New customer'));
  const phone = escapeTelegramHtml_(getOrderField_(orderData, ['phoneNumber', 'phone'], ''));
  const email = escapeTelegramHtml_(getOrderField_(orderData, ['emailAddress', 'email'], ''));
  const orderType = escapeTelegramHtml_(getOrderField_(orderData, ['orderType', 'serviceType'], ''));
  const plan = escapeTelegramHtml_(getOrderField_(orderData, ['planInterest', 'planName'], ''));
  const device = escapeTelegramHtml_(getOrderField_(orderData, ['deviceSelected', 'deviceType'], ''));
  const payment = escapeTelegramHtml_(getOrderField_(orderData, ['paymentStatus'], ''));
  const status = escapeTelegramHtml_(getOrderField_(orderData, ['orderStatus', 'status'], ''));
  const campaign = escapeTelegramHtml_(getOrderField_(orderData, ['campaignSource'], ''));
  const referral = escapeTelegramHtml_(getOrderField_(orderData, ['referralSource'], ''));
  const friendTrial = escapeTelegramHtml_(getOrderField_(orderData, ['friendTrial'], ''));
  const notes = escapeTelegramHtml_(truncate_(getOrderField_(orderData, ['notes'], ''), 500));
  const row = escapeTelegramHtml_(saveResult.rowNumber || '');
  const submitted = escapeTelegramHtml_(getOrderField_(orderData, ['createdAt', 'timestamp'], new Date().toISOString()));

  return [
    '📺 <b>NEW IPTV ORDER / REQUEST</b>',
    row ? '\n<b>Row:</b> ' + row : '',
    '\n<b>Customer:</b> ' + customerName,
    phone ? '\n<b>Phone:</b> ' + phone : '',
    email ? '\n<b>Email:</b> ' + email : '',
    orderType ? '\n<b>Order Type:</b> ' + orderType : '',
    plan ? '\n<b>Plan:</b> ' + plan : '',
    device ? '\n<b>Device:</b> ' + device : '',
    payment ? '\n<b>Payment:</b> ' + payment : '',
    status ? '\n<b>Status:</b> ' + status : '',
    campaign ? '\n<b>Campaign:</b> ' + campaign : '',
    referral ? '\n<b>Referral:</b> ' + referral : '',
    friendTrial ? '\n<b>Friend Trial:</b> ' + friendTrial : '',
    submitted ? '\n<b>Submitted:</b> ' + submitted : '',
    notes ? '\n\n<b>Notes:</b> ' + notes : '',
    '\n\n<a href="' + ADMIN_DASHBOARD_URL + '">Open Admin Orders</a>'
  ].join('');
}

function getOrderField_(obj, keys, fallback) {
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (obj && obj[key] !== undefined && obj[key] !== null && String(obj[key]).trim() !== '') {
      return String(obj[key]).trim();
    }
  }
  return fallback || '';
}

function truncate_(value, maxLength) {
  value = String(value || '');
  if (value.length <= maxLength) return value;
  return value.substring(0, maxLength - 3) + '...';
}

function escapeTelegramHtml_(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
