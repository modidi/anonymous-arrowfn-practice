const prompt = require("prompt-sync")();

// Global variables
const videoNames = [
  "How to make your own Flatburger tutorial",
  "Flatironland commercial",
  "Flatapets cutest animals",
];

const comments = [];

/*
 * Allows a user to select a video and leave a comment.
 * Returns an anonymous function that can later edit the comment.
 */
function selectVideo(addComment) {
  const videoValue = prompt(
    "Please select a video:\n" +
      "1 - How to make your own Flatburger tutorial\n" +
      "2 - Flatironland commercial\n" +
      "3 - Flatapets cutest animals\n",
  );

  let videoName;

  // Determine selected video
  if (videoValue === "1") {
    videoName = videoNames[0];
  } else if (videoValue === "2") {
    videoName = videoNames[1];
  } else if (videoValue === "3") {
    videoName = videoNames[2];
  } else {
    console.log("Error: Invalid video selection!");
    return null;
  }

  // Prompt for comment
  const comment = prompt("Enter your comment: ");

  // Store comment using arrow function
  const commentIndex = addComment(videoName, comment);

  console.log("\nComment added successfully!");
  console.log(`Video: ${videoName}`);
  console.log(`Comment: ${comment}`);

  /*
   * Anonymous function (closure)
   * Has access to commentIndex even after selectVideo finishes.
   */
  return function () {
    const updatedComment = prompt("Edit your comment: ");

    comments[commentIndex].text = updatedComment;

    console.log("\nComment updated!");
    console.log(comments[commentIndex]);
  };
}

console.log("Welcome to FlatTube!");

/*
 * Arrow function for creating and storing comments
 */
const editComment = selectVideo((videoName, comment) => {
  const commentData = {
    video: videoName,
    text: comment,
  };

  comments.push(commentData);

  return comments.length - 1;
});

// Test closure
if (editComment) {
  const answer = prompt("Would you like to edit your comment? (yes/no): ");

  if (answer.toLowerCase() === "yes") {
    editComment();
  }
}

console.log("\nAll Comments:");
console.log(comments);