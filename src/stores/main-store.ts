import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import type { TUser } from "@/types/gh-followers.types";
import GitHubFollowersService from "@/services/gh-followers.service";

export const useMainStore = defineStore("main", () => {
  const isResultReady = ref(false);

  const github = new GitHubFollowersService();

  let unfollowers: TUser[] = reactive([]);

  let followers: TUser[] = reactive([]);

  const setReady = () => {
    isResultReady.value = !isResultReady.value;
  };

  const getFollowers = async (username: string) => {
    const _followers = await github.getFollowers(username);
    console.log(_followers);
    Object.assign(followers, _followers);
    isResultReady.value = true;
  };

  const getUnfollowers = async (username: string) => {
    const _followers = await github.getFollowers(username);
    const _followings = await github.getFollowing(username);
    const _unfollowers = github.findFollowingNotFollowers(
      _followers,
      _followings
    );
    Object.assign(unfollowers, _unfollowers);
    isResultReady.value = true;
  };

  return {
    isResultReady,
    setReady,
    getFollowers,
    followers,
    unfollowers,
    getUnfollowers,
  };
});
