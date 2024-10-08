import twilio from 'twilio';

/**
 * Sends an SMS message using Twilio.
 *
 * @param {string} mobile_no - The recipient's mobile number.
 * @param {string} body - The message body to be sent.
 * @returns {Promise<string>} A promise that resolves to the message body that was sent.
 */
export const sendSMS = async (mobile_no, body) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  const message = await client.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+91${mobile_no}`,
    body
  });
  return message.body;
};
