export default function passwordChecker(password: string) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const isSixCharsLong = password.length >= 6;

  return {
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSymbol,
    isSixCharsLong,
  };
}
