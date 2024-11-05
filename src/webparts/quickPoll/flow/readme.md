# Flow

This flow will move a user response to the responses list - this will allow us to post responses for each user - so we don't need to worry about concurrency - then we can simply poll the item until it is deleted - at which point we know the user response has been incorporated into the poll. The flow will run for each user response and update the poll results object.

