import { google } from "googleapis";
import nodemailer from "nodemailer";

const google_id: string =
  "24372524741-jn16e1i5tcijldtr4ipcn55rtje4am4j.apps.googleusercontent.com";
const google_secret: string = "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";
const google_refreshToken: string =
  "1//048T2gFxCs-wtCgYIARAAGAQSNwF-L9IrYQ8G9xc6uE_hhbYVrU8vLyTJX-19_Odlgwi_7mAYI2UtbBVz6Ypg8yf0mTlI0zJmc60";
const google_redirectToken: string =
  "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(
  google_id,
  google_secret,
  google_redirectToken
);

export const verifyAccount = async (createUser: any) => {
  try {
    oAuth.setCredentials({
      access_token: google_refreshToken,
    });

    const getToken = await oAuth.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "nicsylvia15f@gmail.com",
        clientId: google_id,
        clientSecret: google_secret,
        refreshToken: google_refreshToken,
        // accessToken: getToken?.token!,
        accessToken:
          "ya29.a0Ael9sCO5vYm0YwRVUnKkSV3NlCvf-qEF92KSyiqzHIbIZufbNLkksyNjnii3X8X7_UfDtNTR-XvwZoOLa2KXSi2DcE5dBkTEj8BBucRwnV87m54q1t5txswKgpq-mrm6odtDgPxSlg8PDBOSvADHBveUAGtksZUaCgYKAQASARMSFQF4udJhF6IzaDjCsY56UVylZ9NDqg0166",
      },
    });

    const mailerOptions = {
      from: "Neche <sannifortune11@gmail.com>", // sender address
      to: createUser?.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Verifiy Your Account", // plain text body
      html: `<b>Welcome ${createUser?.name} here is your OTP : ${createUser?.OTP}
      <a href="http://localhost/2001/verified" >
      click to verified
      </a>
      </b>`, // html body
    };

    transporter
      .sendMail(mailerOptions)
      .then(() => {
        console.log("Email Sent");
      })
      .catch((err) => {
        console.log("Email Not sent", err);
      });
  } catch (error) {
    console.log("An Error occured In verifyAccount");
  }
};

export const resetUserPassword = async (createUser: any) => {
  try {
    oAuth.setCredentials({
      access_token: google_refreshToken,
    });

    const getToken = await oAuth.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "nicsylvia15f@gmail.com",
        clientId: google_id,
        clientSecret: google_secret,
        refreshToken: google_refreshToken,
        // accessToken: getToken?.token!,
        accessToken:
          "ya29.a0Ael9sCO5vYm0YwRVUnKkSV3NlCvf-qEF92KSyiqzHIbIZufbNLkksyNjnii3X8X7_UfDtNTR-XvwZoOLa2KXSi2DcE5dBkTEj8BBucRwnV87m54q1t5txswKgpq-mrm6odtDgPxSlg8PDBOSvADHBveUAGtksZUaCgYKAQASARMSFQF4udJhF6IzaDjCsY56UVylZ9NDqg0166",
      },
    });

    const mailerOptions = {
      from: "Sylvia <nicsylvia15f@gmail.com>", // sender address
      to: createUser?.email, // list of receivers
      subject: "Reset your Passwod ✔", // Subject line
      text: `Reset Password Request`, // plain text body
      html: `<b>
        <a heref=localhost:2001/api/changepassword/${createUser?._id}/${createUser?.token}>click here</a>
        </b>`, // html body
    };

    transporter
      .sendMail(mailerOptions)
      .then(() => {
        console.log("Reset Password Email not Sent");
      })
      .catch((err) => {
        console.log("Email Not sent in resetUserPassword", err);
      });
  } catch (error) {
    console.log("An Error occured In resetUserPassword");
  }
};
