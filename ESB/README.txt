"synapse-configs" folder contains ESB synapse-configs folder.
"connectors" folder contains googlespreadsheet-connector-2.0.1 and gmail-connector-3.0.0
"lib" folder contains ForceJsonConvertor-1.0.0.jar class mediator.
"CAR" folder contains the car file for latest CApp.

The local entries are stored in "/_system/governance/custom/EngProLocalEntries/gmailMining" and "/_system/governance/custom/EngProLocalEntries/qspSpreadsheet" collections.

The custom class mediator ForceHJsonConvertor is used to manipulate the payload as JSON inside the script mediator inside getQSPDetailsList.xml. [1]



[1] https://github.com/ravihansa3000/ForcefulJsonConverter
