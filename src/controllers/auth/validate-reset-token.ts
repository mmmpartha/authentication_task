import { RequestHandler } from 'express';
import UserModel from '../../models/user';

const validateResetToken: RequestHandler = async (req, res) => {
    try {
        const { token } = req.query; 

        if (!token) {
            return res.status(400).send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Invalid Link</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            text-align: center;
                            margin: 0;
                            padding: 20px;
                        }
                        .container {
                            margin-top: 50px;
                        }
                        h1 {
                            color: #ff4c4c;
                        }
                        a {
                            text-decoration: none;
                            color: #007bff;
                        }
                        a:hover {
                            text-decoration: underline;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Invalid Reset Link</h1>
                        <p>The reset link is invalid or missing.</p>
                        <a href="/forgot-password">Request a new reset link</a>
                    </div>
                </body>
                </html>
            `);
        }

        const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() }, 
        });

        if (!user) {
            return res.status(400).send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Expired Link</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            text-align: center;
                            margin: 0;
                            padding: 20px;
                        }
                        .container {
                            margin-top: 50px;
                        }
                        h1 {
                            color: #ff4c4c;
                        }
                        a {
                            text-decoration: none;
                            color: #007bff;
                        }
                        a:hover {
                            text-decoration: underline;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Expired Reset Link</h1>
                        <p>The reset link has expired. Please request a new one.</p>
                        <a href="/forgot-password">Request a new reset link</a>
                    </div>
                </body>
                </html>
            `);
        }

        const frontendResetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        res.redirect(frontendResetPasswordUrl);
    } catch (error) {
        console.error('Error validating reset token:', error);
        return res.status(500).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Server Error</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        text-align: center;
                        margin: 0;
                        padding: 20px;
                    }
                    .container {
                        margin-top: 50px;
                    }
                    h1 {
                        color: #ff4c4c;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Internal Server Error</h1>
                    <p>Something went wrong. Please try again later.</p>
                </div>
            </body>
            </html>
        `);
    }
};

export default validateResetToken;
