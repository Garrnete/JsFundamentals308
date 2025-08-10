 // the ID of the learner for which this data has been collected
    "id": number,
{id: sub.learner_id, ... }
    
 // Total weighted average: 
 avg: l.s / l.p
 // // l.s = total earned points (scores, after late penalty)
 // // l.p = total possible points (only for due assignments)
 // // Dividing gives weighted average (assignments with more points count more)

 // Each assignment’s percentage
    learners[sub.learner_id][a.id] = score / a.points_possible;
 // // This creates keys like "1": 0.94 and "2": 1.0.
 // // Percentage = score / points_possible.   

  // Exclude not-yet-due assignments
  if (new Date(a.due_at) > now) continue;
  // // If the due date is in the future, skip it entirely (doesn’t affect average or keyed scores).

  Reflection:

1. What could you have done differently during the planning stages of your project to make the execution easier?
I think if I had spent more time upfront figuring out exactly how the data should be structured and how late penalties should work, it would’ve made writing the code easier. Also, testing some small examples early on could’ve helped catch issues faster and saved me from reworking parts later.

2. Were there any requirements that were difficult to implement? What do you think would make them easier to implement in future projects?
The late submission penalty was a bit tricky because I had to carefully compare dates and adjust scores without messing up the calculations. In the future, having clearer specs on how to handle late penalties and maybe some helper functions for date checks would make things a lot simpler and less error-prone.

3. What would you add to, or change about your application if given more time?
If I had more time, I’d add better handling for edge cases, like missing submissions or assignments without due dates. I’d also build a nice user interface to display the results clearly and maybe include more detailed feedback for each learner’s performance.

4. Use this space to make notes for your future self about anything that you think is important to remember about this process, or that may aid you when attempting something similar again:
Remember to always start by fully understanding the data and the rules—especially things like deadlines and penalties. Double-check date comparisons because they can be tricky! Also, writing small test cases early can save a lot of headaches later. And don’t forget to keep your code modular so it’s easier to update or expand next time.