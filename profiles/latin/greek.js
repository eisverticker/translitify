/*
 * Greek alphabet (universal); Transliteration  based on ???
 *
 * Numbers are decimal Unicode-Keycodes,
 * you can also use characters
 *
 */
translitifier.prototype.addProfile('latin','greek',{
	'a': { 'upper': 'Α', 'lower': 'α'},//Alpha
	'v': { 'upper': 'Β', 'lower': 'β'},//Beta
	'g': { 'upper': 'Γ', 'lower': 'γ'},//Gamma
	'd': { 'upper': 'Δ', 'lower': 'δ'},//Delta
	'e': { 'upper': 'Ε', 'lower': 'ε'},//Epsilon
	'z': { 'upper': 'Ζ', 'lower': 'ζ'},//Zeta
	'i': { 'upper': 'Η', 'lower': 'η'},//eta
	//'i': { 'upper': 'Ι', 'lower': 'ι'},//iota
	't': {
		'children':{
			'h': { 'upper': 'Θ', 'lower': 'θ'}//Theta
		}
	},
	'k': { 'upper': 'Κ', 'lower': 'κ'},//Kappa
	'l': { 'upper': 'Λ', 'lower': 'λ'},//Lambda
	'm': { 'upper': 'Μ', 'lower': 'μ'},//My
	'n': { 'upper': 'Ν', 'lower': 'ν'},//Ny
	'x': { 'upper': 'Ξ', 'lower': 'ξ'},//Xi
	'o': { 'upper': 'Ο', 'lower': 'ο'},//Omikron
	'p': { 'upper': 'Π', 'lower': 'π'},//Pi
	'r': { 'upper': 'Ρ', 'lower': 'ρ'},//Rho
	's': {
		'upper': 'Σ',
		'lower': 'σ',
		'children': {
			' ': {'lower': 'ς'}//final
		}
	},//Sigma
	't': { 'upper': 'Τ', 'lower': 'τ'},//Tau
	'y': { 'upper': 'Υ', 'lower': 'υ'},//Ypsilon
	'f': { 'upper': 'Φ', 'lower': 'φ'},//Phi
	'c': {
		'children': {
			'h': { 'upper': 'Χ', 'lower': 'χ'}//Chi
		}
	},
	'p': {
		'children': {
			's': { 'upper': 'Ψ', 'lower': 'ψ'}//Psi
		}
	}//,
	//'o': { 'upper': 'Ω', 'lower': 'ω'} //Omega

});
