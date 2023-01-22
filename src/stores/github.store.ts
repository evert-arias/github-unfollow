import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { isValidToken } from "@/utils";
import type { TUser } from "@/types/gh-followers.types";
import GitHubService from "@/services/github.service";

export const useGitHubStore = defineStore("main", () => {
  let githubService: GitHubService;

  const isResultReady = ref(false);

  const isToken = ref();

  let unfollowers: TUser[] = reactive([]);

  let followers: TUser[] = reactive([]);

  let following: TUser[] = reactive([]);

  const getData = async (tokenOrUser: string) => {
    isToken.value = isValidToken(tokenOrUser);

    githubService = new GitHubService(tokenOrUser);

    // Retrieve followers
    const _followers = await githubService.getFollowers();

    // Retrieve following
    const _following = await githubService.getFollowing();

    // Retrieve unfollowers
    const _unfollowers = githubService.findUnfollowers(_followers, _following);

    Object.assign(followers, _followers);
    Object.assign(following, _following);
    Object.assign(unfollowers, _unfollowers);

    isResultReady.value = true;
  };

  const follow = async (username: string) => {
    await githubService.follow(username);
  };

  const unfollow = async (username: string): Promise<boolean> => {
    return await githubService.unfollow(username);
  };

  return {
    isResultReady,
    followers,
    following,
    unfollowers,
    isToken,
    follow,
    unfollow,
    getData,
  };
});
