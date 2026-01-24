import {Resend} from 'resend';
/* import dotenv from "dotenv";  *//* you can also import and config together */
/* dotenv.config();  */    /* Using -> import "dotenv/config" just one line*/
import { ENV } from "../lib/env.js";

//const {RESEND_API_KEY, EMAIL_FROM, EMAIL_FROM_NAME}= process.env;


// for sending emails
export const resendClient = new Resend(ENV.RESEND_API_KEY);

export const sender = {
  email: ENV.EMAIL_FROM,
  name:ENV.EMAIL_FROM_NAME,
}