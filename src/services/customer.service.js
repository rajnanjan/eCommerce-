import db from '../db/db.js';

/**
 * Retrieves customer data based on the provided mobile number.
 *
 * @param {string} mobile_no - The mobile number of the customer.
 * @returns {Object} - The customer data object, or null if not found.
 */
export const getCustomerByMobNo = async (mobile_no) => {
  const conn = await db.getTransaction();
  try {
    const customer = await conn('customers').select('*').where({ mobile_number: mobile_no });
    await conn.commit();
    return customer;
  } catch (error) {
    await conn.rollback();
    throw error;
  }
};

/**
 * Stores a generated OTP for a given mobile number in the database.
 *
 * @param {string} otp - The generated OTP.
 * @param {string} mobile_no - The recipient's mobile number.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the OTP was successfully stored,
 *  `false` otherwise.
 */
export const storeOtp = async (otp, mobile_no) => {
  const conn = await db.getTransaction();
  try {
    await conn('customers').update({ otp }).where({ mobile_number: mobile_no });
    await conn.commit();
    return true;
  } catch (error) {
    await conn.rollback();
    throw error;
  }
};

/**
 * Stores customer details in the database.
 *
 * @param {string} name - The customer's name.
 * @param {string} email - The customer's email address.
 * @param {string} mobile_no - The customer's mobile number.
 * @returns {Object} - Return the customer Object if the customer was stored successfully.
 */
export const storeCustomer = async (name, email, mobile_no) => {
  const conn = await db.getTransaction();
  try {
    const customer = await conn('customers')
      .insert({
        name,
        email,
        mobile_number: mobile_no
      })
      .returning(['id', 'name', 'mobile_number']);
    await conn.commit();
    return customer;
  } catch (error) {
    await conn.rollback();
    throw error;
  }
};
