import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state/reducers/auth";
import PostWidget from "./PostWidget";
import axios from "axios";
import { useGetAuthenticationStatus } from "../hooks/useGetAuthenticationStatus";

const PostsWidget = ({ isProfile = false }) => {
  const dispatch = useDispatch();
  const { userId, token } = useGetAuthenticationStatus();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts", {
          headers: {
            authorization: token,
          },
        });
        const posts = response.data;
        dispatch(setPosts({ posts }));
      } catch (err) {
        console.log(err);
      }
    };
    const getUserPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/posts/user/${userId}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        const posts = response.data;
        dispatch(setPosts({ posts }));
      } catch (err) {
        console.log(err);
      }
    };
    if (isProfile) getUserPosts();
    else getPosts();
  }, []);
  return (
    <>
      {posts?.map((data) => (
        <PostWidget key={data._id} {...data}></PostWidget>
      ))}
    </>
  );
};

export default PostsWidget;
