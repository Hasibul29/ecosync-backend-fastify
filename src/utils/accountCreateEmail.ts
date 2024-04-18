const accountRegistration = (userData: {
  name: string;
  email: string;
  password: string;
}) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registration Successful</title>
      <style>
      body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
      }
      .email-container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }
      .header {
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          text-align: center;
      }
      .content {
          padding: 20px;
          line-height: 1.6;
      }
      .footer {
          text-align: center;
          padding: 10px 20px;
          font-size: 0.8em;
          color: #666;
      }
      .copy-instructions {
          font-size: 0.8em;
          color: #555;
          margin-top: 10px;
      }
      .password-box {
          border: 1px solid #ccc;
          padding: 5px;
          font-family: monospace;
          word-break: break-all;
          background-color: #f8f8f8;
      }
  </style>
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <h1>Welcome to Ecosync!</h1>
          </div>
          <div class="content">
              <p>Hi ${userData.name},</p>
              <p>Congratulations! Your account has been successfully registered with <strong>EcoSync</strong>. Below are your initial login credentials.</p>
              <table>
                  <tr>
                      <td>Email:</td>
                      <td><strong>${userData.email}</strong></td>
                  </tr>
                  <tr>
                      <td>Password:</td>
                      <td><div class="password-box">${
                        userData.password
                      }</div></td>
                  </tr>
              </table>
              <p><strong>Please ensure you change your password immediately after your first login for security reasons.</strong></p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Ecosync. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
  `;

const resetPassword = (userData: { name: string; otp: string }) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset OTP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            padding: 10px 20px;
            font-size: 0.8em;
            color: #666;
        }
        .otp-box {
            border: 1px solid #ccc;
            padding: 10px;
            font-size: 1.2em;
            text-align: center;
            margin-top: 20px;
            background-color: #f8f8f8;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Password Reset OTP</h1>
        </div>
        <div class="content">
            <p>Hi ${userData.name},</p>
            <p>You requested a password reset for your EcoSync account. Please use the following one-time password (OTP) to reset your password:</p>
            <div class="otp-box">${userData.otp}</div>
            <p>If you didn't request this, you can safely ignore this email.</p>
            <p>Thank you!</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} EcoSync. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

const passwordResetConfirm = (userData: { name: string }) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            padding: 10px 20px;
            font-size: 0.8em;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Password Reset Successful</h1>
        </div>
        <div class="content">
            <p>Hi ${userData.name},</p>
            <p>Your password has been successfully reset for your EcoSync account.</p>
            <p>If you didn't request this change, please contact us immediately.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 EcoSync. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

export { accountRegistration, resetPassword, passwordResetConfirm };
