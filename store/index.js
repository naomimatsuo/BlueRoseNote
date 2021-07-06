export const state = () => ({
  loginUser: {}
});

export const mutations = {
  update (state, user) {
    state.loginUser = user;
  }
};