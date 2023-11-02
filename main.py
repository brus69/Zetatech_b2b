import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
 
# Define email settings
smtp_server = 'smtp.freesmtpservers.com'
smtp_port = 25
 
# Create email message
subject = 'Hello, World!<b>asdf</b>'
body = 'This is a test email sent from a Python script.'
 
msg = MIMEMultipart()
msg['From'] = 'bikishovd@gmail.com'
msg['To'] = 'bikishovd@gmail.com'
msg['Subject'] = subject
 
msg.attach(MIMEText(body, 'html'))
 
# Send email
with smtplib.SMTP(smtp_server, smtp_port) as server:
    server.send_message(msg)
 
print('Email sent successfully!')