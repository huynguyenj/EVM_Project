export const CustomerScheduleTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
              body {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  font-family: Arial, sans-serif;
            }
            p {
                  font-size: 18px;
            }
            header {
                  background-color: black;
                  padding: 20px;
            }
            .email-title {
                  font-size: 22px;
                  color: white;
                  text-align: center;
                  font-weight: bold;
             }
            table {
                  border-collapse: collapse;
            }
           table th, table td {
                  border: 2px solid black;
                  padding: 8px 15px; 
            }
      </style>
</head>
<body>
       <header>
            <p class="email-title">Installment payment schedule</p>
      </header>
      <section>
            <p>This is your payment schedule you need to follow and pay please do the payment.</p>
            <table>
                  <thead>
                        <tr>
                              <th>Period</th>
                              <th>Due date</th>
                              <th>Paid date</th>
                              <th>Due amount</th>
                              <th>Amount paid</th>
                              <th>Penalty amount</th>
                              <th>Status</th>
                        </tr>
                  </thead>
                  <tbody>
                        {tableBody}
                  </tbody>
            </table>
      </section>
      <footer>
             <p class="footer">This is an automated message, please do not reply to this email.</p>
      </footer>
</body>
</html>
`;
