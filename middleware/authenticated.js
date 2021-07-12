export default function ({ app, redirect }) {
  const clientId = app.$cookies.get('client_id');
  const accountId = app.$cookies.get('account_id');

  if ((clientId === null) || (clientId === undefined)) {
    redirect('/');
    return;
  }

  if ((accountId === null) || (accountId === undefined)) {
    redirect('/');
    return;
  }

  if (clientId.length < 20) {
    redirect('/');
  }
}