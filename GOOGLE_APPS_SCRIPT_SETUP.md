# Google Apps Script Setup for Contact Form

This document describes the Google Apps Script that must be deployed to handle form submissions.

## Current Setup

- **Google Form**: https://docs.google.com/forms/d/e/1FAIpQLSeE_wtPh31QRgYbSt0gpcUQT1L8VHfpWeSqziTyk2fOv3w4Sw/viewform
- **Google Sheet**: https://docs.google.com/spreadsheets/d/1iYtNsIj4CCGFnDbrn0SXAf_U9zzmNx9lLaOmWbWkUr4/edit
- **Apps Script URL**: https://script.google.com/macros/s/AKfycbxW3HYs_VNnQ67Zw5zd-2P3SzUG09ZDc8ygOlFvei0Vvg1cO3FBnKbsKLSHUpoiOl9U/exec

## Required Google Apps Script Code

The following script must be deployed as a Web App in your Google Apps Script project:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Extract form data from POST parameters
    const name = e.parameter.name || '';
    const phone = e.parameter.phone || '';
    const date = e.parameter.date || 'Flexible';
    const experience = e.parameter.experience || '';
    
    // Add timestamp
    const timestamp = new Date();
    
    // Append a new row with the form data
    sheet.appendRow([timestamp, name, phone, date, experience]);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        status: 'success', 
        message: 'Enquiry submitted successfully' 
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        status: 'error', 
        message: error.toString() 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Deployment Steps

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1iYtNsIj4CCGFnDbrn0SXAf_U9zzmNx9lLaOmWbWkUr4/edit

2. Go to **Extensions > Apps Script**

3. Delete any existing code and paste the script above

4. Save the project (name it "Sea King Contact Form Handler")

5. Click **Deploy > New deployment**

6. Configure deployment:
   - Type: **Web app**
   - Description: "Contact form submission handler"
   - Execute as: **Me** (your Google account)
   - Who has access: **Anyone** (important!)

7. Click **Deploy**

8. Authorize the script when prompted

9. Copy the Web App URL - it should match:
   `https://script.google.com/macros/s/AKfycbxW3HYs_VNnQ67Zw5zd-2P3SzUG09ZDc8ygOlFvei0Vvg1cO3FBnKbsKLSHUpoiOl9U/exec`

## Expected Spreadsheet Format

The script will add rows with the following columns:

| Column A | Column B | Column C | Column D | Column E |
|----------|----------|----------|----------|----------|
| Timestamp | Name | Phone | Date | Experience |

Example:
```
2024-01-15 10:30:00 | Rahul Patil | 9822012345 | 2024-01-20 | Tsunami Island
```

## Testing the Integration

1. After deploying the script, test by filling out the contact form on your website

2. Check the Google Sheet to verify new rows are being added

3. Verify that WhatsApp opens with the pre-filled message after submission

## Form Fields

The website form sends these fields:
- `name` (required) - Customer's full name
- `phone` (required) - Customer's phone number
- `date` (optional) - Preferred booking date (defaults to "Flexible")
- `experience` (required) - Selected tour experience

## Troubleshooting

If submissions aren't appearing in the sheet:

1. Verify the script is deployed as a **Web app** (not just saved)
2. Check that "Who has access" is set to **Anyone**
3. Make sure you authorized the script when prompted
4. Check the Apps Script execution logs for errors (View > Executions)
5. Verify the Web App URL matches the one in `src/pages/Contact.tsx`

## Security Notes

- No sensitive data or API keys are exposed in frontend code
- The Apps Script URL is public (by design) but only accepts POST requests
- Form submissions are logged with timestamps for audit trail
- Consider adding rate limiting in Apps Script if spam becomes an issue
