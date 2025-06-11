const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // SSL → porta 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function enviarEmail(assunto, conteudo) {
  const info = await transporter.sendMail({
    from: `"Scraper 🤖" <${process.env.EMAIL_USER}>`,
    to: process.env.DESTINO,
    subject: assunto,
    html: conteudo
  });

  console.log("E-mail enviado: %s", info.messageId);
}

module.exports = { enviarEmail };
