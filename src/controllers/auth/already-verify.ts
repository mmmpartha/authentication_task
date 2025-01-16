import { Request, Response } from 'express';

const alreadyVerified = (req: Request, res: Response) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Already Verified</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f4f4f9;
                color: #333;
            }
            .container {
                text-align: center;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background-color: #ffffff;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            h1 {
                font-size: 2rem;
                color: #28a745;
                margin-bottom: 10px;
            }
            p {
                font-size: 1rem;
                color: #555;
            }
            .cta {
                margin-top: 20px;
            }
            .cta a {
                display: inline-block;
                text-decoration: none;
                background-color: #28a745;
                color: #ffffff;
                padding: 10px 20px;
                border-radius: 4px;
                font-weight: bold;
                transition: background-color 0.3s ease;
            }
            .cta a:hover {
                background-color: #218838;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Invalid Code</h1>
            <p>Invalid or expired verification code.</p>
            <div class="cta">
                <a href="/login">Go to Login</a>
            </div>
        </div>
    </body>
    </html>
  `);
};

export default alreadyVerified;
