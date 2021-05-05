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

Get an object by id

```
ruby cli.rb -m get_by_id -t [object_type] -i [object_id]
```

Create new object

```
ruby cli.rb -m create -t [object_type] -p [params]
```

Params is a json, example:

```
'{"email":"some@email.com","firstname":"Brian","lastname":"Halligan"}'
```

Delete an object by id

```
ruby cli.rb -m archive -t [object_type] -i [object_id]
```

Update an object by id

```
ruby cli.rb -m update -t [object_type] -i [object_id] -p [params]
```

Params is a json, example:

```
'{"firstname":"John}'
```
