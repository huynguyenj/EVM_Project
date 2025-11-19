export const VALIDATION_CODE_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Validation</title>
      <style>
        body {
           font-family: Arial, Helvetica, sans-serif; 
           box-sizing: border-box;
        }
         .section {
            padding: 10px;
         }
         .section-header {
            padding: 10px;
            background-color: black;
         }
         .section-header p {
            font-size: 20px;
            font-weight: bold;
            color: white;
            text-align: center;
            text-transform: uppercase;
         }
         .section-body + .section-footer {
            padding: 0px 5px;
         }
         .section-body > .code-container {
            font-size: 30px;
            font-weight: bold;
            text-align: center;
            background-color: #CBCBCB;
            padding: 10px;
         }
         .footer {
            text-align: center;
         }
      </style>
</head>
<body>
      <header></header>
      <section class="section">
            <div class="section-header">
                  <p>Verify code</p>
            </div>
            <div class="section-body">
                  <p>This is your verification code:</p>
                  <div class="code-container">
                        <p class="code">{code}</p>
                  </div>
            </div>
            <div class="section-footer">
                  <p>This code is only available for tge next 60 second. Please use code as soon as possible.</p>
            </div>
      </section>
      <footer>
            <p class="footer">This is an automated message, please do not reply to this email.</p>
      </footer>
</body>
</html>
`;
