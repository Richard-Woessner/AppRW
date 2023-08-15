import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Post } from '../models/models';
import { fsGetData, postData } from '../services/fireStore';

export interface PostsContextType {
  posts: Post[];
  loading: boolean;

  getPosts: () => Promise<Post[]>;
  createPost: (post: Post) => Promise<Post>;
}

const initialValues: PostsContextType = {
  loading: false,
  posts: [],

  getPosts: function (): Promise<Post[]> {
    throw new Error('Function not implemented.');
  },
  createPost: function (post: Post): Promise<Post> {
    throw new Error('Function not implemented.');
  },
};

export const PostContext = createContext<PostsContextType>(initialValues);

export interface PostsProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const PostsProvider = (props: PostsProviderProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getPosts = useCallback(async () => {
    try {
      setLoading(true);

      let tempPosts: Post[] = [];

      const docs = await (await fsGetData('posts')).docs;

      docs.forEach((doc) => {
        const date = doc.data().date
          ? new Date(doc.data().date.seconds * 1000)
          : new Date('1995-12-17T03:24:00');

        const s = Math.floor(date.getTime() / 1000);

        tempPosts.push({
          ...doc.data(),
          postId: doc.id,
          date: date,
          sortDate: s,
        } as Post);
      });

      setPosts(tempPosts);
      return tempPosts;
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = useCallback(async (post: Post) => {
    try {
      const upload = await postData('posts', {
        title: post.title,
        body: post.body,
        rating: post.rating,
        game: post.game,
        user: post.user,
        date: new Date(),
      } as Post);
      console.log(upload);

      post.postId = upload.id;
      post.sortDate = Math.floor(new Date().getTime() / 1000);

      setPosts((posts) => [...posts, post]);

      return post;
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const values = useMemo(
    () => ({
      posts,
      loading,

      getPosts,
      createPost,
    }),
    [posts, loading, getPosts]
  );

  return <PostContext.Provider value={values}>{props.children}</PostContext.Provider>;
};

export const UsePost = () => {
  const context = useContext(PostContext);

  if (context === undefined) {
    throw new Error('usePost must be used within a PostProvider component.');
  }

  return context;
};
