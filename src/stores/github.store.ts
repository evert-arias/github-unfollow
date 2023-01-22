import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { isValidToken } from "@/utils";
import type { TUser } from "@/types/gh-followers.types";
import GitHubService from "@/services/github.service";

export const useGitHubStore = defineStore("main", () => {
  let githubService: GitHubService;

  const isResultReady = ref(false);

  const isLoading = ref(false);

  const isToken = ref();

  let unfollowers: TUser[] = reactive([]);

  let followers: TUser[] = reactive([]);

  let following: TUser[] = reactive([]);

  const getData = async (tokenOrUser: string) => {
    if (!tokenOrUser) return;
    isLoading.value = true;

    isToken.value = isValidToken(tokenOrUser);

    githubService = new GitHubService(tokenOrUser);

    // Retrieve followers
    const _followers = await githubService.getFollowers();

    // Retrieve following
    const _following = await githubService.getFollowing();

    // Retrieve unfollowers
    const _unfollowers = githubService.findUnfollowers(_followers, _following);

    followers.splice(0, followers.length - 1);
    Object.assign(followers, _followers);

    following.splice(0, following.length - 1);
    Object.assign(following, _following);

    unfollowers.splice(0, unfollowers.length - 1);
    Object.assign(unfollowers, _unfollowers);

    isResultReady.value = true;
    isLoading.value = false;
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
    isLoading,
    follow,
    unfollow,
    getData,
  };
});
