// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

// Calculate percentage score
function getPercentage(score, pointsPossible) {
  return score / pointsPossible;
}

function getLearnerData(course, assignmentGroup, submissions) {
  // Check if the assignment group belongs to the course
  if (assignmentGroup.course_id !== course.id) {
    throw new Error("Assignment group does not match the course.");
  }

  const result = [];
  const today = new Date();

  // Get assignments that are due
  const validAssignments = assignmentGroup.assignments.filter(assign => {
    return new Date(assign.due_at) <= today;
  });

  // Get all unique learner IDs from submissions
  const learnerIds = [...new Set(submissions.map(s => s.learner_id))];

  // Go through each learner
  for (let learnerId of learnerIds) {
    let totalScore = 0;
    let totalPoints = 0;
    let learnerData = { id: learnerId };

    // Go through each valid assignment
    for (let assign of validAssignments) {
      // Find the learner's submission for this assignment
      const submission = submissions.find(s =>
        s.learner_id === learnerId && s.assignment_id === assign.id
      );

      if (submission) {
        let score = submission.submission.score;

        // Check for late submission and apply penalty
        if (new Date(submission.submission.submitted_at) > new Date(assign.due_at)) {
          score -= assign.points_possible * 0.1; // 10% penalty
        }

        // Store percentage score for this assignment
        const percent = getPercentage(score, assign.points_possible);
        learnerData[assign.id] = parseFloat(percent.toFixed(3));

        // Add to totals for weighted average
        totalScore += score;
        totalPoints += assign.points_possible;
      }
    }

    // Calculate and store weighted average
    learnerData.avg = parseFloat((totalScore / totalPoints).toFixed(3));

    // Add learner data to results
    result.push(learnerData);
  }

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

