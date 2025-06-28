const tweetId = "1937466051866022153";
const bearerToken = process.env.BEARER_TOKEN 

const options = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${bearerToken}`,
    },
};

export async function LoadDataTweet(Id: string):Promise<Record<string, any>> {
    const response = await fetch(
    `https://api.twitter.com/2/tweets/${Id}` +
      `?expansions=author_id,referenced_tweets.id.author_id` +
      `&tweet.fields=created_at,in_reply_to_user_id,referenced_tweets` +
      `&user.fields=id,name,username`,
    options
  );
    return response.json()
}
