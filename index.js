'use strict'

const { username, password } = require('./config');
const jsforce = require('jsforce');
const _ = require('lodash');
const Bluebird = require('bluebird');

const conn = new jsforce.Connection({ version: '52.0' });
const fs = require('fs');
const parseString = require('xml2js').parseString;

main()

async function main () {
console.log(username);
console.log(password);
	try {
		await conn.login(username, password);
	} catch (err) {
		console.log(err);
	}
	
	try {
		// console.log(await (getSourceMember('0MZ8E000005uz3KWAQ')));
		// Object.values((await getFieldInfo('Booking__c')).fields.custom).forEach(field => {
		// 	if (field.calculatedFormula) console.log(`${field.developerName}: formula: ${field.calculatedFormula}`);
		// 	if (field.referenceTo) console.log(`${field.developerName}: reference to: ${field.referenceTo}`);
		// 	if (field.relationshipName) console.log(`${field.developerName}: relationship name: ${field.relationshipName}`);
		// });
		// const fields = (await getFieldInfo('My_Custom_Metadata_Type__mdt')).fields;
		// console.log(JSON.stringify(fields, null, 2));
		const dashboard = await getDashboard('Global_Sales_Dashboards/IhTVktDDdNKZpPdRzrGxIqgAydZyHH');
		console.log(JSON.stringify(dashboard, null, 2));
		const report = await getReport('unfiled$public/New_Accounts_Report_vvx');
		console.log(JSON.stringify(report, null, 2));
		const reportType = await getReportType();
		console.log(JSON.stringify(reportType, null, 2));
// console.log(await getReportType());
		// const type = {
		// 	members: ['Opportunity.ForecastCategoryName'],
		// 	name: 'CustomField'
		// };
	
		// const params = {
		// 	apiVersion: '52.0',
		// 	unpackaged: {types: [type]}
		// };
		
		// const result = await conn.metadata.retrieve(params).stream().pipe(fs.createWriteStream('./MyPackage.zip'));
		
		// const xml = fs.readFileSync('./OpportunityStage.standardValueSet').toString('utf8')
		// console.log(xml);
		// parseString(xml, function (err, result) {
		// 	console.log(result.StandardValueSet.standardValue);
			// 	const picklistFields = result.CustomObject.fields.filter(field => field.type && field.type[0] === 'Picklist');
		// 	picklistFields.forEach(field => {
		// 		if (field.valueSet && field.valueSet[0].valueSetDefinition) {
		// 			console.log(field.valueSet[0].valueSetDefinition[0]);
		// 			let s = JSON.stringify(field.valueSet[0].valueSetDefinition[0]);
		// 			console.log(JSON.parse(s).sorted[0]);
		// 		}
		// 		// if (field.valueSet && field.valueSet[0].valueSetName) {
		// 		// 	console.log(field.valueSet[0].valueSetName[0]);
		// 		// }
		// 		// if (!field.valueSet) console.log('StandardValueSet');
		// 	});
		// }); 
	} catch (err) {
		console.log(err)
	}
}

async function getDashboard(apiName) {
	const fullNames = [ apiName ]
	try {
		return await conn.metadata.read('Dashboard', fullNames)
	} catch (err) {
		console.log(err)
	}
}

async function getReport(apiName) {
	const fullNames = [ apiName ]
	try {
		return await conn.metadata.read('Report', fullNames)
	} catch (err) {
		console.log(err)
	}
}

async function getGlobalValueSetSummary() {
	try {
		return (await conn.metadata.list([{type: 'GlobalValueSet'}]))
	} catch (err) {
		console.log(err)
	}
}

async function getAllMutingPermissionSets () {
	try {
		return (await conn.query('SELECT Id, DeveloperName FROM MutingPermissionSet')).records
	} catch (err) {
		console.log(err)
	}
}

async function getUsersAssignedToPermissionSetGroups () {
	
	const query = `SELECT PermissionSetGroupId, count(Id) NumberOfActiveUsers
					 FROM PermissionSetAssignment 
					WHERE PermissionSetGroupId != null 
					  AND Assignee.IsActive = true 
				 GROUP BY PermissionSetGroupId`
    try {
		return (await conn.query(query))
	} catch (err) {
		console.log(err)
	}
}

