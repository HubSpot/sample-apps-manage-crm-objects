# HubSpot-php CRM-objects sample app

### Requirements

1. php >=7.2.5
2. [Configured](https://github.com/HubSpot/sample-apps-manage-crm-objects/blob/main/README.md#how-to-run-locally) .env file

### Running

1. Install dependencies

```bash
composer i
```

2. Initialize

If .env config file was not configured manually there is a way to initialize the CLI and create .env file via:

```bash
./bin/cli.php app:init 
```

It will ask for your Hubspot Api Key and will save it to the new .env config file.

3. Commands

Show all commands

```bash
./bin/cli.php
```
Get All objects

```bash
./bin/cli.php objects:get [objectType] --all
```

Get an object by Id

```bash
./bin/cli.php objects:get [objectType] --id=[objectId]
```

Search an object by query

```bash
./bin/cli.php objects:get [objectType] --query=test
```

Create new object

```bash
./bin/cli.php objects:create [objectType] [properties]
```

For example:
```bash
./bin/cli.php objects:create companies name=newCompany city=Cambridge state=Massachusetts
```

Please also notice that some objects require mandatory properties.

Update an object by Id

```bash
./bin/cli.php objects:update [objectType] [objectId] [properties]
```
For example:
```bash
./bin/cli.php objects:update contacts 123456 firstname=Ryan
```

Delete an object by Id

```bash
./bin/cli.php objects:delete [objectType] [objectId]
```
