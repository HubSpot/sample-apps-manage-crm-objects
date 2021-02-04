# HubSpot-nodejs CRM-objects sample app

### Requirements

1. Node v10+
2. [Configured](https://github.com/HubSpot/sample-apps-manage-crm-objects/blob/main/README.md#how-to-run-locally) .env file

### Running

1. Install dependencies

```bash
npm install
```

2. Initialize

If .env config file was not configured manually there is a way to initialize the CLI and create .env file via:

```bash
./bin/cli.js init
```

It will ask for your Hubspot Api Key and will save it to new .env config file.

3. Commands

Show all commands

```bash
./bin/cli.js --help
```
Get list of objects

```bash
./bin/cli.js get [objectType] -a --query='test'
```

Creare new object

```bash
./bin/cli.js create [objectType]
```

Please also notice that some objects require mandatory properties, that you can provide in the following way:
```bash
./bin/cli.js create [objectType] --email='test@test.com' --name='Test name'
```

Update existing object

```bash
./bin/cli.js udpate [objectType] [objectId] --name='Test name'
```

Archive existing object

```bash
./bin/cli.js delete [objectType] [objectId]
```

Get list of available properties for an object
```bash
./bin/cli.js properties [objectType]
```
