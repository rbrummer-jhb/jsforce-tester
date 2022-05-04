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

# Customizing
