First, we would like you to spend some time in the UI. Do some exploratory testing. We have left some bugs for you to find. Make sure you go through the system to find these bugs. After you are satisfied document your findings including the following:

- Name of the bug
- What is happening?
- How do you reproduce it?
- Your thoughts on how severe it is. There is no scale here just looking for how you articulate.


# Bug Reports

| # | Bug Name | Expected Result | Actual Result | Steps to Reproduce | Severity¹ | Notes |
|---|----------|----------------|---------------|-------------------|-----------|-------|
| 1 | Typos in Points Redeemed and Points Remaining fields | Points should contain an 'i' in both cases, e.g. 'Points Redeemed' and 'Points Remaining' | 'i' is missing from both field labels | 1. Open the application<br>2. View the home page | 2 | Spelling errors |
| 2 | Grammar error in Scroll of Infinite WiFi | When unfurled, creates **an** area of super-fast secure WiFi for you and your companions. | When unfurled, creates **a** area of super-fast secure WiFi for you and your companions. | 1. Open the application<br>2. View the home page | 4 | Grammar issue |
| 3 | "T-Shirt +2" needs a better description | Clear, understandable description | Official DjangoCon 2023 T-shirt, +2 to Armor Class. | 1. Open the application<br>2. View the home page | 4 | Unclear gaming reference |
| 4 | The 'About' page is missing | Description should be displayed when 'About' in the menu bar is clicked | 404 error page | 1. Open the application<br>2. Click 'About' in the menu bar | 2 | Broken navigation |
| 5 | Sign In link is broken | Sign in screen is displayed when the link is clicked | "Error occurred while trying to proxy: localhost:3000/accounts/signup/" | **Multiple locations:**<br>1. Home screen menu<br>2. Link on sign in screen | 1 | Makes application unusable |
| 6 | 'Sign In' button layout issue | 'Sign In' button should be on a separate line | Sign In button is next to 'Forgot Password' link | 1. Navigate to login page<br>2. Observe button layout | 4 | Layout/UI issue |
| 7 | Login shows error page | User awards page is displayed after successful login | "Error occurred while trying to proxy: localhost:3000/users/1/" | 1. Open the application<br>2. Enter valid credentials<br>3. Click 'Login' | 1 | Critical - prevents login |
| 8. | Earn bonus points links don't work | Users are able to earn bonus points | nothing | 1. Open the application  2. Click on either 'earn bonus points' link | 2 | Needs discussion with the business to prioritize |
| 9. | 

#### Notes
1. Severity is a value from 1 to 5, 1 being the most severe.

accommodate 

# TO DO
1. Test Redeem this Reward
1. Test Sign Up
1. Test Sign In
1. Test 'Had Enough'
1. Research login issue with bug #7  
1. Add automated tests to verify bugs when they're fixed
1. Improve steps to recreate no bug #5
1. Add carriage returns to make steps readable
1. Automated Tests:
    1. Verify 'holistiplan' link on all pages
    2. Verify 'Home' link on all pages
1. bug?  | T-Shirt +2 description box is smaller than the others if the browser is expanded; note that sizes also vary if the browser is small | T-Shirt +2 description box should be the same size as the others | T-Shirt +2 description box is |
1. Need a report showing pass/failed tests