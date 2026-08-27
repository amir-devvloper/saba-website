/* =========================================================
   SABA ACCOUNT SYSTEM
   Login / Signup / Remember Me / Logout
   ========================================================= */

   "use strict";


   /* =========================================================
      STORAGE KEYS
      ========================================================= */
   
   const USERS_KEY = "sabaUsers";
   const CURRENT_USER_KEY = "sabaCurrentUser";
   const REMEMBER_KEY = "sabaRememberMe";
   
   
   /* =========================================================
      HELPERS
      ========================================================= */
   
   function getUsers() {
   
       try {
   
           return JSON.parse(
               localStorage.getItem(USERS_KEY)
           ) || [];
   
       } catch (error) {
   
           console.error(
               "خطا در خواندن کاربران:",
               error
           );
   
           return [];
   
       }
   
   }
   
   
   function saveUsers(users) {
   
       localStorage.setItem(
           USERS_KEY,
           JSON.stringify(users)
       );
   
   }
   
   
   function getCurrentUser() {
   
       try {
   
           return JSON.parse(
               localStorage.getItem(CURRENT_USER_KEY)
           );
   
       } catch (error) {
   
           return null;
   
       }
   
   }
   
   
   function saveCurrentUser(user) {
   
       localStorage.setItem(
           CURRENT_USER_KEY,
           JSON.stringify(user)
       );
   
   }
   
   
   function removeCurrentUser() {
   
       localStorage.removeItem(
           CURRENT_USER_KEY
       );
   
   }
   
   
   function normalizeMobile(mobile) {
   
       return mobile
           .replace(/\s+/g, "")
           .replace(/-/g, "")
           .trim();
   
   }
   
   
   function normalizeEmail(email) {
   
       return email
           .trim()
           .toLowerCase();
   
   }
   
   
   /* =========================================================
      MESSAGE
      ========================================================= */
   
   function showMessage(
       element,
       message,
       type = "error"
   ) {
   
       if (!element) {
           return;
       }
   
       element.textContent = message;
   
       element.className =
           "auth-message show " + type;
   
   }
   
   
   /* =========================================================
      PASSWORD TOGGLE
      ========================================================= */
   
   function setupPasswordToggles() {
   
       const buttons =
           document.querySelectorAll(
               ".password-toggle"
           );
   
   
       buttons.forEach(button => {
   
           button.addEventListener(
               "click",
               function () {
   
                   const targetId =
                       this.dataset.target;
   
                   const input =
                       document.getElementById(
                           targetId
                       );
   
                   if (!input) {
                       return;
                   }
   
   
                   const icon =
                       this.querySelector("i");
   
   
                   if (
                       input.type === "password"
                   ) {
   
                       input.type = "text";
   
                       if (icon) {
   
                           icon.classList.remove(
                               "fa-eye"
                           );
   
                           icon.classList.add(
                               "fa-eye-slash"
                           );
   
                       }
   
                       this.setAttribute(
                           "aria-label",
                           "مخفی کردن رمز عبور"
                       );
   
                   } else {
   
                       input.type = "password";
   
                       if (icon) {
   
                           icon.classList.remove(
                               "fa-eye-slash"
                           );
   
                           icon.classList.add(
                               "fa-eye"
                           );
   
                       }
   
                       this.setAttribute(
                           "aria-label",
                           "نمایش رمز عبور"
                       );
   
                   }
   
               }
           );
   
       });
   
   }
   
   
   /* =========================================================
      SIGNUP
      ========================================================= */
   
   function setupSignup() {
   
       const form =
           document.getElementById(
               "signupForm"
           );
   
   
       if (!form) {
           return;
       }
   
   
       const message =
           document.getElementById(
               "signupMessage"
           );
   
   
       form.addEventListener(
           "submit",
           function (event) {
   
               event.preventDefault();
   
   
               const name =
                   document
                       .getElementById(
                           "signupName"
                       )
                       .value
                       .trim();
   
   
               const mobile =
                   normalizeMobile(
                       document
                           .getElementById(
                               "signupMobile"
                           )
                           .value
                   );
   
   
               const email =
                   normalizeEmail(
                       document
                           .getElementById(
                               "signupEmail"
                           )
                           .value
                   );
   
   
               const password =
                   document
                       .getElementById(
                           "signupPassword"
                       )
                       .value;
   
   
               const passwordConfirm =
                   document
                       .getElementById(
                           "signupPasswordConfirm"
                       )
                       .value;
   
   
               const terms =
                   document.getElementById(
                       "signupTerms"
                   );
   
   
               /* -----------------------------------------
                  VALIDATION
                  ----------------------------------------- */
   
               if (name.length < 3) {
   
                   showMessage(
                       message,
                       "لطفاً نام و نام خانوادگی را به‌درستی وارد کنید."
                   );
   
                   return;
   
               }
   
   
               if (
                   !/^09\d{9}$/.test(
                       mobile
                   )
               ) {
   
                   showMessage(
                       message,
                       "شماره موبایل معتبر نیست. مثال: 09123456789"
                   );
   
                   return;
   
               }
   
   
               if (
                   email &&
                   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                       email
                   )
               ) {
   
                   showMessage(
                       message,
                       "لطفاً یک ایمیل معتبر وارد کنید."
                   );
   
                   return;
   
               }
   
   
               if (password.length < 6) {
   
                   showMessage(
                       message,
                       "رمز عبور باید حداقل ۶ کاراکتر باشد."
                   );
   
                   return;
   
               }
   
   
               if (
                   password !==
                   passwordConfirm
               ) {
   
                   showMessage(
                       message,
                       "رمز عبور و تکرار آن یکسان نیستند."
                   );
   
                   return;
   
               }
   
   
               if (
                   terms &&
                   !terms.checked
               ) {
   
                   showMessage(
                       message,
                       "برای ثبت‌نام باید قوانین و شرایط را بپذیرید."
                   );
   
                   return;
   
               }
   
   
               /* -----------------------------------------
                  GET USERS
                  ----------------------------------------- */
   
               const users =
                   getUsers();
   
   
               /* -----------------------------------------
                  CHECK DUPLICATE MOBILE
                  ----------------------------------------- */
   
               const mobileExists =
                   users.some(
                       user =>
                           user.mobile === mobile
                   );
   
   
               if (mobileExists) {
   
                   showMessage(
                       message,
                       "این شماره موبایل قبلاً ثبت شده است."
                   );
   
                   return;
   
               }
   
   
               /* -----------------------------------------
                  CHECK DUPLICATE EMAIL
                  ----------------------------------------- */
   
               if (email) {
   
                   const emailExists =
                       users.some(
                           user =>
                               user.email === email
                       );
   
   
                   if (emailExists) {
   
                       showMessage(
                           message,
                           "این ایمیل قبلاً ثبت شده است."
                       );
   
                       return;
   
                   }
   
               }
   
   
               /* -----------------------------------------
                  CREATE USER
                  ----------------------------------------- */
   
               const user = {
   
                   id:
                       Date.now().toString(),
   
                   name:
                       name,
   
                   mobile:
                       mobile,
   
                   email:
                       email,
   
                   password:
                       password,
   
                   createdAt:
                       new Date().toISOString()
   
               };
   
   
               users.push(user);
   
               saveUsers(users);
   
   
               /* -----------------------------------------
                  SUCCESS
                  ----------------------------------------- */
   
               showMessage(
                   message,
                   "ثبت‌نام با موفقیت انجام شد. در حال انتقال به صفحه ورود...",
                   "success"
               );
   
   
               form.reset();
   
   
               setTimeout(
                   function () {
   
                       window.location.href =
                           "login.html";
   
                   },
                   1200
               );
   
           }
       );
   
   }
   
   
   /* =========================================================
      LOGIN
      ========================================================= */
   
   function setupLogin() {
   
       const form =
           document.getElementById(
               "loginForm"
           );
   
   
       if (!form) {
           return;
       }
   
   
       const message =
           document.getElementById(
               "loginMessage"
           );
   
   
       form.addEventListener(
           "submit",
           function (event) {
   
               event.preventDefault();
   
   
               const username =
                   document
                       .getElementById(
                           "loginUsername"
                       )
                       .value
                       .trim();
   
   
               const password =
                   document
                       .getElementById(
                           "loginPassword"
                       )
                       .value;
   
   
               const remember =
                   document.getElementById(
                       "rememberMe"
                   );
   
   
               if (!username) {
   
                   showMessage(
                       message,
                       "شماره موبایل یا ایمیل خود را وارد کنید."
                   );
   
                   return;
   
               }
   
   
               if (!password) {
   
                   showMessage(
                       message,
                       "رمز عبور خود را وارد کنید."
                   );
   
                   return;
   
               }
   
   
               const users =
                   getUsers();
   
   
               const normalizedUsername =
                   normalizeEmail(
                       username
                   );
   
   
               const normalizedMobile =
                   normalizeMobile(
                       username
                   );
   
   
               const user =
                   users.find(
                       item => {
   
                           return (
                               item.mobile ===
                               normalizedMobile
   
                               ||
   
                               (
                                   item.email &&
                                   item.email ===
                                   normalizedUsername
                               )
                           );
   
                       }
                   );
   
   
               if (!user) {
   
                   showMessage(
                       message,
                       "کاربری با این شماره موبایل یا ایمیل پیدا نشد."
                   );
   
                   return;
   
               }
   
   
               if (
                   user.password !==
                   password
               ) {
   
                   showMessage(
                       message,
                       "رمز عبور اشتباه است."
                   );
   
                   return;
   
               }
   
   
               /* -----------------------------------------
                  REMOVE PASSWORD FROM CURRENT USER
                  ----------------------------------------- */
   
               const currentUser = {
   
                   id:
                       user.id,
   
                   name:
                       user.name,
   
                   mobile:
                       user.mobile,
   
                   email:
                       user.email,
   
                   loggedInAt:
                       new Date().toISOString()
   
               };
   
   
               /* -----------------------------------------
                  SAVE LOGIN
                  ----------------------------------------- */
   
               if (
                   remember &&
                   remember.checked
               ) {
   
                   localStorage.setItem(
                       REMEMBER_KEY,
                       "true"
                   );
   
               } else {
   
                   localStorage.removeItem(
                       REMEMBER_KEY
                   );
   
               }
   
   
               saveCurrentUser(
                   currentUser
               );
   
   
               /* -----------------------------------------
                  SUCCESS
                  ----------------------------------------- */
   
               showMessage(
                   message,
                   `خوش آمدید ${user.name}؛ در حال ورود...`,
                   "success"
               );
   
   
               setTimeout(
                   function () {
   
                       window.location.href =
                           "../index.html";
   
                   },
                   700
               );
   
           }
       );
   
   }
   
   
   /* =========================================================
      LOGOUT
      ========================================================= */
   
   function logout() {
   
       removeCurrentUser();
   
       localStorage.removeItem(
           REMEMBER_KEY
       );
   
   
       window.location.href =
           "index.html";
   
   }
   
   
   /* =========================================================
      MAKE LOGOUT AVAILABLE GLOBALLY
      ========================================================= */
   
   window.logout =
       logout;
   
   
   /* =========================================================
      UPDATE HEADER
      ========================================================= */
   
   function updateAuthHeader() {
   
       const user =
           getCurrentUser();
   
   
       const authArea =
           document.getElementById(
               "authArea"
           );
   
   
       if (!authArea) {
           return;
       }
   
   
       if (user) {
   
           authArea.innerHTML = `
   
               <div class="user-menu">
   
                   <span class="user-welcome">
   
                       <i class="fa-regular fa-user"></i>
   
                       سلام، ${escapeHtml(user.name)}
   
                   </span>
   
                   <button
                       type="button"
                       class="logout-btn"
                       onclick="logout()"
                   >
   
                       <i class="fa-solid fa-right-from-bracket"></i>
   
                       خروج
   
                   </button>
   
               </div>
   
           `;
   
       } else {
   
           authArea.innerHTML = `
   
               <a
                   href="pages/login.html"
                   class="login-link"
               >
   
                   <i class="fa-solid fa-right-to-bracket"></i>
   
                   ورود
   
               </a>
   
               <a
                   href="pages/signup.html"
                   class="signup-link"
               >
   
                   ثبت نام
   
               </a>
   
           `;
   
       }
   
   }
   
   
   /* =========================================================
      ESCAPE HTML
      ========================================================= */
   
   function escapeHtml(value) {
   
       const div =
           document.createElement(
               "div"
           );
   
       div.textContent =
           value || "";
   
       return div.innerHTML;
   
   }
   
   
   /* =========================================================
      PROTECT LOGIN PAGE
      ========================================================= */
   
   function redirectIfLoggedIn() {
   
       const user =
           getCurrentUser();
   
   
       const path =
           window.location.pathname
               .toLowerCase();
   
   
       const isLoginPage =
           path.endsWith(
               "/login.html"
           );
   
   
       const isSignupPage =
           path.endsWith(
               "/signup.html"
           );
   
   
       if (
           user &&
           (
               isLoginPage ||
               isSignupPage
           )
       ) {
   
           window.location.href =
               "../index.html";
   
       }
   
   }
   
   
   /* =========================================================
      FORGOT PASSWORD
      ========================================================= */
   
   function setupForgotPassword() {
   
       const button =
           document.getElementById(
               "forgotPassword"
           );
   
   
       if (!button) {
           return;
       }
   
   
       button.addEventListener(
           "click",
           function (event) {
   
               event.preventDefault();
   
   
               const message =
                   document.getElementById(
                       "loginMessage"
                   );
   
   
               showMessage(
                   message,
                   "بازیابی رمز عبور در نسخه فعلی فعال نیست.",
                   "error"
               );
   
           }
       );
   
   }
   
   
   /* =========================================================
      INITIALIZE
      ========================================================= */
   
   document.addEventListener(
       "DOMContentLoaded",
       function () {
   
           setupPasswordToggles();
   
           setupSignup();
   
           setupLogin();
   
           setupForgotPassword();
   
           updateAuthHeader();
   
           redirectIfLoggedIn();
   
       }
   );