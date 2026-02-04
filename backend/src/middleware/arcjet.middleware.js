import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  
  if (process.env.NODE_ENV === "development") {
    return next();   // BYPASS ARCJET LOCALLY
  }

  try {
    const decison = await aj.protect(req);

    if (decison.isDenied) {
      if (decison.reason.isRateLimit()) {
        return res.status(429).json({
          message: "Too many requests",
        })
      } else if (decison.reason.isBot()) {
        return res.status(403).json({
          message: "Bot access denied",
        })
      } else {
        return res.status(403).json({
          message: "Access denied by security policy.",
        })
      }
    }

    //check for spoofed bots
    if (decison.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected"
      });
    }

    next();

  } catch (error) {
    console.log("Arcjet protection error: ", error);
    next();
  }
}