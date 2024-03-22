export const getSender = (loggedUser, users) => {
  // Check if loggedUser and users are defined and not empty
  if (loggedUser && loggedUser.user && users && users.length >= 2) {
    // Check if loggedUser's user ID matches the first user's ID
    if (users[0]._id === loggedUser.user._id) {
      return users[1].name; // Return second user's name
    } else {
      return users[0].name; // Return first user's name
    }
  } else {
    // Handle cases where loggedUser, loggedUser.user, or users is undefined or empty
    return 'Unknown';
  }
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser.user._id ? users[1] : users[0];
};
export const isSameSenderMargin = (messages, m, i, userId) => {
  // Check if the current message has a valid sender object
  if (m && m.sender && m.sender._id) {
    // Check if the next message exists and its sender is not null
    if (
      i < messages.length - 1 &&
      messages[i + 1] &&
      messages[i + 1].sender &&
      messages[i + 1].sender._id === m.sender._id &&
      m.sender._id !== userId
    ) {
      return 33;
    } else if (
      // Check if either the next message's sender is different or it's the last message
      (i < messages.length - 1 &&
        messages[i + 1] &&
        messages[i + 1].sender &&
        messages[i + 1].sender._id !== m.sender._id &&
        m.sender._id !== userId) ||
      (i === messages.length - 1 && m.sender._id !== userId)
    ) {
      return 0;
    }
  }
  // Return 'auto' if sender is null or undefined
  return 'auto';
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    messages[i].sender && // Check if sender is not null
    messages[i + 1].sender && // Check if next message's sender is not null
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  // Check if messages array is not empty and the last message exists
  if (messages.length > 0 && messages[messages.length - 1]) {
    // Check if the sender object of the last message is not null
    if (messages[messages.length - 1].sender) {
      // Check if the last message is from a different user
      return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId
      );
    }
  }
  return false; // Return false if any of the conditions are not met
};

export const isSameUser = (messages, m, i) => {
  // Check if the message index is valid and the previous message exists
  if (i > 0 && messages[i - 1] && messages[i - 1].sender) {
    // Check if the sender object and its _id property are not null or undefined
    return (
      messages[i - 1].sender._id &&
      m.sender &&
      m.sender._id &&
      messages[i - 1].sender._id === m.sender._id
    );
  }
  return false; // Return false if previous message doesn't exist or sender is null
};
