## Simple Sessions App

### Deploy

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

### Salesforce Configuration

- add a Password field to the standard Contact object - field name password__c, text, length 100 characters

### Import Heroku Connect Configuration

Download the Configuration JSON file (herokconnect/mappings.json) and then:

- Go to your Heroku Dashboard
- Go to the Resources tab for your App
- Select Heroku Connect
- Go to Settings > Import/Export Configuration
- Press Import
- Select the file you downloaded and press Upload
- If your field names and objects in Salesforce have been configured correctly Heroku Connect will configure the mappings


### Optional

Create an Account in Salesforce - make a note of the Salesforce ID and specify that ID in your Heroku App as a Configuration Variable named CONTACTS_ACCOUNT_ID. This will tie Users (Contacts) created within the application to the Account.