async function getPermissionSetGroup(apiName) {
	const fullNames = [ apiName ]
	try {
		return await conn.metadata.read('PermissionSetGroup', fullNames)
	} catch (err) {
		console.log(err)
	}
}

async function getMutingPermissionSet(apiName) {
	const fullNames = [ apiName ]
	try {
		return await conn.metadata.read('MutingPermissionSet', fullNames)
	} catch (err) {
		console.log(err)
	}
}

async function createPermissionSetGroup(metadata) {
	try {
		return await conn.metadata.create('PermissionSetGroup', metadata)
	} catch (err) {
		console.log(err)
	}
}

async function getAllGlobalValueSets () {
	try {
		return (await conn.tooling.query('SELECT Id, Metadata, FullName, Description, MasterLabel, LastModifiedDate FROM GlobalValueSet')).records
	} catch (err) {
		console.log(err)
	}
}

async function getSourceMember (id) {
	try {
		return (await conn.tooling.query(`SELECT Id, ChangedBy, IsNameObsolete, IsNewMember, MemberIdOrName, MemberName, MemberType, RevisionCounter, RevisionNum FROM SourceMember WHERE Id='${id}'`)).records
	} catch (err) {
		console.log(err)
	}
}

async function getStandardValueSets () {
	const masterLabels = ['AccountRating','AccountType','LeadSource','CampaignStatus'];
	const metadata = {};
	await Bluebird.each(masterLabels, async label => {
		const standardValueSet = await getStandardValueSet(label);
		//console.log({[standardValueSet.FullName]: standardValueSet.Metadata});
		if (standardValueSet) Object.assign(metadata, {[standardValueSet.FullName]: standardValueSet.Metadata})
	});

	return metadata;
}

async function getStandardValueSetsXml () {
	const masterLabels = ['AccountRating','AccountType','LeadSource','CampaignStatus'];
	try {
		return await conn.metadata.read('StandardValueSet', masterLabels);
	} catch (err) {
		console.log(err)
	}
}

async function getStandardValueSet (masterLabel) {
	try {
		const query = `SELECT fullName, metadata 
                     FROM StandardValueSet
                    WHERE masterLabel='${masterLabel}'`;
		return (await conn.tooling.query(query)).records[0]
	} catch (err) {
		console.log(err)
	}
}

async function getObjectInfo (objectName) {
	try {
		const objectMetadataDescribe = await conn.describe(objectName);

		return objectMetadataDescribe;
	} catch (err) {
		console.log(err)
	}
}

async function getFieldInfo (objectName) {
	try {
		return await conn.metadata.read('CustomObject', [objectName]);
		// const objectMetadataDescribe = await conn.describe(objectName);

		// const fields = objectMetadataDescribe.fields.reduce(
		// 	(acc, field) => {
		// 		// if (field.name === 'Type') console.log(field);
		// 		const formattedField = {
		// 			picklistValues: field.picklistValues,
		// 			referenceTo: field.referenceTo,
		// 			developerName: field.name,
		// 			label: field.label,
		// 			relationshipName: field.relationshipName,
		// 			nillable: field.nillable,
		// 			type: field.type,
		// 			controllerName: field.controllerName,
		// 			defaultValue: field.defaultValue,
		// 			calculatedFormula: field.calculatedFormula,
		// 			inlineHelpText: field.inlineHelpText,
		// 			restrictedPicklist: field.restrictedPicklist
		// 		};

		// 		const key = formattedField.developerName;

		// 		if (field.name.endsWith('__c')) {
		// 			acc.custom[key] = formattedField;
		// 		} else {
		// 			acc.standard[key] = formattedField;
		// 		}
		// 		return acc;
		// 	},
		// 	{
		// 		standard: {},
		// 		custom: {}
		// 	}
		// );
		// return {
		// 	objectMetadataDescribe,
		// 	fields
		// };
	} catch (err) {
		console.log(err)
	}
}

async function getCustomFieldMetadata(standardObject) {
	try {
		return (await conn.metadata.list([{type: 'CustomField', folder:'Account'}]))
	} catch (err) {
		console.log(err)
	}
}

async function getReportType() {
	const masterLabels = ['AccountList'];
	try {
		return await conn.metadata.read('ReportType', masterLabels);
	} catch (err) {
		console.log(err)
	}
}