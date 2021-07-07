export default function ({ app, redirect }) {
  const clientId = app.$cookies.get('client_id');
  if ((clientId === null) || (clientId === undefined)) {
    redirect('/');
    return;
  }

  if (clientId.length < 20) {
    redirect('/');
  }
}