var fs = require('fs');

function wrapTd(o){
	if(o == undefined){
		// undefinedではなく別の文字にしてもいいかも
		return '<td style="color:red;">'+o+'</td>';	
	}
	return "<td>"+o+"</td>";
}

function wrapTh(o){
	return "<th>"+o+"</th>";
}
function parseElement( name, obj){
	var result = wrapTd(name);
	result += wrapTd(obj.type);
	result += wrapTd(obj.isOptional);
	result += wrapTd(obj.description);
	return result;
}
function parseElements(obj){
	var result = '<table>\n';
	var col = ["name","Type",'isOptional','description']; 
	result += '<tr>'; 
	for(i = 0;i < col.length;i++){
		result += wrapTh(col[i]);
	}
	result += '</tr>';

	for(key in obj){
		result += '<tr>'+parseElement(key, obj[key])+'</tr>\n';
	}
	result += '</table>';
	return result;
}



function sqlArgument(name,obj){
	if(!obj.isOptional){
		return '`'+name+'` ' + obj.type+' not null';
	} 
	return '`'+name+'` ' + obj.type;
}
function createSQL( name, obj){
	var result = '<pre><code class="lang-sql"> create table ';
	result += name + '(';
	for(key in obj){
		result += ' ' + sqlArgument(key, obj[key])+',';
	}
	result = result.substring(0,result.length-1);
	result += '); </code></pre>';
	return result;
}

module.exports = {
    blocks: {
			jsoneon: {
				process: function(block) {
					if("filename" in block.kwargs){
						var json = require(
							fs.realpathSync('./json/')+'/'+block.kwargs.filename
						);
						var name = block.kwargs.name;
						return parseElements(json);
					}
					return "";
			}
		}
	}
};

