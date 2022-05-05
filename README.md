# Introduction

Very lightweight app for viewing the xml and/or json representation of Salesforce metadata retrieved using the jsforce Metadata API interface. Writes the xml to the local directory. Reads back the xml and uses the xml2js package to transform it into a JavaScript object.

# Setup

1. Fork the repository.

2. Clone the forked repository to your local drive.

3. Open the repo in VS Code

4. Add a .env file with your Salesforce credentials. For this step you need your Salesforce username, password, and security token.

	```dotenv
	# Salesforce Credentials
	# Note the required "!" in PASSWORD
	SFUSER=mySalesforceUsername
	PASSWORD=mySalesforcePassword!mySalesforceSecurityToken
	```
5. Build the project using 'npm install'

6. Run the project using 'node index.js'

7. The result should be a zip file in a new "unpackaged" directory in your repo and a lot of console output.

# Customizing

Pay attention to the CustomLabel code. There are methods that get the metadata summary information, the metadata xml, and then a statement that transforms the xml into a JavaScript object. These are essentially the same steps that the orgModelSync-v2 metadata retrieve stage goes through.

It's **very important** that you understand the shape of the final object that you'll be working with.

First you need to create some test data in your personal Salesforce org. 

Then, using the CustomLabel code here as a template, create methods to get the summary info and the detail info for one or more metadata items. Then **really study the xml and json carefully** so that you understand what you're seeing. I recommend keeping the Salesforce Metadata API documentation open on another screen while you do this.

# Output

## Summary Info

Here is example CustomLabel summary info from my dev org

```javascript
[
  {
    createdById: '0050a00000JEU37AAH',
    createdByName: 'Rick Roesler',
    createdDate: '2020-09-21T03:19:53.000Z',
    fileName: 'labels/CustomLabels.labels',
    fullName: 'Profile2PermSet__dmlmanager_errorMessage_unknownField',
    id: '1010a000006EfSIAA0',
    lastModifiedById: '0050a00000JEU37AAH',
    lastModifiedByName: 'Rick Roesler',
    lastModifiedDate: '2020-09-21T03:19:53.000Z',
    manageableState: 'installed',
    namespacePrefix: 'Profile2PermSet',
    type: 'CustomLabel'
  },
  {
    createdById: '0050a00000JEU37AAH',
    createdByName: 'Rick Roesler',
    createdDate: '2020-09-21T03:19:53.000Z',
    fileName: 'labels/CustomLabels.labels',
    fullName: 'Profile2PermSet__dmlmanager_errormessage_unknownaccess',
    id: '1010a000006EfSKAA0',
    lastModifiedById: '0050a00000JEU37AAH',
    lastModifiedByName: 'Rick Roesler',
    lastModifiedDate: '2020-09-21T03:19:53.000Z',
    manageableState: 'installed',
    namespacePrefix: 'Profile2PermSet',
    type: 'CustomLabel'
  },
  {
    createdById: '0050a00000JEU37AAH',
    createdByName: 'Rick Roesler',
    createdDate: '2020-09-21T03:19:53.000Z',
    fileName: 'labels/CustomLabels.labels',
    fullName: 'Profile2PermSet__dmlmanager_errorMessage_unknownObject',
    id: '1010a000006EfSJAA0',
    lastModifiedById: '0050a00000JEU37AAH',
    lastModifiedByName: 'Rick Roesler',
    lastModifiedDate: '2020-09-21T03:19:53.000Z',
    manageableState: 'installed',
    namespacePrefix: 'Profile2PermSet',
    type: 'CustomLabel'
  },
  {
    createdById: '0050a00000JEU37AAH',
    createdByName: 'Rick Roesler',
    createdDate: '2022-05-04T22:42:16.000Z',
    fileName: 'labels/CustomLabels.labels',
    fullName: 'thank_you',
    id: '1015b000005aIO5AAM',
    lastModifiedById: '0050a00000JEU37AAH',
    lastModifiedByName: 'Rick Roesler',
    lastModifiedDate: '2022-05-04T22:42:16.000Z',
    manageableState: 'unmanaged',
    type: 'CustomLabel'
  },
  {
    createdById: '0050a00000JEU37AAH',
    createdByName: 'Rick Roesler',
    createdDate: '2020-09-21T03:19:53.000Z',
    fileName: 'labels/CustomLabels.labels',
    fullName: 'Profile2PermSet__dmlmanager_errorMessage_insufficientAccessField',
    id: '1010a000006EfSGAA0',
    lastModifiedById: '0050a00000JEU37AAH',
    lastModifiedByName: 'Rick Roesler',
    lastModifiedDate: '2020-09-21T03:19:53.000Z',
    manageableState: 'installed',
    namespacePrefix: 'Profile2PermSet',
    type: 'CustomLabel'
  },
  {
    createdById: '0050a00000JEU37AAH',
    createdByName: 'Rick Roesler',
    createdDate: '2020-09-21T03:19:53.000Z',
    fileName: 'labels/CustomLabels.labels',
    fullName: 'Profile2PermSet__dmlmanager_errorMessage_insufficientAccessObject',
    id: '1010a000006EfSHAA0',
    lastModifiedById: '0050a00000JEU37AAH',
    lastModifiedByName: 'Rick Roesler',
    lastModifiedDate: '2020-09-21T03:19:53.000Z',
    manageableState: 'installed',
    namespacePrefix: 'Profile2PermSet',
    type: 'CustomLabel'
  },
  {
    createdById: '0050a00000JEU37AAH',
    createdByName: 'Rick Roesler',
    createdDate: '2020-05-17T16:39:55.000Z',
    fileName: 'labels/CustomLabels.labels',
    fullName: 'greeting',
    id: '1010a000006EZ0BAAW',
    lastModifiedById: '0050a00000JEU37AAH',
    lastModifiedByName: 'Rick Roesler',
    lastModifiedDate: '2022-05-04T22:41:24.000Z',
    manageableState: 'unmanaged',
    type: 'CustomLabel'
  }
]
```

## XML

Here is the xml that is returned when I ask for the "thank_you" and "greeting" metadata items.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CustomLabels xmlns="http://soap.sforce.com/2006/04/metadata">
    <labels>
        <fullName>greeting</fullName>
        <language>en_US</language>
        <protected>true</protected>
        <shortDescription>greeting</shortDescription>
        <value>Aloha!</value>
    </labels>
    <labels>
        <fullName>thank_you</fullName>
        <categories>label1, label2, label with space, label 4</categories>
        <language>en_US</language>
        <protected>true</protected>
        <shortDescription>thank you</shortDescription>
        <value>Thank you!</value>
    </labels>
</CustomLabels>
```

## JavaScript Object (JSON)

And here is the JavaScript object that you'll be parsing in order to create/update MongoDB entries.
**IMPORTANT:** Note that when xml2js transforms the data, almost everything will be presented as an array, even if it's defined to be a single item -- very important for parsing.

```json
{
  "CustomLabels": {
    "$": {
      "xmlns": "http://soap.sforce.com/2006/04/metadata"
    },
    "labels": [
      {
        "fullName": [
          "greeting"
        ],
        "language": [
          "en_US"
        ],
        "protected": [
          "true"
        ],
        "shortDescription": [
          "greeting"
        ],
        "value": [
          "Aloha!"
        ]
      },
      {
        "fullName": [
          "thank_you"
        ],
        "categories": [
          "label1, label2, label with space, label 4"
        ],
        "language": [
          "en_US"
        ],
        "protected": [
          "true"
        ],
        "shortDescription": [
          "thank you"
        ],
        "value": [
          "Thank you!"
        ]
      }
    ]
  }
}
```
