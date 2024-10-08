import { storeOtp } from './customer.service.js';
import { sendSMS } from './twilio.service.js';

/**
 * Triggers the OTP verification process by storing the OTP in the database and sending an SMS to the specified mobile number.
 *
 * @param {string} otp - The generated OTP.
 * @param {string} mobile_no - The recipient's mobile number.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the OTP was successfully triggered,
 *  `false` otherwise.
 */
export const triggerOTP = async (otp, mobile_no) => {
  await storeOtp(otp, mobile_no);
  const message = `Your OTP for verification code: ${otp}. Valid only for next five minutes`;

  await sendSMS(mobile_no, message);

  return true;
};
