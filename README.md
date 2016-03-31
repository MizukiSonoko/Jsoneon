# Jsoneon
[![npm version](https://badge.fury.io/js/gitbook-plugin-jsoneon.svg)](https://badge.fury.io/js/gitbook-plugin-jsoneon)

# Install 
In book.json  
```json
{
  "plugins": ["jsoneon"],
}
```


# Usage

### 1 create directory to gitbook directory.
```
mkdir json
```

### 2 Define elements in foo.json
```json
{
	"meta":{
		"name":"Table name",
		"version":"0.0.1",
		"description":"This is table sample.",
		"type":"RDB"
	},
	"elements":{
		"textext" : {
			"type":"text",
	 		"description":"cappuccino",
			"isOptional" : false,
			"sample":"cappuccino",
			"tag" : ["deprecated", "primary key"]
		},
		"numnum" : {
			"type":"number",
	 		"description":"IIV",
			"isOptional" : false,
			"sample": 6000,
			"tag" : ["deprecated"]
		},
	  "dicdict" : {
			"type":"dictionary",
			"description":"cafe",
			"isOptional" : true,
			"members": {
					"cco": {
						"type":"text",
						"description":"ChiefCoffeeOfficer",
						"isOptional":false,
						"sample":"chino",
						"tag":[]
					},
					"cfo" : {
						"type":"text",
						"description":"ChiefFriendOfficer",
						"isOptional":false,
						"sample":"cocoa",
						"tag":[]
					}
			}
		}
	}
}
```

### 3 Write in bar.md
```
{% jsoneon "foo.json" %}
{% endjsoneon %}
```

### Config

In book.json  

```json
{
  "plugins": ["jsoneon"],
	"pluginsConfig": {
		"jsoneon": {
			"render" : ["info"]
		}
	}
}
```
