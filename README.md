fileheader
==========
Master: [![Build Status](https://travis-ci.org/WalterTamboer/fileheader.png?branch=master)](https://travis-ci.org/WalterTamboer/fileheader)

A node.js application that can be used to quickly update file headers. If no file header exists yet, it's added and if there is a fileheader already, it is updated.

## Install

To install fileheader use npm:

`npm install -g fileheader`

## Usage
fileheader expects a configuration file called fileheader.json. The content of the document looks as follow:

```
{
	"template": [
		"/**",
		" * This is a template",
		" * ",
		" * @author Walter Tamboer",
		" */",
		"",
		""
	],
	"extensions": [".cpp", ".hpp", ".inl", ".php", ".my"],
	"ignore": [
		"\\.git$",
		"\\.svn$"
	],
	"variables": {
		"name": "Walter",
		"surname": "Tamboer"
	}
}
```

### The template
The ``template`` member is used to define the header that should be at the top of the file. This array is joined with an new line character (\n). This template can contain variables, more about variables later on.

### Extensions
The ``extensions`` member is used to filter the files that should be updated with a fileheader. As can be seen in the example, this is an array with strings representing the extensions.

### Ignoring files and directories
To speed up iterating through your project it might be wise to skip certain directories or files. Use the ``ignore`` member to specify a list with regular expressions that match the files and directories that should be ignored.

### Variables
The ``variables`` property can be used to define variables. These variables can be used in your template like this: `$(variablename)`. A variable name can contain alphanumeric characters, underscores and dots.
Next to custom variables there is a list with variables that fileheader provides. Here is an overview:

<table width="100%">
    <tr>
        <th>Variable</th>
        <th>Description</th>
    </tr>
	<tr>
		<td>$(cwd)</td>
		<td>The current working directory.</td>
	</tr>
	<tr>
		<td>$(date.full)</td>
		<td>The current date and time in an extended format.</td>
	</tr>
	<tr>
		<td>$(date.utc)</td>
		<td>The current date and time in UTC format.</td>
	</tr>
	<tr>
		<td>$(date.yyyy)</td>
		<td>The current year.</td>
	</tr>
	<tr>
		<td>$(date.yy)</td>
		<td>The current year in a short notation.</td>
	</tr>
	<tr>
		<td>$(date.mm)</td>
		<td>The current month with a leading zero.</td>
	</tr>
	<tr>
		<td>$(date.m)</td>
		<td>The current month without a leading zero.</td>
	</tr>
	<tr>
		<td>$(date.dd)</td>
		<td>The current day with a leading zero.</td>
	</tr>
	<tr>
		<td>$(date.d)</td>
		<td>The current day without a leading zero.</td>
	</tr>
	<tr>
		<td>$(date.dayofweek)</td>
		<td>The current day of the week. This is a value between zero and six.</td>
	</tr>
	<tr>
		<td>$(date.hh)</td>
		<td>The current hour with a leading zero.</td>
	</tr>
	<tr>
		<td>$(date.h)</td>
		<td>The current hour without a leading zero.</td>
	</tr>
	<tr>
		<td>$(date.ii)</td>
		<td>The current minute with a leading zero.</td>
	</tr>
	<tr>
		<td>$(date.i)</td>
		<td>The current minute without a leading zero.</td>
	</tr>
	<tr>
		<td>$(date.ss)</td>
		<td>The current second with a leading zero.</td>
	</tr>
	<tr>
		<td>$(date.s)</td>
		<td>The current second without a leading zero.</td>
	</tr>
	<tr>
		<td>$(file.abspath)</td>
		<td>The absolute path of the file that is parsed.</td>
	</tr>
	<tr>
		<td>$(file.basename)</td>
		<td>The base name of the file that is parsed. This is excluding the extension.</td>
	</tr>
	<tr>
		<td>$(file.ext)</td>
		<td>The extension of the file that is parsed.</td>
	</tr>
	<tr>
		<td>$(file.name)</td>
		<td>The name of the file that is parsed. This is including the extension.</td>
	</tr>
	<tr>
		<td>$(file.relpath)</td>
		<td>The relative path of the file that is parsed.</td>
	</tr>
	<tr>
		<td>$(os.hostname)</td>
		<td>The hostname of the system.</td>
	</tr>
	<tr>
		<td>$(os.platform)</td>
		<td>The platform of the system.</td>
	</tr>
	<tr>
		<td>$(os.type)</td>
		<td>The OS type of the system.</td>
	</tr>
	<tr>
		<td>$(os.arch)</td>
		<td>The processor architecture of the system.</td>
	</tr>
	<tr>
		<td>$(os.uptime)</td>
		<td>The uptime of the system.</td>
	</tr>
</table>
