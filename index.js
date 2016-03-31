var fs = require('fs');

function parseMeta(json){
	return "<h3>"+json.name+"</h3>"+json.description+'\n';
}

function wrapTd(o){
	if(o == undefined){
		// undefinedではなく別の文字にしてもいいかも
		return '<td style="color:red;">'+o+'</td>';
	}
	return "<td>"+o+"</td>";
}
function parseElement( name, obj){
	var result = wrapTd(name);
	result += wrapTd(obj.type);
	result += wrapTd(obj.isOptional);
	result += wrapTd(obj.description);
	return result;
}
function parseElements(obj){
	var result = '<table border="1">\n';
	var col = ["name","Type",'isOptional','description'];
	result += '<tr>';
	for(i = 0;i < col.length;i++){
		result += wrapTd(col[i]);
	}
	result += '</tr>';

	for(key in obj){
		result += '<tr>'+parseElement(key, obj[key])+'</tr>\n';
	}
	result += '</table>';
	return result;
}

function parse(json){
	var table = json.table;
	var elements = json.elements;

	var result = parseMeta(table);
	result += parseElements(elements);
	return result;
}

module.exports = {
    blocks: {
			jsoneon: {
				process: function(block) {
				if(block.args.length == 1){
					var filepath = fs.realpathSync('./json/');
					var json = require(filepath+'/'+block.args[0]);
					return parse(json);
				}
				return "Error! You need argument filename";
			}
		}
	}
};
