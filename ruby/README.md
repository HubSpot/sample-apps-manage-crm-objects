# HubSpot-ruby CRM-objects sample app

### Requirements

1. ruby 2.6.3
2. [Configured](https://github.com/HubSpot/sample-apps-manage-crm-objects/blob/main/README.md#how-to-run-locally) .env file

### Running

1. Install dependencies

```
bundle install
```

2. Commands

Show all commands (get help)

```
ruby cli.rb -h
```

Get objects

```
ruby cli.rb -m get_page -t [object_type]
```

Get an object by Id

```
ruby cli.rb -m get_by_id -t [object_type] -i [object_id]
```

Creare new object

```bash
ruby cli.rb -m create -t [object_type] -p [params]
```

Params is a json, example:

```
'{"email":"some@email.com","firstname":"Some","lastname":"One"}'
```

Delete an object by Id

```bash
ruby cli.rb -m archive -t [objectType] -i [objectId]
```

Update an object by Id

```bash
ruby cli.rb -m update -t [objectType] -i [objectId] -p [params]
```

Params is a json, example:

```
'{"firstname":"New"}'
```
