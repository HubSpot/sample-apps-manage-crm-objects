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
php ./bin/cli.php app:init 
```

It will ask for your Hubspot Api Key and will save it to new .env config file.

3. Commands

Show all commands

```bash
php ./bin/cli.php
```
Get All objects

```bash
php ./bin/cli.php objects:get [objectType] --all
```

Get an object by Id

```bash
php ./bin/cli.php objects:get [objectType] --id=[objectId]
```

Search an object by query

```bash
php ./bin/cli.php objects:get [objectType] --query=test
```

Creare new object

```bash
./bin/cli.php objects:create [objectType] name=newCompany city=Cambridge state=Massachusetts
```

Please also notice that some objects require mandatory properties, that you can provide in the following way:

Delete an object by Id

```bash
php ./bin/cli.php objects:delete [objectType] [objectId]
```

Update an object by Id

```bash
php ./bin/cli.php objects:update [objectType] [objectId] [properties]
```
For example:
```bash
php ./bin/cli.php objects:update contacts 123456 firstname=Josh
```
