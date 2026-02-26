const { Resend } = require("resend");
const resend = new Resend("re_EZC1q19m_92NAK7Mu1UKQEq6rWkz3d2br");

async function test() {
  try {
    const data = await resend.emails.send({
      from: "O'YOUN Optique <programmingmb.my@gmail.com>",
      to: "programmingmb.my@gmail.com",
      subject: "Test Email",
      html: "<p>If you get this, Resend is working.</p>",
    });
    console.log("Success:", data);
  } catch (error) {
    console.error("Error sending:", error);
  }
}

test();
