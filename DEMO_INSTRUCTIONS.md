# 🎯 Demo Instructions

## Quick Demo of Authentication Features

### 1. **Start the App**
```bash
npm start
# or
expo start
```

### 2. **Test Email/Password Authentication**

#### Sign Up Flow:
1. App starts on Login screen
2. Tap "Sign Up" at the bottom
3. Fill in the form:
   - Username: `demo_user`
   - Email: `demo@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
4. Tap "Create Account"
5. You'll see success message and be taken to Home screen

#### Login Flow:
1. From Home screen, tap "Logout"
2. On Login screen, enter:
   - Email: `demo@example.com`
   - Password: `password123`
3. Tap "Sign In"
4. You'll be taken back to Home screen with welcome message

### 3. **Test Social Authentication**

**Note**: Social auth requires configuration (see AUTHENTICATION_SETUP.md)

#### Without Configuration:
- Tap social buttons to see error handling
- App will show appropriate error messages

#### With Configuration:
- Google: Opens Google OAuth flow
- Apple: Opens Apple Sign-In (iOS only)
- Facebook: Opens Facebook login flow

### 4. **Navigation Flow**

#### Authenticated User:
- **Home Tab**: Welcome screen with user info
- **Mood Tab**: Original mood tracking feature
- **History Tab**: Mood history feature

#### Unauthenticated User:
- **Login Screen**: Email/password login + social options
- **Sign Up Screen**: Registration form + social options

### 5. **Features to Test**

✅ **Form Validation**:
- Try empty fields
- Try invalid email format
- Try password mismatch
- Try password too short

✅ **Error Handling**:
- Try logging in with wrong credentials
- Try creating account with existing email
- Test social auth without configuration

✅ **UI/UX**:
- Keyboard handling
- Loading states
- Smooth animations
- Responsive design

✅ **Security**:
- Passwords are masked
- Credentials stored securely
- Session persistence

### 6. **Expected Behavior**

#### First Launch:
- App shows Login screen (no user logged in)

#### After Registration:
- Successful account creation
- Automatic login
- Redirect to Home screen
- User data displayed

#### After Login:
- Session persists across app restarts
- Access to all app features
- Proper navigation

#### After Logout:
- Return to Login screen
- All user data cleared from session
- Social auth sessions cleared

### 🎨 UI Highlights

- **Modern Design**: Clean, professional interface
- **Beautiful Forms**: Well-designed input fields with labels
- **Social Buttons**: Attractive social login options
- **Loading States**: Smooth loading indicators
- **Error Messages**: User-friendly error handling
- **Responsive Layout**: Works on all screen sizes

### 🔧 Troubleshooting

If you encounter issues:

1. **Metro bundler issues**: Clear cache with `expo r -c`
2. **Package issues**: Delete node_modules and run `npm install`
3. **Social auth errors**: Check AUTHENTICATION_SETUP.md for configuration
4. **Simulator issues**: Try on physical device

### 📱 Platform Testing

- **iOS Simulator**: Full functionality except Apple Sign-In
- **Android Emulator**: Full functionality with Google Play Services
- **Physical Device**: Recommended for social auth testing
- **Expo Web**: Basic functionality, limited social auth

The authentication system is ready to use and can be easily customized for your specific needs!

