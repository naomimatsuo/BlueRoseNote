export const state = () => ({
  loginUser: null
});

export const mutations = {
  update (state, user) {
    state.loginUser = user;
  }
};