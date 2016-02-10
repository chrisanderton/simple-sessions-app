module.exports = {

    databaseURL: process.env.DATABASE_URL || "postgres://@127.0.0.1:5432/ssa",

    // Nibs users are created as Contacts under a generic Account in SFDC. This is the id of the generic account.
    contactsAccountId: process.env.CONTACTS_ACCOUNT_ID
    
};