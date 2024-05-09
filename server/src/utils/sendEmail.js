const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require("url");
const handlebars = require("handlebars");

const emailTemplateSource = fs.readFileSync(
  path.join(__dirname, "../public/templates/email.hbs"),
  "utf8"
);
const emailReservationTemplateSource = fs.readFileSync(
  path.join(__dirname, "../public/templates/emailReservation.hbs"),
  "utf8"
);
const emailDeclineReservationTemplateSource = fs.readFileSync(
  path.join(__dirname, "../public/templates/emailReservation_decline.hbs"),
  "utf8"
);

function sendReservationEmail(user, reservation) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASS,
    },
  });

  const template = handlebars.compile(emailReservationTemplateSource);
  const title = "CityFlat Reservation feedback";
  const checkoutUrl = `http://localhost:5173/checkout/${reservation?.id}`;
  const message = `Hi there ${user?.username}, We're excited to inform you that your reservation is accepted for ${reservation?.name}.
   Please proceed to checkout by clicking the following link: ${checkoutUrl}.
   Claimer: You have 24h to pay thee reservation otherwise it will be cancelled automatically.`;

  const htmlToSend = template({
    title: title,
    message: message,
    code: reservation?.code,
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: user?.email,
    subject: "CityFlat Reservation feedback",
    html: htmlToSend,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Email sent to ${user?.email} successfully`);
    }
  });
}

function sendDeclineReservationEmail(user, reservation) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASS,
    },
  });

  const template = handlebars.compile(emailDeclineReservationTemplateSource);
  const title = "CityFlat Reservation feedback";
  const message = `Hi there ${user.username}, We're terribly sorry to inform you that your reservation is declined for ${reservation?.name}.
  check your CityFlat App`;

  const htmlToSend = template({
    title: title,
    message: message,
  });
  const mailOptions = {
    from: process.env.NODE_MAILER_USER,
    to: user?.email,
    subject: "CityFlat Reservation feedback",
    html: htmlToSend,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
    }
    console.log(`Email sent to ${user?.email} successfully`);
  });
}

function sendHelpRequest(req, res) {
  const { object, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASS,
    },
  });
  const template = handlebars.compile(emailReservationTemplateSource);
  const htmlToSend = template({
    title: object,
    message: message,
  });
  const mailOptions = {
    from: process.env.NODE_MAILER_USER,
    to: "rs.youssef24@gmail.com",
    subject: "CityFlat Help Request",
    html: htmlToSend,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      res
        .status(200)
        .send({ message: "Your Request Has Been Submited Successfuly." });
    }
    console.log(`Email sent to successfully`);
  });
}

module.exports = {
  sendReservationEmail,
  sendDeclineReservationEmail,
  sendHelpRequest,
};
