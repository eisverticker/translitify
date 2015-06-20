/*
 * Cyrillic alphabet; Transliteration  based on SEV/GHOST standard
 * but also a little bit modified
 *
 * Numbers are decimal Unicode-Keycodes,
 * you can also use characters
 *
 */
translitifier.prototype.addProfile('latin','cyrillic',{
	'a': { 'upper': '1040', 'lower': '1072'},
	'b': { 'upper': '1041', 'lower': '1073'},
	'v': { 'upper': '1042', 'lower': '1074'},
	'g': { 'upper': '1043', 'lower': '1075'},
	'd': { 'upper': '1044', 'lower': '1076'},
	'i': { 'upper': '1048', 'lower': '1080'},
	'l': { 'upper': '1051', 'lower': '1083'},
	'm': { 'upper': '1052', 'lower': '1084'},
	'n': { 'upper': '1053', 'lower': '1085'},
	'o': { 'upper': '1054', 'lower': '1086'},
	'p': { 'upper': '1055', 'lower': '1087'},
	'r': { 'upper': '1056', 'lower': '1088'},
	't': { 'upper': '1058', 'lower': '1090'},
	'u': { 'upper': '1059', 'lower': '1091'},
	'f': { 'upper': '1060', 'lower': '1092'},
	'\'':{ 'upper': '1100'},
	'"': { 'upper': '1098'},
	'c': {
		'upper': '1062',
		'lower': '1094',
		'children':{
			'h': { 'upper': '1063', 'lower': '1095'}
		}
	},
	'e': {
		'upper': '1045',
		'lower': '1077',
		'children': {
			'h':{'upper': '1069', 'lower' : '1101'}
		}
	},
	'z': {
		'upper': '1047',
		'lower': '1079',
		'children':{
			'h': { 'upper': '1046', 'lower': '1078'}
		}
	},
	'y': { 'upper': '1067', 'lower': '1099'},
	'k': {
		'upper': '1050',
		'lower': '1082',
		'children':{
			'h':{
				'upper': '1061',
				'lower': '1093'
			}
		}
	},
	's': {
		'upper': '1057',
		'lower': '1089',
		'children':{
			'h': {
				'upper': '1064',
				'lower': '1096',
				'children':{
					'h': { 'upper' : '1065', 'lower': '1097'}
				}
			}
		}
	},
	'j': {
		'children':{
			'o': {'upper': 'Ё', 'lower':'ё'},
			'j': {'upper': '1049', 'lower': '1081'},
			'u': {'upper': '1070', 'lower': '1102'},
			'a': {'upper': '1071', 'lower': '1103'}
		}
	}
});
