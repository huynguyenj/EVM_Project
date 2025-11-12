export const DriveTrialTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Customer contract</title>
      <style>
            body {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  font-family: Arial, sans-serif;
            }
            table {
                  border-collapse: collapse;
            }
            header {
                  background-color: black;
                  padding: 20px;
            }
            p {
                  font-size: 18px;
                  margin: 10px 0;
            }
            .email-title {
                  font-size: 25px;
                  color: white;
                  text-align: center;
                  font-weight: bold;
                  margin: 0;
            }
            .content-wrapper {
                  padding: 0 10px;
            }
            .two-column-table {
                  width: 100%;
            }
            .two-column-table td {
                  width: 50%;
                  padding-right: 20px;
            }
            .contract {
                  font-size: 22px;
                  font-weight: bold;
            }
            .product {
                  font-size: 22px;
                  font-weight: bold;
            }
            .staff {
                  font-size: 22px;
                  font-weight: bold;
            }
            .footer {
                  font-weight: bold;
                  font-size: 20px;
                  text-align: center;
            }
            .price {
                  font-weight: bold;
                  font-size: 19px;
            }
            hr {
                  border: none;
                  border-top: 1px solid #ccc;
                  margin: 20px 0;
            }
            .status {
                  font-weight: bold;
                  font-size: 19px
            }
            .status span {
                  background-color: #DEDED1;
                  padding: 5px;
                  font-size: 20px
            }
      </style>
</head>
<body>
      <header>
            <p class="email-title">Drive trial information</p>
      </header>
      <div class="content-wrapper">
          <p class="contract">Drive trial</p>
          <p>Customer name: {customerName}</p>
          <p>Customer phone: {customerPhone}</p>
          <p>Customer email: {customerEmail}</p>
          <!-- Two column layout using table -->
          <table class="two-column-table" cellpadding="0" cellspacing="0">
                <tr>
                      <td>
                            <p>Drive date: {driveDate}</p>
                      </td>
                      <td>
                            <p>Drive time: {driveTime}</p>
                      </td>
                </tr>
          </table>
          
          <p class="product">Vehicle:</p>
          
          <!-- Two column layout for vehicle info -->
          <table class="two-column-table" cellpadding="0" cellspacing="0">
                <tr>
                      <td>
                            <p>Vehicle name: {vehicleName}</p>
                      </td>
                </tr>
          </table>
          
          <!-- Two column layout for model info -->
          <table class="two-column-table" cellpadding="0" cellspacing="0">
                <tr>
                      <td>
                            <p>Model: {model}</p>
                      </td>
                      <td>
                            <p>Make from: {makeFrom}</p>
                      </td>
                </tr>
          </table>
          
          <p>Version: {version}</p>
          <hr>
          <p class="status">Status: <span>{status}</span></p>
      </div>
      <footer>
             <p class="footer">This is an automated message, please do not reply to this email.</p>
      </footer>
</body>
</html>
`;
