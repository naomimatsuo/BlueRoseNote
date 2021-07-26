export const state = () => ({
  loginUser: null
});

export const mutations = {
  updateLoginUser (state, user) {
    state.loginUser = user;
  }
};