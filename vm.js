let fs = require('fs');
var readlineSync = require('readline-sync');

let arg = process.argv;
let ram = new Array();

let progText;
try {
	progText = fs.readFileSync(arg[2]).toString();
} catch (err) {
	console.err(err);
}

ram = progText.split(/\s+/);
ram.unshift(0); // Flag
let progLength = ram.length;
let ip = 1;

loop:
while(ip < progLength - 1) {
	switch(ram[ip]) {
		case 'input':
			ram[ram[ip + 1]] = parseInt(readlineSync.prompt());
			ip += 2;
			break;
		case 'set':
			ram[ram[ip + 1]] = parseInt(ram[ip + 2]);
			ip += 3;
			break;
		case 'add':
			ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) + parseInt(ram[ram[ip + 2]]);
			ip += 4;
			break;
		case 'sub':
			ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) - parseInt(ram[ram[ip + 2]]);
			ip += 4;
			break;
		case 'mul':
			ram[ram[ip + 3]] = parseInt(ram[ram[ip + 1]]) * parseInt(ram[ram[ip + 2]]);
			ip += 4;
			break;
		case 'label':
			ip += 2;
			break;
		case 'compare':
			let val = ram[ram[ip + 1]] - ram[ram[ip + 2]]
			if (val > 0)
				ram[0] = 1;
			else if (val < 0)
				ram[0] = -1;
			else
				ram[0] = 0;
			ip += 3
			break;
		case 'je': // Jump Equel
			if (ram[0] == 0)
				ip = indexOfLabel(ram[ip + 1]) + 1;
			else
				ip += 2;
			break;
		case 'jl': // Jump Less
			if (ram[0] == -1)
				ip = indexOfLabel(ram[ip + 1]) + 1;
			else 
				ip += 2;
			break;
		case 'jg': // Jump Greater
			if (ram[0] == 1)
				ip = indexOfLabel(ram[ip + 1]) + 1;
			else 
				ip += 2;
			break;
		case 'jump':
			ip = indexOfLabel(ram[ip + 1]) + 1;
			break;
		case 'output':
			console.log(ram[ram[ip + 1]]);
			ip += 2;
			break;
		default:
			throw new Error(`Syntax Error`);
	}
}

function indexOfLabel(nameLabel) {
	let fromIndex = 0;
	let index = 0;
	while (true) {
		index = ram.indexOf(nameLabel, fromIndex);
		if (ram[index - 1] == 'label')
			break;
		fromIndex = index + 1;
	}
	return index;
}
