export const transformPost = (post) => {
  return {
    title: post.title,
    description: post.description,
    filters: post.filters,
    id: post._id,
  };
};

export const transformPosts = (posts) => {
  return posts.map(transformPost);
};
