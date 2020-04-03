// An academic record is a {courseId: {name, marksAchieved: {upToDate, value}, totalMarks: {upToDate, value}, marksMissed: {upToDate, value}, marks: [{upToDate, name, mark, weight, components: [mark]}]}}

let recip100 = 1/100;

let uoftGPAScorer = function(marksAchieved) {
	if (!marksAchieved && marksAchieved != 0) {
		return 0;
	}
	
	if (marksAchieved >= 85) {
		return 4;
	}
	
	if (marksAchieved >= 80) {
		return 3.7;
	}
	
	if (marksAchieved >= 77) {
		return 3.3;
	}
	
	if (marksAchieved >= 73) {
		return 3;
	}
	
	if (marksAchieved >= 70) {
		return 2.7;
	}
	
	if (marksAchieved >= 67) {
		return 2.3;
	}
	
	if (marksAchieved >= 63) {
		return 2;
	}
	
	if (marksAchieved >= 60) {
		return 1.7;
	}
	
	if (marksAchieved >= 57) {
		return 1.3;
	}
	
	if (marksAchieved >= 53) {
		return 1;
	}
	
	if (marksAchieved >= 50) {
		return 0.7;
	}
	
	return 0;
}

/**
 * determineTotalMarks(record, courseId) returns the total possible marks for the given course in the given academic record.
 */
function determineTotalMarks(record, courseId) {
	if (!record) {
		return 0;
	}
	
	let course = record[courseId];
	if (!course) {
		return 0;
	}
	
	let marks = course.marks;
	if (!marks) {
		return 0;
	}
	
	let totalMarks = course.totalMarks;
	if (!totalMarks) {
		totalMarks = course.totalMarks = {upToDate: false, value: 0};
	}
	
	if (!totalMarks.upToDate) {
		totalMarks.value = 0;
		for (let i = 0; i < marks.length; i++) {
			let pair = marks[i];
			totalMarks.value += pair.weight;
		}
		totalMarks.upToDate = true;
	}
	
	return totalMarks;
}

function determineMark(markObj) {
	if (!markObj) {
		return 0;
	}
	
	
	if (markObj.upToDate || !markObj.components) {
		return markObj.mark;
	}
	
	let total = markObj.components.reduce((part, el) => part + el, 0);
	markObj.mark = total / Math.max(markObj.components.length, 1);
	markObj.upToDate = true;
	return markObj.mark;
}

/**
 * determineMarksAchieved(record, courseId) returns the marks achieved for the given course in the given academic record.
 */
function determineMarksAchieved(record, courseId) {
	if (!record) {
		return 0;
	}
	
	let course = record[courseId];
	if (!course) {
		return 0;
	}
	
	let marks = course.marks;
	if (!marks) {
		return 0;
	}
	
	let marksAchieved = course.marksAchieved;
	if (!marksAchieved) {
		marksAchieved = course.marksAchieved = {upToDate: false, value: 0};
	}
	
	if (marksAchieved.upToDate) {
		return marksAchieved.value;
	}
	
	marksAchieved.value = 0;
	for (let i = 0; i < marks.length; i++) {
		let pair = marks[i];
		if (!pair) {
			continue;
		}
		
		marksAchieved.value += determineMark(pair) * pair.weight * recip100;
	}
	marksAchieved.upToDate = true;
	return marksAchieved.value;
}

function determineMarksMissed(record, courseId) {
	if (!record) {
		return 0;
	}
	
	let course = record[courseId];
	if (!course) {
		return 0;
	}
	
	let marks = course.marks;
	if (!marks) {
		return 0;
	}
	
	let totalMarks = determineTotalMarks(record, courseId);
	
	let marksMissed = course.marksMissed;
	if (!marksMissed) {
		marksMissed = course.marksMissed = {upToDate: false, value: 0};
	}
	
	if (marksMissed.upToDate) {
		return marksMissed.value;
	}
	
	marksMissed.value = totalMarks.value - determineMarksAchieved(record, courseId);
	marksMissed.upToDate = true;
	return marksMissed.value;
}

function determineMarksEarnable(record, courseId) {
	if (!record) {
		return 0;
	}
	
	let course = record[courseId];
	if (!course) {
		return 0;
	}
	
	let marks = course.marks;
	if (!marks) {
		return 0;
	}
	
	let totalMarks = determineTotalMarks(record, courseId);
	return 100 - totalMarks.value;
}

function determineMeanSoFar(record, courseId) {
	const total = determineTotalMarks(record, courseId).value;
	if (total == 0) {
		return 0;
	}
	return determineMarksAchieved(record, courseId) / total * 100;
}

function determineMarksIf100(record, courseId) {
	return determineMarksAchieved(record, courseId) + determineMarksEarnable(record, courseId);
}

function determineMarksForTarget(record, courseId, target) {
	let achieved = determineMarksAchieved(record, courseId);
	let earnable = determineMarksEarnable(record, courseId);
	return Math.max(0, (target - achieved) / earnable * 100);
}

function determineGPAScore(record, courseId, scorer) {
	let marksAchieved = determineMarksAchieved(record, courseId);
	return scorer(marksAchieved);
}

function addMark(record, courseId, name, mark, weight) {
	if (!record) {
		return;
	}
	
	let course = record[courseId];
	if (!course) {
		return;
	}
	
	let marks = course.marks;
	if (!marks) {
		return;
	}
	
	mark = parseFloat(mark);
	weight = parseFloat(weight);
	marks.push({upToDate: true, name: name ? name : "", mark: mark ? mark : 0, weight: weight ? weight : 0, components: []});
	markOutOfDate(course);
}

function addMarkComponent(record, courseId, index, mark) {
	if (!record) {
		return;
	}
	
	let course = record[courseId];
	if (!course) {
		return;
	}
	
	let marks = course.marks;
	if (!marks) {
		return;
	}
	
	if (index < 0 || index >= marks.length) {
		return;
	}
	
	mark = parseFloat(mark);
	marks[index].components.push(mark);
	
	marks[index].upToDate = false;
	markOutOfDate(course);
}

function addCourse(record, courseId, name) {
	if (!record) {
		return;
	}
	
	record[courseId] = {name: name, marks: []};
}

function markOutOfDate(course) {
	if (!course) {
		return;
	}
	
	if (course.marksAchieved) {
		course.marksAchieved.upToDate = false;
	}
	
	if (course.totalMarks) {
		course.totalMarks.upToDate = false;
	}
	
	if (course.marksMissed) {
		course.marksMissed.upToDate = false;
	}
}
