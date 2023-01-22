import type { TUser } from "@/types/gh-followers.types";
import axios from "axios";

export default class GitHubFollowersService {
  async getFollowing(username: string) {
    return (
      await axios.get(`https://api.github.com/users/${username}/following`, {
        params: { per_page: 100 },
      })
    ).data;
  }

  async getFollowers(username: string) {
    console.log(username);
    return (
      await axios.get(
        `https://api.github.com/users/${String(username)}/followers`,
        { params: { per_page: 100 } }
      )
    ).data;
  }

  /**
   * Finds the users following the account but the account is not following them
   * @param followers
   * @param following
   * @returns TUser[]
   */
  findFollowersNotFollowing(followers: TUser[], following: TUser[]): TUser[] {
    return followers.filter(
      (obj1) => !following.some((obj2) => obj1["login"] === obj2["login"])
    );
  }

  /**
   * Finds the users being followed by the account but are not followers of the account
   * @param followers
   * @param following
   * @returns TUser[]
   */
  findFollowingNotFollowers(followers: TUser[], following: TUser[]): TUser[] {
    return following.filter(
      (obj1) => !followers.some((obj2) => obj1["login"] === obj2["login"])
    );
  }

  follow() {}

  unfollow() {}

  followAll() {}

  unfollowAll() {}
}
