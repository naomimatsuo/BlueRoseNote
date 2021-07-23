export const state = () => ({
  loginUser: null,
  communityInfo: null
});

export const mutations = {
  update (state, user) {
    state.loginUser = user;
  },
  setCommunityInfo (state, info) {
    state.communityInfo = info;
  }
};