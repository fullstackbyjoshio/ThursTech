# EmailJS Setup

EmailJS sends a notification email whenever a quote, repair, or contact form
is submitted. It is a **best-effort notification only** — the real record is
always saved to Supabase first, so a customer's enquiry is never lost even if
EmailJS is unreachable or misconfigured.

## 1. Create an account and email service

1. Go to https://www.emailjs.com and create an account.
2. Add an **Email Service** (e.g. Gmail) connected to
   `thurstechnigltd@gmail.com`, and note the **Service ID**.

## 2. Create a template

Create a template with fields matching what the app sends, for example:

```
Subject: {{subject}}

New enquiry from the THURSTECH website:

Name: {{customer_name}}
Service: {{service_type}}
Phone: {{phone}}
Email: {{email}}
Location: {{location}}

Message:
{{description}}
```

Note the **Template ID**.

## 3. Get your public key

In **Account → General**, copy your **Public Key**.

## 4. Configure environment variables

Add to `.env`:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

If these are left blank, the site still works — forms still save to
Supabase and show a success message — the code simply skips sending the
notification email and logs a warning to the console.
