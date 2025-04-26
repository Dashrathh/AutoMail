import cron from "node-cron";

import sendMail from "./nodeMailer.js";
import Report from "../model/pdf.model.js";

export const startCron = () => {
  cron.schedule("*/5 * * * * *", async () => {
    console.log("Testing cron: sending mail...");

    try {
      const reports = await Report.findOne().sort({ createAt: -1 }).limit(1);

      if (!reports) {
        console.log("No report found");
      }

      const to = "sakurabausakura@gmail.com"; // reciver mail
      const subject = "Auto Report Mail";
      const message = "Here is your auto-generated report.";

      //  auto Mail

      await sendMail(to, subject, message, reports.pdf);
      console.log("Every 5 second report send successfully");
    } catch (error) {
      console.error("Error while sending report :", error);
    }
  });
};
