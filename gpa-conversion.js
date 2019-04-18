// Use these two websites to generate this JSON file:
//   - 
//   - 

const letterGradeToNumber = (letterGrade) => {
	switch (letterGrade.trim().toUpperCase()) {
		case "A+":
			return 13;
		case "A":
			return 12;
		case "A-":
			return 11;
		case "B+":
			return 10;
		case "B":
			return 9;
		case "B-":
			return 8;
		case "C+":
			return 7;
		case "C":
			return 6;
		case "C-":
			return 5;
		case "D+":
			return 4;
		case "D":
			return 3;
		case "D-":
			return 2;
		case "E":
			return 1;
		case "F":
		default:
			return 0;
	}
};

const MIN_GRADE = 0;
const MAX_GRADE = 100;

const norm = (val) => {
	return Math.round(Math.max(Math.min(val, MAX_GRADE), MIN_GRADE));
};

const lr = (minLetterGrade, maxLetterGrade) => {
	const min = letterGradeToNumber(minLetterGrade);
	const max = letterGradeToNumber(maxLetterGrade);
	
	if (min > max) {
		const tmp = min;
		min = max;
		max = tmp;
	}
	
	return (letterGrade) => {
		const val = letterGradeToNumber(letterGrade);
		return min <= val && max >= val;
	};
};

const lt = (targetLetterGrade) => {
	return lr(targetLetterGrade, targetLetterGrade);
};

const rn = (min, max) => {
	if (min > max) {
		const tmp = min;
		min = max;
		max = tmp;
	}
	
	return (val) => {
		val = norm(val);
		return min <= val && max >= val;
	};
};

const eq = (target) => {
	return rn(target, target);
};

// Letter grade constants, for convenience
const Ap = "A+";
const A  = "A";
const Am = "A-";
const Bp = "B+";
const B  = "B";
const Bm = "B-";
const Cp = "C+";
const C  = "C";
const Cm = "C-";
const Dp = "D+";
const D  = "D";
const Dm = "D-";
const E  = "E";
const F  = "F";

const INSTITUTIONS = [
	{name: "Acadia", OMSAS: [7]}
	{name: "Alberta", OMSAS: [7]}
	{name: "Algoma", OMSAS: [3]}
	{name: "Athabasca", OMSAS: [7]}
	{name: "Bishop's", OMSAS: [3]}
	{name: "Brandon", OMSAS: [7]}
	{name: "Brock", OMSAS: []}
	{name: "Calgary", OMSAS: []}
	{name: "Cape Breton", OMSAS: []}
	{name: "Carleton", OMSAS: []}
	{name: "Concordia", OMSAS: []}
	{name: "Dalhousie", OMSAS: []}
	{name: "Guelph", OMSAS: []}
	{name: "Lakehead", OMSAS: []}
	{name: "Laurentian", OMSAS: []}
	{name: "Laval", OMSAS: []}
	{name: "Lethbridge", OMSAS: []}
	{name: "Manitoba", OMSAS: []}
	{name: "McGill", OMSAS: []}
	{name: "McMaster", OMSAS: []}
	{name: "Memorial", OMSAS: []}
	{name: "Moncton", OMSAS: []}
	{name: "Montreal", OMSAS: []}
	{name: "Mt. Allison", OMSAS: []}
	{name: "Mt. Royal", OMSAS: []}
	{name: "Mt. St. Vincent", OMSAS: []}
	{name: "New Brunswick", OMSAS: []}
	{name: "Nipissing", OMSAS: []}
	{name: "OCAD", OMSAS: []}
	{name: "Ottawa", OMSAS: []}
	{name: "Prince Edward Island", OMSAS: []}
	{name: "Quebec", OMSAS: []}
	{name: "Queen's", OMSAS: []}
	{name: "Regina", OMSAS: []}
	{name: "RMC", OMSAS: []}
	{name: "Royal Roads", OMSAS: []}
	{name: "Ryerson", OMSAS: []}
	{name: "Saskatchewan", OMSAS: []}
	{name: "Sherbrooke", OMSAS: []}
	{name: "Simon Frasier", OMSAS: []}
	{name: "St. Francis Xavier", OMSAS: []}
	{name: "St. Mary's", OMSAS: []}
	{name: "St. Thomas", OMSAS: []}
	{name: "Ste-Anne", OMSAS: []}
	{name: "Thompson Rivers", OMSAS: []}
	{name: "Toronto", OMSAS: []}
	{name: "Trent", OMSAS: []}
	{name: "Trinity Western", OMSAS: []}
	{name: "UBC", OMSAS: []}
	{name: "UNBC", OMSAS: []}
	{name: "UOIT", OMSAS: []}
	{name: "Victoria", OMSAS: []}
	{name: "Waterloo", OMSAS: []}
	{name: "Western", OMSAS: []}
	{name: "Wilfrid Laurier", OMSAS: []}
	{name: "Windsor", OMSAS: []}
	{name: "Winnipeg", OMSAS: []}
	{name: "York", OMSAS: []}
];

// Once you have obtained a conversion number n using the institution number, access the nth entry

export const GPA_CONVERSION = {
	OMSAS: [
		[eq(9),       0,          0, eq(8),      eq(7),      0,          eq(6),      eq(5),      0,          eq(4),      0,          0,          0,          eq(3)],
		[eq(8),       0,          0, eq(7),      eq(6),      0,          eq(5),      eq(4),      0,          eq(3),      eq(2),      0,          0,          eq(1)],
		[rn(90, 100), rn(85, 89), 0, rn(80, 84), rn(77, 79), rn(73, 76), rn(70, 72), rn(67, 69), rn(63, 66), rn(60, 62), rn(57, 59), rn(53, 56), rn(50, 52), rn(0, 49)]
		[rn(93, 100), rn(84, 92), 0, rn(75, 83), rn(72, 74), rn(69, 71), rn(66, 68), rn(64, 65), rn(62, 63), rn(60, 61), rn(56, 59), rn(53, 55), rn(50, 52), rn(0, 49)],
		[rn(94, 100), rn(87, 93), 0, rn(80, 86), rn(75, 79), rn(70, 74), rn(65, 69), rn(60, 64), rn(, ), ],
		[],
		[],
		[],
		[]
	],
	schools: [
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
	]
};