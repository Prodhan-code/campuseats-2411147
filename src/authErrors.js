const MESSAGES = {
  'auth/invalid-credential': 'Wrong email or password.',
  'auth/invalid-email': 'That email address is not valid.',
  'auth/email-already-in-use':
    'An account with this email already exists. Log in instead.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/missing-password': 'Enter your password.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/too-many-requests': 'Too many attempts. Wait a minute and try again.',
  'auth/operation-not-allowed':
    'This sign-in method is not enabled. Contact the app administrator.',
  'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
  'auth/popup-blocked':
    'Your browser blocked the Google pop-up. Allow pop-ups and try again.',
  'auth/cancelled-popup-request': 'A sign-in pop-up is already open.',
  'auth/account-exists-with-different-credential':
    'An account already exists with this email. Try another sign-in method.',
  'auth/unauthorized-domain':
    'This domain is not authorized for sign-in with Firebase.',
  'auth/network-request-failed':
    'No connection. Check your internet and try again.',
}

export function authErrorMessage(error) {
  return MESSAGES[error.code] ?? 'Something went wrong. Please try again.'
}