import {Resend} from 'resend';
import dotenv from "dotenv"; /* you can also import and config together */
dotenv.config();     /* Using -> import "dotenv/config" just one line*/


const {RESEND_API_KEY, EMAIL_FROM, EMAIL_FROM_NAME}= process.env;


// for sending emails
export const resendClient = new Resend(RESEND_API_KEY);

export const sender = {
  email: EMAIL_FROM,
  name:EMAIL_FROM_NAME,
}