import type { TUser } from "@/types/gh-followers.types";
import { isValidToken } from "@/utils";
import axios from "axios";

export default class GitHubService {
  isToken = false;

  constructor(public tokenOrUser: string) {
    this.isToken = isValidToken(tokenOrUser);
  }

  private getBaseURL() {
    return this.isToken
      ? "https://api.github.com/user"
      : `https://api.github.com/users/${this.tokenOrUser}`;
  }

  private getConfig() {
    return this.isToken
      ? {
          headers: {
            Authorization: "Bearer " + this.tokenOrUser,
          },
        }
      : {};
  }

  async getFollowers() {
    const result = await axios.get(
      `${this.getBaseURL()}/followers?per_page=100`,
      this.getConfig()
    );
    return result.data;
  }

  async getFollowing() {
    const result = await axios.get(
      `${this.getBaseURL()}/following?per_page=100`,
      this.getConfig()
    );
    return result.data;
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
  findUnfollowers(followers: TUser[], following: TUser[]): TUser[] {
    return following.filter(
      (obj1) => !followers.some((obj2) => obj1["login"] === obj2["login"])
    );
  }

  async follow(username: string) {
    const result = await axios.put(
      `${this.getBaseURL()}/following/${username}`,
      this.getConfig()
    );
    return result.status === 204 ? true : false;
  }

  async unfollow(username: string): Promise<boolean> {
    const result = await axios.delete(
      `${this.getBaseURL()}/following/${username}`,
      this.getConfig()
    );
    return result.status === 204 ? true : false;
  }

  followAll() {}

  unfollowAll() {}
}
